// Carga el segundo lote de productos Blühend (BLU-0002 a BLU-0011, salteando
// BLU-0010 por no tener coincidencia exacta en la web oficial) en Supabase,
// mismo estilo que BLU-0001: precio de lista + precio con descuento por
// transferencia, descripción oficial de Blühend, marca oculta al público.
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

const DESC_DIJE_CORAZON =
  "Dije de corazón 10 mm creado con cristal auténtico de Swarovski® y Plata 925. El precio no incluye la cadena de plata.";
const DESC_AROS_CORAZON =
  "Aros de plata 925 y corazón de cristal auténtico de Swarovski® de 10 mm. Ideales para brillar en tu día a día. Los aros no tienen cambio.";
const DESC_AROS_PRINCESS =
  "Aros creados con cristales auténticos de Swarovski® y Plata 925. Los Princess Cut tienen un brillo único por sus más de 50 facetas. Los aros no tienen cambio.";

const PRODUCTOS = [
  {
    codigo: "BLU-0002",
    referencia_fabricante: "#000007",
    linea: "Aquamarine AB",
    titulo: "Dije Corazón 10 mm",
    descripcion: DESC_DIJE_CORAZON,
    precio: 18200,
    precio_transferencia: 16380,
    stock: 4,
  },
  {
    codigo: "BLU-0003",
    referencia_fabricante: "#000012",
    linea: "Crystal Moonlight",
    titulo: "Dije Corazón 10 mm",
    descripcion: DESC_DIJE_CORAZON,
    precio: 18200,
    precio_transferencia: 16380,
    stock: 3,
  },
  {
    codigo: "BLU-0004",
    referencia_fabricante: "#000026",
    linea: "Crystal Shimmer",
    titulo: "Dije Corazón 10 mm",
    descripcion: DESC_DIJE_CORAZON,
    precio: 18200,
    precio_transferencia: 16380,
    stock: 5,
  },
  {
    codigo: "BLU-0005",
    referencia_fabricante: "#000125",
    linea: "Crystal",
    titulo: "Aros Corazón 10 mm",
    descripcion: DESC_AROS_CORAZON,
    precio: 39600,
    precio_transferencia: 35640,
    stock: 2,
  },
  {
    codigo: "BLU-0006",
    referencia_fabricante: "#000128",
    linea: "Light Rose AB",
    titulo: "Aros Corazón 10 mm",
    descripcion: DESC_AROS_CORAZON,
    precio: 39600,
    precio_transferencia: 35640,
    stock: 2,
  },
  {
    codigo: "BLU-0007",
    referencia_fabricante: "#000133",
    linea: "Crystal Moonlight",
    titulo: "Aros Corazón 10 mm",
    descripcion: DESC_AROS_CORAZON,
    precio: 39600,
    precio_transferencia: 35640,
    stock: 1,
  },
  {
    codigo: "BLU-0008",
    referencia_fabricante: "#000141",
    linea: "Aquamarine AB",
    titulo: "Aros Corazón 10 mm",
    descripcion: DESC_AROS_CORAZON,
    precio: 39600,
    precio_transferencia: 35640,
    stock: 4,
  },
  {
    codigo: "BLU-0009",
    referencia_fabricante: "#000169",
    linea: "Crystal Shimmer",
    titulo: "Aros Corazón 10 mm",
    descripcion: DESC_AROS_CORAZON,
    precio: 39600,
    precio_transferencia: 35640,
    stock: 5,
  },
  {
    codigo: "BLU-0011",
    referencia_fabricante: "#000789",
    linea: "Aquamarine",
    titulo: "Aros Princess Cut 11 mm",
    descripcion: DESC_AROS_PRINCESS,
    precio: 61500,
    precio_transferencia: 55350,
    stock: 1,
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

    const buffer = fs.readFileSync(`/tmp/blu_batch2/${p.codigo}.jpg`);
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
        nota: "Stock inicial (planilla Blühend, lote 2)",
      });
    }

    console.log("OK:", p.codigo, "-", p.titulo, p.linea, "->", pub.publicUrl);
  }

  console.log("Listo, 9 productos cargados.");
}

main();
