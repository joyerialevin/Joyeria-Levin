// Estructura de filtros por categoría, usada tanto en el catálogo como
// en el panel de carga de productos.
export const CATEGORIAS = [
  {
    slug: "relojes",
    nombre: "Relojes",
    filtros: ["marca", "precio"],
  },
  {
    slug: "anillos",
    nombre: "Anillos",
    filtros: ["material", "color", "nuevo", "precio"],
  },
  {
    slug: "pulseras",
    nombre: "Pulseras",
    filtros: ["material", "color", "nuevo", "precio"],
  },
  {
    slug: "cadenas",
    nombre: "Cadenas / Dijes",
    filtros: ["material", "color", "nuevo", "precio"],
  },
  {
    slug: "aros",
    nombre: "Aritos",
    filtros: ["material", "abridor", "color", "nuevo", "precio"],
  },
  {
    slug: "bebes",
    nombre: "Bebés",
    filtros: ["precio"],
  },
  {
    slug: "alianzas",
    nombre: "Alianzas",
    filtros: ["material", "precio"],
  },
];

// El catálogo (y el mega menú del header) se navegan en dos niveles:
// primero Caballero / Dama / Alianzas, y dentro de cada uno, las
// categorías de CATEGORIAS que le correspondan. "tipo" filtra los
// productos de esa categoría por el campo tipo del producto; tipo: null
// muestra todos sin filtrar (caso Alianzas, que no separa por
// dama/caballero — se venden en par). La línea Blühend/Swarovski se
// cargó repartida en estas mismas categorías con tipo:"dama", en vez de
// vivir en una categoría "Swarovski" aparte.
export const GRUPOS = [
  {
    slug: "caballero",
    nombre: "Caballero",
    categorias: [
      { slug: "relojes", tipo: "caballero" },
      { slug: "anillos", tipo: "caballero" },
      { slug: "aros", tipo: "caballero" },
      { slug: "cadenas", tipo: "caballero" },
      { slug: "pulseras", tipo: "caballero" },
    ],
  },
  {
    slug: "dama",
    nombre: "Dama",
    categorias: [
      { slug: "relojes", tipo: "dama" },
      { slug: "anillos", tipo: "dama" },
      { slug: "aros", tipo: "dama" },
      { slug: "cadenas", tipo: "dama" },
      { slug: "pulseras", tipo: "dama" },
    ],
  },
  {
    slug: "alianzas",
    nombre: "Alianzas",
    categorias: [{ slug: "alianzas", tipo: null }],
  },
];

export const MATERIAL_LABEL = {
  oro_18k: "Oro 18K",
  plata_925: "Plata 925",
  oro_18k_y_plata_925: "Oro 18K y Plata 925",
};

// Materiales estándar (anillos, aritos, cadenas/dijes, pulseras). Alianzas
// usa su propia lista porque además del oro y la plata solas, vende la
// combinación de ambas.
export const MATERIALES_ESTANDAR = ["oro_18k", "plata_925"];
export const MATERIALES_ALIANZAS = ["plata_925", "oro_18k_y_plata_925", "oro_18k"];

export const TIPO_LABEL = {
  dama: "Dama",
  caballero: "Caballero",
};

// Opciones del selector "Ordenar por" (estilo María Cher: precio asc/desc,
// resto de las categorías se agregan solo si alguna vez hacen falta).
export const OPCIONES_ORDEN = [
  { valor: "destacado", etiqueta: "Destacado" },
  { valor: "precio-asc", etiqueta: "Precio: menor a mayor" },
  { valor: "precio-desc", etiqueta: "Precio: mayor a menor" },
  { valor: "az", etiqueta: "A - Z" },
  { valor: "za", etiqueta: "Z - A" },
];

// Mapeo best-effort de "línea" (color/variante) a un color de referencia
// para el punto de color en el filtro. Es solo decorativo: si no matchea
// ninguna palabra clave, se muestra un chip neutro.
const PALABRAS_COLOR = [
  [/light rose|rosaline|rose water opal|rose/i, "#E8B4C0"],
  [/aquamarine/i, "#8ECAE6"],
  [/emerald|chrysolite/i, "#3FA34D"],
  [/violet|amethyst/i, "#9B72CF"],
  [/light colorado topaz|topaz/i, "#C68642"],
  [/light siam|siam/i, "#8B2635"],
  [/multicolor/i, "#D4AF37"],
  [/degrad/i, "#B497D6"],
  [/crystal/i, "#EAF4F6"],
];

export function colorSwatch(linea) {
  if (!linea) return "#E5E1D3";
  const match = PALABRAS_COLOR.find(([re]) => re.test(linea));
  return match ? match[1] : "#E5E1D3";
}
