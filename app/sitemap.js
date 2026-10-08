const BASE_URL = "https://www.joyerialevin.com";

const RUTAS = [
  "",
  "/catalogo",
  "/service-relojeria",
  "/tasacion-oro-plata",
  "/grabados-personalizados",
  "/regalos-dia-de-la-madre",
  "/sobre-nosotros",
  "/contacto",
];

export default function sitemap() {
  return RUTAS.map((ruta) => ({
    url: `${BASE_URL}${ruta}`,
    lastModified: new Date(),
  }));
}
