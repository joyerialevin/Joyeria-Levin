// Estructura de filtros por categoría, usada tanto en el catálogo como
// en el panel de carga de productos.
export const CATEGORIAS = [
  {
    slug: "relojes",
    nombre: "Relojes",
    filtros: ["marca"],
  },
  {
    slug: "anillos",
    nombre: "Anillos",
    filtros: ["material"],
  },
  {
    slug: "pulseras",
    nombre: "Pulseras",
    filtros: ["material"],
  },
  {
    slug: "cadenas",
    nombre: "Cadenas / Dijes",
    filtros: ["material"],
  },
  {
    slug: "aros",
    nombre: "Aritos",
    filtros: ["material", "abridor"],
  },
  {
    slug: "swarovski",
    nombre: "Swarovski",
    filtros: ["abridor"],
  },
  {
    slug: "bebes",
    nombre: "Bebés",
    filtros: [],
  },
  {
    slug: "alianzas",
    nombre: "Alianzas",
    filtros: ["material"],
  },
];

// El catálogo (y el mega menú del header) se navegan en dos niveles:
// primero Caballero / Dama / Alianzas, y dentro de cada uno, las
// categorías de CATEGORIAS que le correspondan. "tipo" filtra los
// productos de esa categoría por el campo tipo del producto; tipo: null
// muestra todos sin filtrar (casos Swarovski y Alianzas, que no separan
// por dama/caballero — las alianzas se venden en par).
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
      { slug: "bebes", tipo: "caballero" },
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
      { slug: "swarovski", tipo: null },
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
