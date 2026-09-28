import { getSupabase } from "./supabaseClient";

const TIPO_LABEL_CORTO = { dama: "Dama", caballero: "Caballero" };

// Adapta una fila de Supabase (productos + producto_fichas + producto_imagenes)
// a la misma forma que ya usan los componentes (ProductCard, NuevoIngresoCard,
// ProductModal), pensada originalmente para Sanity — así se puede mezclar en
// el mismo array sin tocar esos componentes.
export function adaptarProductoSupabase(producto) {
  // producto_fichas es 1 a 1 (la clave primaria de esa tabla ES el
  // producto_id), así que Supabase lo devuelve como objeto, no array.
  const ficha = producto.producto_fichas || null;
  const imagenes = (producto.producto_imagenes || [])
    .sort((a, b) => a.orden - b.orden)
    .map((img) => img.url);

  // Mismo orden que usa la página oficial de Citizen para este reloj
  // (citizenwatch.com.ar/productos/BI501750E): colección, género y función
  // primero, la sumergibilidad al final — no como un dato principal.
  const detalles = [
    ["Colección", producto.linea],
    ["Género", TIPO_LABEL_CORTO[producto.tipo]],
    ["Función", ficha?.funciones],
    ["Movimiento", ficha?.movimiento],
    ["Material caja", ficha?.material_caja],
    ["Material malla", ficha?.material_malla],
    ["Color esfera", ficha?.color_esfera],
    ["Color malla", ficha?.color_malla],
    ["Diámetro", ficha?.diametro_mm && `${ficha.diametro_mm} mm`],
    ["Cristal", ficha?.cristal],
    [
      "Sumergibilidad",
      ficha?.resistencia_agua_m && `${ficha.resistencia_agua_m / 10} ATM (${ficha.resistencia_agua_m} mts)`,
    ],
  ]
    .filter(([, valor]) => valor)
    .map(([etiqueta, valor]) => ({ etiqueta, valor }));

  // Relojes que vinieron de la planilla no tienen "titulo" propio: se arma
  // como marca + línea (ej. "Citizen Quartz"), sin mostrar el código interno
  // de referencia. Los que se migraron directo desde Sanity (donde no hay
  // columna "línea" separada) sí traen "titulo" ya armado — se usa tal cual.
  const titulo = producto.titulo || [producto.marca, producto.linea].filter(Boolean).join(" ") || producto.marca;

  // Mismo criterio para detalles: si el producto tiene "detalles_extra"
  // (viene de Sanity, formato libre etiqueta/valor) se usa tal cual: no
  // tiene sentido forzarlo al esquema fijo de producto_fichas.
  const detallesFinal = producto.detalles_extra && producto.detalles_extra.length > 0 ? producto.detalles_extra : detalles;

  // Idem con la descripción: los productos migrados desde Sanity la tienen
  // directo en la columna, sin pasar por producto_fichas.
  const descripcionFicha = /^\d+\s*atm\b/i.test(ficha?.descripcion || "") ? null : ficha?.descripcion || null;
  const descripcionFinal = producto.descripcion || descripcionFicha;

  return {
    id: producto.id,
    titulo,
    descripcion: descripcionFinal,
    precio: producto.precio,
    precio_anterior: producto.precio_anterior,
    precio_transferencia: producto.precio_transferencia,
    ocultar_precio: producto.ocultar_precio,
    detalles: detallesFinal,
    imagen_url: imagenes[0] || null,
    imagenes,
    categoria_slug: "relojes",
    tipo: producto.tipo,
    marca: producto.marca,
    material: null,
    tiene_abridor: null,
    activo: producto.estado === "activo" || producto.estado === "a_pedido",
    destacar_nuevo: producto.destacar_nuevo,
    stock: producto.stock,
  };
}

// RLS ya deja ver, con la clave anónima, solo los productos "activo" o
// "a_pedido" — no hace falta filtrar el estado acá de nuevo.
export async function getRelojesSupabase() {
  const { data, error } = await getSupabase()
    .from("productos")
    .select("*, producto_fichas(*), producto_imagenes(*)")
    .eq("categoria_slug", "relojes")
    .order("creado_en", { ascending: false });

  if (error) {
    console.error("Error trayendo relojes de Supabase:", error.message);
    return [];
  }

  return data.map(adaptarProductoSupabase);
}
