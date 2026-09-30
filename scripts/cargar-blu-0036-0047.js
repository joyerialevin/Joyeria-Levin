// Carga el quinto lote de productos Blühend (BLU-0036 a BLU-0040, BLU-0043 a
// BLU-0047; salteando BLU-0041 y BLU-0042 porque esa variante de color no
// existe realmente en la ficha vigente del producto en la web oficial) en
// Supabase, mismo estilo que los lotes anteriores. Cada imagen fue
// verificada contra el product_id propio de la página (no un bloque de
// productos relacionados) antes de cargarla.
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

const DESC_COLLAR_CANDELA =
  "Collar fino y delicado que combina perlas y cristales auténticos de Swarovski® en color AB (tornasolado).";
const DESC_PULSERA_4MM =
  "Pulsera creada con cristales auténticos de Swarovski® de 4 mm y Plata 925. Largo: 16 cm + extensión de 3 cm.";
const DESC_PULSERA_CERDENA =
  "Pulsera con cristales de Swarovski® y Plata bañada en Oro de 18kt. Largo 16-19 cm. Fabricada en Italia, con packaging premium y certificado de autenticidad. Garantía de 6 meses para el baño de oro.";
const DESC_AROS_TRENTO =
  "Pendientes cortos con cristales de Swarovski® y Plata 925 bañada en Oro 18kt, con cierre a presión. Fabricados en Italia, con packaging premium y certificado de autenticidad. Garantía de 6 meses para el baño de oro.";
const DESC_COLLAR_TRENTO =
  "Collar corto con cristal de Swarovski® y Plata 925 bañada en Oro de 18kt. Largo 40-45 cm con cierre resorte y cadena diamantada. Fabricado en Italia, con packaging premium y certificado de autenticidad.";
const DESC_COLLAR_STORM =
  "Collar con cordón y dije de Plata 925 y cristal auténtico de Swarovski®.";
const DESC_AROS_DICOMO =
  "Pendientes botón con cristal y Plata 925 bañada en Oro de 18kt, forma de lágrima, con cierre a presión. Fabricados en Italia, con packaging premium y certificado de autenticidad. Garantía de 6 meses para el baño de oro.";
const DESC_COLLAR_CERDENA_TRIO =
  "Collar corto con cristales de Swarovski® y Plata 925 bañada en Oro de 18kt. Largo 40-45 cm, cierre resorte, cadena diamantada. Fabricado en Italia, con packaging premium y certificado de autenticidad. Garantía de 6 meses para el baño de oro.";
const DESC_ANILLO_TRENTO =
  "Anillo ajustable en forma de espiral de Plata 925 bañada en Oro 18kt, con cristales de Swarovski®. Fabricado en Italia, con packaging premium y certificado de autenticidad. Garantía de 6 meses para el baño de oro.";
const DESC_COLLAR_PORTOFINO =
  "Collar corto de cristal y Plata 925. Largo 40-45 cm. Fabricado en Italia, con packaging premium y certificado de autenticidad.";

const PRODUCTOS = [
  {
    codigo: "BLU-0036",
    referencia_fabricante: "#013659",
    linea: "Crystal AB",
    titulo: "Collar Candela",
    descripcion: DESC_COLLAR_CANDELA,
    precio: 173300,
    precio_transferencia: 155970,
    stock: 1,
  },
  {
    codigo: "BLU-0037",
    referencia_fabricante: "#013800",
    linea: "Light Rose AB",
    titulo: "Pulsera 4 mm",
    descripcion: DESC_PULSERA_4MM,
    precio: 74300,
    precio_transferencia: 66870,
    stock: 2,
  },
  {
    codigo: "BLU-0038",
    referencia_fabricante: "#013907",
    linea: "Multicolor Baño Oro",
    titulo: "Pulsera Cerdeña",
    descripcion: DESC_PULSERA_CERDENA,
    precio: 170500,
    precio_transferencia: 153450,
    stock: 1,
  },
  {
    codigo: "BLU-0039",
    referencia_fabricante: "#013924",
    linea: "Light Amethyst Baño Oro",
    titulo: "Aros Trento Cortos",
    descripcion: DESC_AROS_TRENTO,
    precio: 150400,
    precio_transferencia: 135360,
    stock: 1,
  },
  {
    codigo: "BLU-0040",
    referencia_fabricante: "#013925",
    linea: "Light Amethyst Baño Oro",
    titulo: "Collar Trento",
    descripcion: DESC_COLLAR_TRENTO,
    precio: 154600,
    precio_transferencia: 139140,
    stock: 1,
  },
  {
    codigo: "BLU-0043",
    referencia_fabricante: "#013990",
    linea: "Crystal",
    titulo: "Collar Storm",
    descripcion: DESC_COLLAR_STORM,
    precio: 210400,
    precio_transferencia: 189360,
    stock: 1,
  },
  {
    codigo: "BLU-0044",
    referencia_fabricante: "#014011",
    linea: "Light Colorado Topaz Baño Oro",
    titulo: "Aros DiComo Cortos",
    descripcion: DESC_AROS_DICOMO,
    precio: 85300,
    precio_transferencia: 76770,
    stock: 1,
  },
  {
    codigo: "BLU-0045",
    referencia_fabricante: "#014059",
    linea: "Crystal Baño Oro",
    titulo: "Collar Cerdeña Trio",
    descripcion: DESC_COLLAR_CERDENA_TRIO,
    precio: 143000,
    precio_transferencia: 128700,
    stock: 1,
  },
  {
    codigo: "BLU-0046",
    referencia_fabricante: "#014068",
    linea: "Light Colorado Topaz Baño Oro",
    titulo: "Anillo Trento Ajustable",
    descripcion: DESC_ANILLO_TRENTO,
    precio: 189100,
    precio_transferencia: 170190,
    stock: 1,
  },
  {
    codigo: "BLU-0047",
    referencia_fabricante: "#014099",
    linea: "Aquamarine Baño Plata",
    titulo: "Collar Portofino",
    descripcion: DESC_COLLAR_PORTOFINO,
    precio: 154200,
    precio_transferencia: 138780,
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

    const buffer = fs.readFileSync(`/tmp/blu_batch5/${p.codigo}.jpg`);
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
        nota: "Stock inicial (planilla Blühend, lote 5)",
      });
    }

    console.log("OK:", p.codigo, "-", p.titulo, p.linea, "->", pub.publicUrl);
  }

  console.log("Listo, 10 productos cargados.");
}

main();
