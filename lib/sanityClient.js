import { createClient } from "next-sanity";

let client;

export function getSanity() {
  if (!client) {
    client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      // false en desarrollo para ver los cambios de Sanity al instante acá
      // (la CDN tarda hasta ~30s en propagar). En producción sí conviene
      // useCdn: true por velocidad — hay que volver a poner true antes
      // de publicar el sitio.
      useCdn: process.env.NODE_ENV === "production",
    });
  }
  return client;
}

// Deja los productos con la misma forma que ya usan los componentes
// (vienen de cuando el catálogo leía de Supabase), para no tener que
// tocar ProductCard, ProductModal ni CatalogoClient.
const CAMPOS_PRODUCTO = `
  "id": _id,
  titulo,
  descripcion,
  precio,
  "precio_anterior": precioAnterior,
  "precio_transferencia": precioTransferencia,
  "ocultar_precio": ocultarPrecio,
  "detalles": detalles[]{etiqueta, valor},
  "imagen_url": imagenes[0].asset->url,
  "imagenes": imagenes[].asset->url,
  "categoria_slug": categoriaSlug,
  tipo,
  marca,
  material,
  "tiene_abridor": tieneAbridor,
  "destacar_nuevo": destacarNuevo,
  activo
`;

// TODOS los relojes ya viven en Supabase (ver lib/productosSupabase.js) —
// Sanity queda solo para el resto de las categorías (anillos, pulseras,
// cadenas, aros, etc.) hasta que también se migren. Relojes se excluye acá
// para no leer más de Sanity en esa categoría, ni por error. Swarovski
// también se excluye: esa línea vieja de Sanity quedó discontinuada (se
// reemplazó por la línea Blühend, que ya vive en Supabase repartida en
// Aritos/Cadenas/Pulseras/Anillos) — sigue en Sanity por las dudas, pero
// oculta del sitio.
const CATEGORIAS_EXCLUIDAS = `categoriaSlug != "relojes" && categoriaSlug != "swarovski"`;

export const PRODUCTOS_QUERY = `*[_type == "producto" && activo == true && ${CATEGORIAS_EXCLUIDAS}] | order(_createdAt desc) { ${CAMPOS_PRODUCTO} }`;

export const DESTACADOS_QUERY = `*[_type == "producto" && activo == true && ${CATEGORIAS_EXCLUIDAS}] | order(_createdAt desc) [0...10] { ${CAMPOS_PRODUCTO} }`;

// Productos marcados a mano como "Nuevo" desde Sanity, para la sección de
// novedades de la home.
export const NOVEDADES_QUERY = `*[_type == "producto" && activo == true && destacarNuevo == true && ${CATEGORIAS_EXCLUIDAS}] | order(_createdAt desc) { ${CAMPOS_PRODUCTO} }`;

export const RESUMEN_HOME_QUERY = `*[_type == "producto" && activo == true && ${CATEGORIAS_EXCLUIDAS}] | order(_createdAt desc) {
  "categoria_slug": categoriaSlug,
  marca,
  "imagen_url": imagenes[0].asset->url
}`;
