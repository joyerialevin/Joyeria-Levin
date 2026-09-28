-- Esquema v2: productos, fichas técnicas, fotos y stock con historial.
-- Pensado para reemplazar la tabla "productos" original (más simple) por
-- una que sostenga lo que ya usa la web hoy (varias fotos, precio anterior,
-- destacar como nuevo, ocultar precio) más lo nuevo del negocio (código
-- interno estable, línea/colección, ficha técnica separada, y stock que se
-- calcula solo a partir de movimientos, no un número que se pisa a mano).
--
-- Cómo aplicar: copiar y pegar en Supabase > SQL Editor > Run, DESPUÉS del
-- schema.sql original (no lo reemplaza: "pedidos" queda igual, solo se le
-- agrega la tabla de movimientos de stock).
--
-- OJO: la tabla "productos" actual tiene 488 filas reales (142 relojes +
-- 346 Swarovski, del 25/08, de antes de migrar a Sanity) — no es basura
-- de prueba. No se borra: se renombra como backup, y la de relojes se
-- reconstruye desde cero con la planilla. Las Swarovski quedan ahí
-- guardadas (con sus fotos ya en Storage) para migrarlas más adelante,
-- cuando le toque el turno a esa categoría.
alter table if exists productos rename to productos_legacy_20260825;

-- Renombrar los índices viejos también: al renombrar la tabla, los
-- índices NO cambian de nombre solos, y si no se liberan estos nombres
-- los CREATE INDEX de más abajo fallan por nombre ya usado.
alter index if exists idx_productos_categoria rename to idx_productos_legacy_categoria;
alter index if exists idx_productos_activo rename to idx_productos_legacy_activo;

-- Categorías: se agregan las que ya existen en la web (categorias.js) y
-- faltaban en el esquema original.
insert into categorias (slug, nombre, orden) values
  ('swarovski', 'Swarovski', 6),
  ('bebes', 'Bebés', 7),
  ('alianzas', 'Alianzas', 8)
on conflict (slug) do nothing;

create table productos (
  id uuid primary key default gen_random_uuid(),

  -- El código interno (REL-0001) es el DNI del producto: no se cambia
  -- nunca, aunque se venda o se discontinúe. Es la clave que usa el
  -- import de la planilla y el nombre de archivo de las fotos.
  codigo text unique not null,
  referencia_fabricante text,

  categoria_slug text not null references categorias(slug),
  marca text,
  linea text,                          -- colección del fabricante (ej. "Timeless Chronograph")
  tipo text check (tipo in ('dama','caballero')),
  material text check (material in ('oro_18k','plata_925','oro_18k_y_plata_925')),
  tiene_abridor boolean,

  precio numeric(12,2),                -- precio original Levin
  precio_anterior numeric(12,2),       -- para mostrar tachado / % OFF, si aplica
  precio_transferencia numeric(12,2),  -- efectivo/transferencia (hoy -15%, ver tabla config)
  ocultar_precio boolean not null default false,

  stock int not null default 0,        -- se mantiene solo vía movimientos_stock, no se edita a mano

  -- Activo y A pedido se muestran en la web; Oculto y Discontinuado no.
  estado text not null default 'activo' check (estado in ('activo','a_pedido','oculto','discontinuado')),
  destacar_nuevo boolean not null default false,

  creado_en timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);

create index idx_productos_categoria on productos(categoria_slug);
create index idx_productos_estado on productos(estado);
create index idx_productos_codigo on productos(codigo);

-- Ficha técnica: 1 fila por producto, igual que la hoja "Fichas" de la
-- planilla. Separada de productos para no mezclar datos comerciales con
-- técnicos, tal como ya lo organizás en la planilla.
create table producto_fichas (
  producto_id uuid primary key references productos(id) on delete cascade,
  movimiento text,
  material_caja text,
  material_malla text,
  color_esfera text,
  color_malla text,
  diametro_mm numeric(5,1),
  cristal text,
  resistencia_agua_m int,
  funciones text,
  descripcion text,
  revisado boolean not null default false
);

-- Fotos: una fila por foto, en el orden en que se ven en la web (_1, _2,
-- _3...), igual que la convención de nombres de la planilla.
create table producto_imagenes (
  id uuid primary key default gen_random_uuid(),
  producto_id uuid not null references productos(id) on delete cascade,
  orden int not null,
  url text not null,
  unique (producto_id, orden)
);

create index idx_producto_imagenes_producto on producto_imagenes(producto_id);

-- Stock con historial: cada entrada de mercadería, venta en el local o
-- venta web es un movimiento. El stock de "productos" es la suma de sus
-- movimientos, mantenida por el trigger de abajo — nunca se escribe a
-- mano, así siempre cierra.
create table movimientos_stock (
  id uuid primary key default gen_random_uuid(),
  producto_id uuid not null references productos(id) on delete cascade,
  tipo text not null check (tipo in ('entrada','venta_local','venta_web','ajuste')),
  cantidad int not null,               -- positivo en entrada/ajuste+, negativo en ventas/ajuste-
  pedido_id uuid references pedidos(id),
  nota text,
  creado_por text,                     -- email de quien lo cargó desde /admin
  creado_en timestamptz not null default now()
);

create index idx_movimientos_producto on movimientos_stock(producto_id);

create or replace function aplicar_movimiento_stock()
returns trigger as $$
begin
  update productos set stock = stock + new.cantidad, actualizado_en = now()
  where id = new.producto_id;
  return new;
end;
$$ language plpgsql;

create trigger trg_aplicar_movimiento_stock
  after insert on movimientos_stock
  for each row execute function aplicar_movimiento_stock();

-- RLS: catálogo público de lectura (como ya era), todo lo demás solo para
-- el panel /admin autenticado.
alter table productos enable row level security;
alter table producto_fichas enable row level security;
alter table producto_imagenes enable row level security;
alter table movimientos_stock enable row level security;

create policy "Productos activos o a pedido, visibles para todos"
  on productos for select using (estado in ('activo', 'a_pedido'));

create policy "Fichas visibles para todos"
  on producto_fichas for select using (true);

create policy "Imagenes visibles para todas"
  on producto_imagenes for select using (true);

-- Nadie de afuera lee ni escribe movimientos de stock directamente; el
-- panel /admin y el webhook de Mercado Pago usan la service role key,
-- que no pasa por RLS.
