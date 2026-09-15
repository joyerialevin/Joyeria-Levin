// Sanity sirve las imágenes desde una CDN que acepta parámetros de
// redimensionado/calidad/formato directo en la URL del asset (sin pasar
// por el builder de @sanity/image-url, que necesita la referencia
// original y acá solo tenemos la URL ya resuelta). Pedir la foto ya
// ajustada al tamaño en el que se muestra evita bajar la original de
// alta resolución en cada tarjeta de producto — clave para que cargue
// rápido en celular.
export function optimizarImagenSanity(url, { width, quality = 75 } = {}) {
  if (!url || !url.includes("cdn.sanity.io")) return url;
  const params = new URLSearchParams();
  if (width) params.set("w", width);
  params.set("q", quality);
  params.set("auto", "format");
  return `${url}?${params.toString()}`;
}
