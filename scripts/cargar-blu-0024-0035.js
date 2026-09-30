// Carga el cuarto lote de productos Blühend (BLU-0024 a BLU-0028, BLU-0031 a
// BLU-0035; salteando BLU-0029 y BLU-0030 por no tener ese colorway vigente
// en la ficha del dije en la web oficial) en Supabase, mismo estilo que los
// lotes anteriores.
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

const DESC_AROS_CORAZON =
  "Aros de plata 925 y corazón de cristal auténtico de Swarovski® de 10 mm. Ideales para brillar en tu día a día. Los aros no tienen cambio.";
const DESC_COLLAR_FANTASY =
  "Collar de Plata 925 elaborado a mano con cristal de Swarovski® en forma de mariposa.";
const DESC_AROS_FANTASY =
  "Aros de Plata 925 con cristales de Swarovski® en forma de mariposa.";
const DESC_AROS_GOTAS =
  "Aros creados con gotas de cristal auténtico de Swarovski® de 10 mm y Plata 925. Los aros no tienen cambio.";
const DESC_DIJE_PEAR =
  "Dije Pear Cut de 11 mm creado con cristal auténtico de Swarovski® y Plata 925. Más de 50 facetas que le aportan un brillo único.";
const DESC_COLLAR_LIMITLESS =
  "Collar versátil de 83 cm, ideal para crear múltiples combinaciones únicas. Elaborado con Plata 925 y cristales de Swarovski®.";

const PRODUCTOS = [
  {
    codigo: "BLU-0024",
    referencia_fabricante: "#009563",
    linea: "Crystal CAL",
    titulo: "Aros Corazón 10 mm",
    descripcion: DESC_AROS_CORAZON,
    precio: 39600,
    precio_transferencia: 35640,
    stock: 3,
  },
  {
    codigo: "BLU-0025",
    referencia_fabricante: "#011561",
    linea: "Crystal",
    titulo: "Collar Fantasy",
    descripcion: DESC_COLLAR_FANTASY,
    precio: 127900,
    precio_transferencia: 115110,
    stock: 1,
  },
  {
    codigo: "BLU-0026",
    referencia_fabricante: "#011563",
    linea: "Light Rose",
    titulo: "Collar Fantasy",
    descripcion: DESC_COLLAR_FANTASY,
    precio: 127900,
    precio_transferencia: 115110,
    stock: 2,
  },
  {
    codigo: "BLU-0027",
    referencia_fabricante: "#011571",
    linea: "Crystal",
    titulo: "Aros Fantasy",
    descripcion: DESC_AROS_FANTASY,
    precio: 103100,
    precio_transferencia: 92790,
    stock: 1,
  },
  {
    codigo: "BLU-0028",
    referencia_fabricante: "#011573",
    linea: "Light Rose",
    titulo: "Aros Fantasy",
    descripcion: DESC_AROS_FANTASY,
    precio: 103100,
    precio_transferencia: 92790,
    stock: 2,
  },
  {
    codigo: "BLU-0031",
    referencia_fabricante: "#012754",
    linea: "Crystal Silver Shade",
    titulo: "Aros Gotas 10 mm",
    descripcion: DESC_AROS_GOTAS,
    precio: 39600,
    precio_transferencia: 35640,
    stock: 2,
  },
  {
    codigo: "BLU-0032",
    referencia_fabricante: "#012756",
    linea: "Rosaline",
    titulo: "Aros Gotas 10 mm",
    descripcion: DESC_AROS_GOTAS,
    precio: 39600,
    precio_transferencia: 35640,
    stock: 3,
  },
  {
    codigo: "BLU-0033",
    referencia_fabricante: "#013093",
    linea: "Aquamarine",
    titulo: "Aros Gotas 10 mm",
    descripcion: DESC_AROS_GOTAS,
    precio: 39600,
    precio_transferencia: 35640,
    stock: 3,
  },
  {
    codigo: "BLU-0034",
    referencia_fabricante: "#013376",
    linea: "Aquamarine",
    titulo: "Dije Pear Cut 11 mm",
    descripcion: DESC_DIJE_PEAR,
    precio: 26000,
    precio_transferencia: 23400,
    stock: 3,
  },
  {
    codigo: "BLU-0035",
    referencia_fabricante: "#013390",
    linea: "Degradé AB",
    titulo: "Collar Limitless",
    descripcion: DESC_COLLAR_LIMITLESS,
    precio: 198000,
    precio_transferencia: 178200,
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

    const buffer = fs.readFileSync(`/tmp/blu_batch4/${p.codigo}.jpg`);
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
        nota: "Stock inicial (planilla Blühend, lote 4)",
      });
    }

    console.log("OK:", p.codigo, "-", p.titulo, p.linea, "->", pub.publicUrl);
  }

  console.log("Listo, 10 productos cargados.");
}

main();
