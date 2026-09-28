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

  return {
    id: producto.id,
    // El título mira marca + línea (ej. "Citizen Quartz") en vez de marca +
    // código de referencia — el código es un dato interno, no algo que le
    // importe al cliente. Si el producto no tiene línea cargada, se cae a
    // marca sola en vez de mostrar el código.
    titulo: [producto.marca, producto.linea].filter(Boolean).join(" ") || producto.marca,
    // Si la descripción de la ficha solo repite la sumergibilidad (ej. "5
    // ATM: no apto para sumergir."), no se muestra aparte — ese dato ya
    // está en el detalle "Sumergibilidad". Si tiene más info real (ej.
    // "Ancho de malla 21,4 mm."), se mantiene.
    descripcion: /^\d+\s*atm\b/i.test(ficha?.descripcion || "") ? null : ficha?.descripcion || null,
    precio: producto.precio,
    precio_anterior: producto.precio_anterior,
    precio_transferencia: producto.precio_transferencia,
    ocultar_precio: producto.ocultar_precio,
    detalles,
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
