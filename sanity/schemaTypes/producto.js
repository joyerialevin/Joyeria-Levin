import { defineField, defineType } from "sanity";

const CATEGORIA_OPTIONS = [
  { title: "Relojes", value: "relojes" },
  { title: "Anillos", value: "anillos" },
  { title: "Pulseras", value: "pulseras" },
  { title: "Cadenas / Dijes", value: "cadenas" },
  { title: "Aritos", value: "aros" },
  { title: "Swarovski", value: "swarovski" },
  { title: "Bebés", value: "bebes" },
  { title: "Alianzas", value: "alianzas" },
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
      description: "Podés dejarlo vacío y cargarlo más adelante — mientras tanto la web muestra \"Precio a consultar\".",
      type: "number",
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: "ocultarPrecio",
      title: "Mostrar \"Precio a consultar\" igual",
      description:
        "Activalo para que la web muestre \"Precio a consultar\" aunque el producto ya tenga Precio cargado abajo — útil para tapar precios temporalmente sin perder el dato. Desactivalo cuando quieras que se vuelva a ver.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "precioAnterior",
      title: "Precio anterior (tachado)",
      description:
        "Opcional. Solo tiene efecto si además cargaste el Precio de arriba — ahí la web lo muestra tachado al lado del precio final, como descuento.",
      type: "number",
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: "precioTransferencia",
      title: "Precio con transferencia",
      description:
        "Opcional, para cuando el proveedor ofrece un descuento extra por pagar con transferencia (además del precio normal de arriba). Se muestra aparte, con su propio % de descuento calculado contra el Precio anterior.",
      type: "number",
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
    }),
    defineField({
      name: "detalles",
      title: "Detalles del producto",
      description:
        "Ficha técnica en pares etiqueta/valor (Colección, Género, Movimiento, Material, Diámetro, Cristal, Resistencia al agua, etc.), como en la web del fabricante. Se muestra debajo del precio, en el mismo orden en que los cargues acá.",
      type: "array",
      of: [
        defineField({
          name: "detalle",
          title: "Detalle",
          type: "object",
          fields: [
            defineField({ name: "etiqueta", title: "Etiqueta", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "valor", title: "Valor", type: "string", validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { etiqueta: "etiqueta", valor: "valor" },
            prepare: ({ etiqueta, valor }) => ({ title: etiqueta, subtitle: valor }),
          },
        }),
      ],
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
          { title: "Oro 18K y Plata 925", value: "oro_18k_y_plata_925" },
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
      name: "destacarNuevo",
      title: "Destacar como Nuevo",
      description: "Lo muestra en la sección \"Nuevos\" de la home. Marcalo/desmarcalo a mano cuando quieras.",
      type: "boolean",
      initialValue: false,
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
