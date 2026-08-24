// Estructura de filtros por categoría, usada tanto en el catálogo como
// en el panel de carga de productos.
export const CATEGORIAS = [
  {
    slug: "relojes",
    nombre: "Relojes",
    filtros: ["tipo", "marca"],
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
];

export const MATERIAL_LABEL = {
  oro_18k: "Oro 18K",
  plata_925: "Plata 925",
};

export const TIPO_LABEL = {
  dama: "Dama",
  caballero: "Caballero",
};
