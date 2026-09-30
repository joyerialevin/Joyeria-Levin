// Carga el sexto y último lote de productos Blühend con coincidencia exacta
// en la planilla (BLU-0048 a BLU-0055 y BLU-0059; el resto de filas hasta
// BLU-0064 son "Búsqueda en Blühend", sin coincidencia exacta, y se
// mantienen fuera del catálogo). Mismo estilo que los lotes anteriores.
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

const DESC_COLLAR_PORTOFINO =
  "Collar corto de cristal y Plata 925. Largo 40-45 cm. Fabricado en Italia, con packaging premium y certificado de autenticidad.";
const DESC_COLLAR_PARMA =
  "Collar corto de cristal de Swarovski® y Plata 925 bañada en Oro de 18kt. Largo 40-45 cm. Fabricado en Italia, con packaging premium y certificado de autenticidad. Garantía de 6 meses para el baño de oro.";
const DESC_AROS_SIENA =
  "Aros colgantes cortos de cristales de Swarovski® y Plata 925 bañada en Oro de 18kt, forma de flor. Fabricados en Italia, con packaging premium y certificado de autenticidad. Garantía de 6 meses para el baño de oro.";
const DESC_COLLAR_SIENA =
  "Collar corto de cristales de Swarovski® y Plata 925 bañada en Oro de 18kt, forma de flor. Largo 45-50 cm. Fabricado en Italia, con packaging premium y certificado de autenticidad. Garantía de 6 meses para el baño de oro.";
const DESC_COLLAR_CERDENA_TRIO =
  "Collar corto con cristales de Swarovski® y Plata 925 bañada en Oro de 18kt. Largo 40-45 cm, cierre resorte, cadena diamantada. Fabricado en Italia, con packaging premium y certificado de autenticidad. Garantía de 6 meses para el baño de oro.";
const DESC_AROS_CUBOS_MINI =
  "Aros de Plata 925 con cubos de cristales de Swarovski®.";
const DESC_AROS_DICOMO =
  "Pendientes botón con cristal y Plata 925 bañada en Oro de 18kt, forma de lágrima, con cierre a presión. Fabricados en Italia, con packaging premium y certificado de autenticidad. Garantía de 6 meses para el baño de oro.";
const DESC_PULSERA_PREMIUM =
  "Pulsera de Plata 925 enhebrada con doble fila de cristales auténticos de Swarovski®.";

const PRODUCTOS = [
  {
    codigo: "BLU-0048",
    referencia_fabricante: "#014100",
    linea: "Chrysolite Baño Plata",
    titulo: "Collar Portofino",
    descripcion: DESC_COLLAR_PORTOFINO,
    precio: 154200,
    precio_transferencia: 138780,
    stock: 1,
  },
  {
    codigo: "BLU-0049",
    referencia_fabricante: "#014101",
    linea: "Violet Baño Plata",
    titulo: "Collar Portofino",
    descripcion: DESC_COLLAR_PORTOFINO,
    precio: 154200,
    precio_transferencia: 138780,
    stock: 1,
  },
  {
    codigo: "BLU-0050",
    referencia_fabricante: "#014124",
    linea: "Light Amethyst Baño Oro",
    titulo: "Collar Parma",
    descripcion: DESC_COLLAR_PARMA,
    precio: 96900,
    precio_transferencia: 87210,
    stock: 1,
  },
  {
    codigo: "BLU-0051",
    referencia_fabricante: "#014128",
    linea: "Amethyst Baño Oro",
    titulo: "Aros Siena",
    descripcion: DESC_AROS_SIENA,
    precio: 124000,
    precio_transferencia: 111600,
    stock: 1,
  },
  {
    codigo: "BLU-0052",
    referencia_fabricante: "#014129",
    linea: "Amethyst Baño Oro",
    titulo: "Collar Siena",
    descripcion: DESC_COLLAR_SIENA,
    precio: 125900,
    precio_transferencia: 113310,
    stock: 1,
  },
  {
    codigo: "BLU-0053",
    referencia_fabricante: "#014159",
    linea: "Multicolor Fuerte Baño Oro",
    titulo: "Collar Cerdeña Trio",
    descripcion: DESC_COLLAR_CERDENA_TRIO,
    precio: 143000,
    precio_transferencia: 128700,
    stock: 1,
  },
  {
    codigo: "BLU-0054",
    referencia_fabricante: "#014188",
    linea: "Crystal AB",
    titulo: "Aros Cubos Mini Largo",
    descripcion: DESC_AROS_CUBOS_MINI,
    precio: 49500,
    precio_transferencia: 44550,
    stock: 1,
  },
  {
    codigo: "BLU-0055",
    referencia_fabricante: "#014204",
    linea: "Crystal Baño Oro",
    titulo: "Aros DiComo Cortos",
    descripcion: DESC_AROS_DICOMO,
    precio: 85300,
    precio_transferencia: 76770,
    stock: 2,
  },
  {
    codigo: "BLU-0059",
    referencia_fabricante: "#005400",
    linea: null,
    titulo: "Pulsera Premium Enhebrada",
    descripcion: DESC_PULSERA_PREMIUM,
    precio: 383600,
    precio_transferencia: 345240,
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

    const buffer = fs.readFileSync(`/tmp/blu_batch6/${p.codigo}.jpg`);
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
        nota: "Stock inicial (planilla Blühend, lote 6)",
      });
    }

    console.log("OK:", p.codigo, "-", p.titulo, p.linea, "->", pub.publicUrl);
  }

  console.log("Listo, 9 productos cargados.");
}

main();
