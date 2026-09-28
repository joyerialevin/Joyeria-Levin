// Sube las fotos ya comprimidas (scratchpad/relojes_fotos/{filename}.jpg) a
// Supabase Storage y las vincula en producto_imagenes, matcheando cada
// archivo con su producto por referencia_fabricante (con "/" -> "-") o,
// si no tiene referencia, por el código interno REL-00xx.
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

const FOTOS_DIR =
  "/private/tmp/claude-501/-Users-danalevin-Joyeria-Levin/548d163d-e5ae-4630-ae0a-d3cbf5b4a33c/scratchpad/relojes_fotos";

async function main() {
  const { data: productos, error } = await supabase
    .from("productos")
    .select("id, codigo, referencia_fabricante");
  if (error) throw error;

  const porNombre = new Map();
  for (const p of productos) {
    const expected = p.referencia_fabricante ? p.referencia_fabricante.replace(/\//g, "-") : p.codigo;
    porNombre.set(expected, p);
  }

  const archivos = fs.readdirSync(FOTOS_DIR).filter((f) => f.endsWith(".jpg"));
  const resumen = [];

  for (const archivo of archivos) {
    const filename = archivo.replace(/\.jpg$/, "");
    const producto = porNombre.get(filename);
    if (!producto) {
      resumen.push({ archivo, estado: "SIN MATCH en productos" });
      continue;
    }

    const buffer = fs.readFileSync(path.join(FOTOS_DIR, archivo));
    const storagePath = `relojes/${filename}.jpg`;

    const { error: uploadErr } = await supabase.storage
      .from("productos")
      .upload(storagePath, buffer, { contentType: "image/jpeg", upsert: true });
    if (uploadErr) {
      resumen.push({ archivo, estado: "ERROR upload: " + uploadErr.message });
      continue;
    }

    const { data: pub } = supabase.storage.from("productos").getPublicUrl(storagePath);

    const { data: existentes } = await supabase
      .from("producto_imagenes")
      .select("id")
      .eq("producto_id", producto.id)
      .eq("orden", 1);

    if (existentes && existentes.length > 0) {
      await supabase.from("producto_imagenes").update({ url: pub.publicUrl }).eq("id", existentes[0].id);
    } else {
      await supabase
        .from("producto_imagenes")
        .insert({ producto_id: producto.id, orden: 1, url: pub.publicUrl });
    }

    resumen.push({ archivo, codigo: producto.codigo, estado: "OK" });
  }

  console.table(resumen);
  const fallidos = resumen.filter((r) => r.estado !== "OK");
  console.log("Total:", resumen.length, "OK:", resumen.length - fallidos.length, "Fallidos:", fallidos.length);
}

main();
