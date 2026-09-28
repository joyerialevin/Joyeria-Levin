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
  activo
`;

// Relojes ya se migraron a Supabase (ver lib/productosSupabase.js) — se
// excluyen acá para no duplicarlos ni mostrar datos viejos que hayan
// quedado cargados en Sanity de antes de la migración.
export const PRODUCTOS_QUERY = `*[_type == "producto" && activo == true && categoriaSlug != "relojes"] | order(_createdAt desc) { ${CAMPOS_PRODUCTO} }`;

export const DESTACADOS_QUERY = `*[_type == "producto" && activo == true] | order(_createdAt desc) [0...10] { ${CAMPOS_PRODUCTO} }`;

// Productos marcados a mano como "Nuevo" desde Sanity, para la sección de
// novedades de la home.
export const NOVEDADES_QUERY = `*[_type == "producto" && activo == true && destacarNuevo == true && categoriaSlug != "relojes"] | order(_createdAt desc) { ${CAMPOS_PRODUCTO} }`;

export const RESUMEN_HOME_QUERY = `*[_type == "producto" && activo == true && categoriaSlug != "relojes"] | order(_createdAt desc) {
  "categoria_slug": categoriaSlug,
  marca,
  "imagen_url": imagenes[0].asset->url
}`;
