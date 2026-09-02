import { createClient } from "next-sanity";

let client;

export function getSanity() {
  if (!client) {
    client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      useCdn: true,
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
  "imagen_url": imagenes[0].asset->url,
  "imagenes": imagenes[].asset->url,
  "categoria_slug": categoriaSlug,
  tipo,
  marca,
  material,
  "tiene_abridor": tieneAbridor,
  activo
`;

export const PRODUCTOS_QUERY = `*[_type == "producto" && activo == true] | order(_createdAt desc) { ${CAMPOS_PRODUCTO} }`;

export const DESTACADOS_QUERY = `*[_type == "producto" && activo == true] | order(_createdAt desc) [0...10] { ${CAMPOS_PRODUCTO} }`;

export const RESUMEN_HOME_QUERY = `*[_type == "producto" && activo == true] | order(_createdAt desc) {
  "categoria_slug": categoriaSlug,
  marca,
  "imagen_url": imagenes[0].asset->url
}`;
