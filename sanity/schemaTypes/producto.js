import { defineField, defineType } from "sanity";

const CATEGORIA_OPTIONS = [
  { title: "Relojes", value: "relojes" },
  { title: "Anillos", value: "anillos" },
  { title: "Pulseras", value: "pulseras" },
  { title: "Cadenas", value: "cadenas" },
  { title: "Aros", value: "aros" },
  { title: "Swarovski", value: "swarovski" },
];

export default defineType({
  name: "producto",
  title: "Producto",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categoriaSlug",
      title: "Categoría",
      type: "string",
      options: { list: CATEGORIA_OPTIONS },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imagenes",
      title: "Fotos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.min(1).error("Subí al menos una foto"),
    }),
    defineField({
      name: "precio",
      title: "Precio",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
    }),
    defineField({
      name: "tipo",
      title: "Tipo (solo relojes)",
      type: "string",
      options: {
        list: [
          { title: "Dama", value: "dama" },
          { title: "Caballero", value: "caballero" },
        ],
      },
    }),
    defineField({
      name: "marca",
      title: "Marca (solo relojes)",
      type: "string",
    }),
    defineField({
      name: "material",
      title: "Material",
      type: "string",
      options: {
        list: [
          { title: "Oro 18K", value: "oro_18k" },
          { title: "Plata 925", value: "plata_925" },
        ],
      },
    }),
    defineField({
      name: "tieneAbridor",
      title: "Tiene abridor",
      type: "boolean",
    }),
    defineField({
      name: "activo",
      title: "Activo (visible en la web)",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "supabaseId",
      title: "ID original (Supabase)",
      type: "string",
      hidden: true,
      readOnly: true,
    }),
  ],
  preview: {
    select: { title: "titulo", subtitle: "categoriaSlug", media: "imagenes.0" },
  },
});
