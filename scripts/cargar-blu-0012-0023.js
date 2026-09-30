// Carga el tercer lote de productos Blühend (BLU-0012 a BLU-0023, salteando
// BLU-0016 y BLU-0017 por no tener coincidencia exacta en la web oficial) en
// Supabase, mismo estilo que los lotes anteriores: precio de lista + precio
// con descuento por transferencia, descripción oficial de Blühend, marca
// oculta al público.
const fs = require("fs");
const path = require("path");

const env = {};
fs.readFileSync(path.join(__dirname, "..", ".env.local"), "utf8")
  .split("\n")
  .forEach((line) => {
    const m = line.match(/^([A-Z_0-9]+)=(.*)$/);
    if (m) env[m[1]] = m[2];
  });

const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const DESC_DIJE_PRINCESS =
  "Dije creado con cristal auténtico de Swarovski® y Plata 925. Tiene un brillo único debido a sus más de 50 facetas.";
const DESC_PULSERA_LOLA =
  "Pulsera creada con cristales auténticos de Swarovski® y bolitas de Plata 925. Largo 16 cm + 3 cm de extensión de cadena.";
const DESC_PULSERA_4MM =
  "Pulsera creada con cristales auténticos de Swarovski® de 4 mm y Plata 925. Largo: 16 cm + extensión de 3 cm. El dije de la terminación puede variar según disponibilidad de stock.";
const DESC_COLLAR_FELI =
  "Collar de Plata 925 y cristales auténticos de Swarovski®. La forma de los cristales varía según el color.";
const DESC_AROS_GOTAS =
  "Aros creados con gotas de cristal auténtico de Swarovski® de 10 mm y Plata 925. Los aros no tienen cambio.";
const DESC_DIJE_PEAR =
  "Dije Pear Cut de 11 mm creado con cristal auténtico de Swarovski® y Plata 925. Más de 50 facetas que le aportan un brillo único.";
const DESC_COLLAR_SOUL =
  "Collar corbatero de Plata 925 con cristal y dije de Swarovski®.";
const DESC_DIJE_CORAZON =
  "Dije de corazón 10 mm creado con cristal auténtico de Swarovski® y Plata 925. El precio no incluye la cadena de plata.";

const PRODUCTOS = [
  {
    codigo: "BLU-0012",
    referencia_fabricante: "#002353",
    linea: "Aquamarine",
    titulo: "Dije Princess Cut 11 mm",
    descripcion: DESC_DIJE_PRINCESS,
    precio: 26000,
    precio_transferencia: 23400,
    stock: 1,
  },
  {
    codigo: "BLU-0013",
    referencia_fabricante: "#002489",
    linea: "Light Siam AB",
    titulo: "Pulsera Lola",
    descripcion: DESC_PULSERA_LOLA,
    precio: 78400,
    precio_transferencia: 70560,
    stock: 1,
  },
  {
    codigo: "BLU-0014",
    referencia_fabricante: "#002937",
    linea: "Aquamarine",
    titulo: "Pulsera 4 mm",
    descripcion: DESC_PULSERA_4MM,
    precio: 74300,
    precio_transferencia: 66870,
    stock: 4,
  },
  {
    codigo: "BLU-0015",
    referencia_fabricante: "#003088",
    linea: "Rose Water Opal",
    titulo: "Pulsera 4 mm",
    descripcion: DESC_PULSERA_4MM,
    precio: 74300,
    precio_transferencia: 66870,
    stock: 1,
  },
  {
    codigo: "BLU-0018",
    referencia_fabricante: "#006307",
    linea: "Crystal AB",
    titulo: "Collar Feli",
    descripcion: DESC_COLLAR_FELI,
    precio: 119600,
    precio_transferencia: 107640,
    stock: 1,
  },
  {
    codigo: "BLU-0019",
    referencia_fabricante: "#009000",
    linea: "Crystal",
    titulo: "Aros Gotas 10 mm",
    descripcion: DESC_AROS_GOTAS,
    precio: 39600,
    precio_transferencia: 35640,
    stock: 3,
  },
  {
    codigo: "BLU-0020",
    referencia_fabricante: "#009246",
    linea: "Crystal",
    titulo: "Dije Pear Cut 11 mm",
    descripcion: DESC_DIJE_PEAR,
    precio: 26000,
    precio_transferencia: 23400,
    stock: 3,
  },
  {
    codigo: "BLU-0021",
    referencia_fabricante: "#009328",
    linea: "Rose Water Opal",
    titulo: "Collar Soul",
    descripcion: DESC_COLLAR_SOUL,
    precio: 136100,
    precio_transferencia: 122490,
    stock: 1,
  },
  {
    codigo: "BLU-0022",
    referencia_fabricante: "#009330",
    linea: "Emerald",
    titulo: "Collar Soul",
    descripcion: DESC_COLLAR_SOUL,
    precio: 136100,
    precio_transferencia: 122490,
    stock: 1,
  },
  {
    codigo: "BLU-0023",
    referencia_fabricante: "#009562",
    linea: "Crystal CAL",
    titulo: "Dije Corazón 10 mm",
    descripcion: DESC_DIJE_CORAZON,
    precio: 18200,
    precio_transferencia: 16380,
    stock: 3,
  },
];

async function main() {
  for (const p of PRODUCTOS) {
    const { data: producto, error: prodErr } = await supabase
      .from("productos")
      .upsert(
        {
          codigo: p.codigo,
          referencia_fabricante: p.referencia_fabricante,
          categoria_slug: "swarovski",
          marca: null,
          linea: p.linea,
          titulo: p.titulo,
          descripcion: p.descripcion,
          material: "plata_925",
          tipo: null,
          precio: p.precio,
          precio_anterior: null,
          precio_transferencia: p.precio_transferencia,
          ocultar_precio: false,
          estado: "activo",
          destacar_nuevo: true,
        },
        { onConflict: "codigo" }
      )
      .select()
      .single();

    if (prodErr) throw new Error(`${p.codigo} producto: ` + prodErr.message);

    const buffer = fs.readFileSync(`/tmp/blu_batch3/${p.codigo}.jpg`);
    const storagePath = `swarovski/${p.codigo}.jpg`;
    const { error: upErr } = await supabase.storage
      .from("productos")
      .upload(storagePath, buffer, { contentType: "image/jpeg", upsert: true });
    if (upErr) throw new Error(`${p.codigo} storage: ` + upErr.message);

    const { data: pub } = supabase.storage.from("productos").getPublicUrl(storagePath);

    const { data: existente } = await supabase
      .from("producto_imagenes")
      .select("id")
      .eq("producto_id", producto.id)
      .eq("orden", 1);
    if (existente && existente.length) {
      await supabase.from("producto_imagenes").update({ url: pub.publicUrl }).eq("id", existente[0].id);
    } else {
      await supabase.from("producto_imagenes").insert({ producto_id: producto.id, orden: 1, url: pub.publicUrl });
    }

    const { count } = await supabase
      .from("movimientos_stock")
      .select("id", { count: "exact", head: true })
      .eq("producto_id", producto.id);
    if (!count) {
      await supabase.from("movimientos_stock").insert({
        producto_id: producto.id,
        tipo: "entrada",
        cantidad: p.stock,
        nota: "Stock inicial (planilla Blühend, lote 3)",
      });
    }

    console.log("OK:", p.codigo, "-", p.titulo, p.linea, "->", pub.publicUrl);
  }

  console.log("Listo, 10 productos cargados.");
}

main();
