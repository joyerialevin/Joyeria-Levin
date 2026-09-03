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
    nombre: "Cadenas",
    filtros: ["material"],
  },
  {
    slug: "aros",
    nombre: "Aros",
    filtros: ["material", "abridor"],
  },
  {
    slug: "swarovski",
    nombre: "Swarovski",
    filtros: ["abridor"],
  },
];

// El catálogo se navega en dos niveles: primero Caballero / Dama / Alianzas,
// y dentro de cada uno, las categorías de CATEGORIAS que le correspondan.
// "tipo" filtra los productos de esa categoría por el campo tipo del
// producto; tipo: null muestra todos sin filtrar (caso Swarovski, que no
// tiene ese campo cargado).
export const GRUPOS = [
  {
    slug: "caballero",
    nombre: "Caballero",
    categorias: [
      { slug: "relojes", tipo: "caballero" },
      { slug: "anillos", tipo: "caballero" },
      { slug: "pulseras", tipo: "caballero" },
      { slug: "cadenas", tipo: "caballero" },
    ],
  },
  {
    slug: "dama",
    nombre: "Dama",
    categorias: [
      { slug: "relojes", tipo: "dama" },
      { slug: "anillos", tipo: "dama" },
      { slug: "pulseras", tipo: "dama" },
      { slug: "cadenas", tipo: "dama" },
      { slug: "aros", tipo: "dama" },
      { slug: "swarovski", tipo: null },
    ],
  },
  {
    slug: "alianzas",
    nombre: "Alianzas",
    categorias: [],
  },
];

export const MATERIAL_LABEL = {
  oro_18k: "Oro 18K",
  plata_925: "Plata 925",
};

export const TIPO_LABEL = {
  dama: "Dama",
  caballero: "Caballero",
};
