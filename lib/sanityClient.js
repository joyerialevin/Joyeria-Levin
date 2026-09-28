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

// Solo 42 relojes (de los que tiene el negocio) ya se migraron a Supabase
// (ver lib/productosSupabase.js) — los que quedan en Sanity siguen siendo
// inventario real todavía no cargado en la planilla, así que las queries
// de acá NO excluyen relojes: los que ya se migraron se desactivan a mano
// en Sanity (activo: false) para no duplicarlos, y el resto se sigue
// mostrando desde acá hasta que también se carguen en la planilla.
export const PRODUCTOS_QUERY = `*[_type == "producto" && activo == true] | order(_createdAt desc) { ${CAMPOS_PRODUCTO} }`;

export const DESTACADOS_QUERY = `*[_type == "producto" && activo == true] | order(_createdAt desc) [0...10] { ${CAMPOS_PRODUCTO} }`;

// Productos marcados a mano como "Nuevo" desde Sanity, para la sección de
// novedades de la home.
export const NOVEDADES_QUERY = `*[_type == "producto" && activo == true && destacarNuevo == true] | order(_createdAt desc) { ${CAMPOS_PRODUCTO} }`;

export const RESUMEN_HOME_QUERY = `*[_type == "producto" && activo == true] | order(_createdAt desc) {
  "categoria_slug": categoriaSlug,
  marca,
  "imagen_url": imagenes[0].asset->url
}`;

// Marcas de relojes que TODAVÍA viven en Sanity (no migradas a Supabase),
// para que el mega menú del header no pierda esas marcas.
export const MARCAS_RELOJES_SANITY_QUERY = `*[_type == "producto" && activo == true && categoriaSlug == "relojes" && defined(marca)]{
  tipo,
  marca
}`;
