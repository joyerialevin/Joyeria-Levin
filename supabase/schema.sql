-- Esquema de base de datos para el sitio de Joyería Levin
-- Copiar y pegar en Supabase > SQL Editor > Run

create extension if not exists "pgcrypto";

create table categorias (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nombre text not null,
  orden int default 0
);

insert into categorias (slug, nombre, orden) values
  ('relojes', 'Relojes', 1),
  ('anillos', 'Anillos', 2),
  ('pulseras', 'Pulseras', 3),
  ('cadenas', 'Cadenas', 4),
  ('aros', 'Aros', 5);

create table productos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descripcion text,
  precio numeric(12,2) not null,
  imagen_url text,
  categoria_slug text not null references categorias(slug),
  tipo text check (tipo in ('dama','caballero')),
  marca text,
  material text check (material in ('oro_18k','plata_925')),
  tiene_abridor boolean,
  activo boolean not null default true,
  creado_en timestamptz not null default now()
);

create index idx_productos_categoria on productos(categoria_slug);
create index idx_productos_activo on productos(activo);

create table pedidos (
  id uuid primary key default gen_random_uuid(),
  estado text not null default 'pendiente',
  total numeric(12,2) not null,
  items jsonb not null,
  cliente_nombre text,
  cliente_email text,
  mp_preference_id text,
  mp_payment_id text,
  creado_en timestamptz not null default now()
);

alter table categorias enable row level security;
alter table productos enable row level security;
alter table pedidos enable row level security;

create policy "Categorias visibles para todos"
  on categorias for select using (true);

create policy "Productos activos visibles para todos"
  on productos for select using (activo = true);
