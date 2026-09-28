// Reemplaza TODAS las fotos de los 42 relojes de la planilla (REL-0001 a
// REL-0042) por las versiones definitivas que subiste a Drive (varias con
// el sufijo "_fondo_blanco"). Borra las filas viejas de producto_imagenes
// y los archivos viejos en Storage, y sube las nuevas de una — así los
// productos no quedan mostrando una mezcla de fotos vieja/nueva a mitad
// de camino.
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

const FOTOS_DIR = "/private/tmp/claude-501/-Users-danalevin-Joyeria-Levin/548d163d-e5ae-4630-ae0a-d3cbf5b4a33c/scratchpad/fotos_nuevas";

function esCodigoDeLosPrimeros42(codigo) {
  const m = codigo.match(/^REL-00(\d\d)$/);
  return m && parseInt(m[1], 10) >= 1 && parseInt(m[1], 10) <= 42;
}

async function main() {
  const { data: productos } = await supabase
    .from("productos")
    .select("id, codigo, referencia_fabricante")
    .eq("categoria_slug", "relojes");

  const objetivo = productos.filter((p) => esCodigoDeLosPrimeros42(p.codigo));
  console.log("Productos a actualizar:", objetivo.length);

  // 1) Borrar filas viejas de producto_imagenes y archivos viejos en Storage.
  const ids = objetivo.map((p) => p.id);
  const { data: imagenesViejas } = await supabase
    .from("producto_imagenes")
    .select("id, url")
    .in("producto_id", ids);

  const pathsViejos = imagenesViejas
    .map((img) => {
      const m = img.url.match(/\/productos\/(relojes\/.+)$/);
      return m ? m[1] : null;
    })
    .filter(Boolean);

  if (pathsViejos.length) {
    const { error: errStorage } = await supabase.storage.from("productos").remove(pathsViejos);
    if (errStorage) console.error("ERROR borrando storage:", errStorage.message);
    else console.log("Archivos viejos borrados de Storage:", pathsViejos.length);
  }

  const { error: errDelDb } = await supabase.from("producto_imagenes").delete().in("producto_id", ids);
  if (errDelDb) console.error("ERROR borrando filas viejas:", errDelDb.message);
  else console.log("Filas viejas borradas de producto_imagenes:", imagenesViejas.length);

  // 2) Subir las nuevas y crear las filas de producto_imagenes.
  const porBase = new Map();
  for (const p of objetivo) {
    const base = p.referencia_fabricante ? p.referencia_fabricante.replace(/\//g, "-") : p.codigo;
    porBase.set(base, p);
  }

  const archivos = fs.readdirSync(FOTOS_DIR).filter((f) => f.endsWith(".jpg"));
  const resumen = [];

  for (const archivo of archivos) {
    const sinExt = archivo.replace(/\.jpg$/, "");
    const match = sinExt.match(/^(.+)_(\d+)$/);
    if (!match) {
      resumen.push({ archivo, estado: "NOMBRE INVALIDO" });
      continue;
    }
    const [, base, ordenStr] = match;
    const orden = parseInt(ordenStr, 10);
    const producto = porBase.get(base);
    if (!producto) {
      resumen.push({ archivo, estado: "SIN MATCH en productos" });
      continue;
    }

    const buffer = fs.readFileSync(path.join(FOTOS_DIR, archivo));
    const storagePath = orden === 1 ? `relojes/${base}.jpg` : `relojes/${base}_${orden}.jpg`;

    const { error: uploadErr } = await supabase.storage
      .from("productos")
      .upload(storagePath, buffer, { contentType: "image/jpeg", upsert: true });
    if (uploadErr) {
      resumen.push({ archivo, estado: "ERROR upload: " + uploadErr.message });
      continue;
    }

    const { data: pub } = supabase.storage.from("productos").getPublicUrl(storagePath);
    const { error: insertErr } = await supabase
      .from("producto_imagenes")
      .insert({ producto_id: producto.id, orden, url: pub.publicUrl });

    resumen.push({
      archivo,
      codigo: producto.codigo,
      estado: insertErr ? "ERROR insert: " + insertErr.message : "OK",
    });
  }

  const fallidos = resumen.filter((r) => r.estado !== "OK");
  console.log("Subidas OK:", resumen.length - fallidos.length, "de", resumen.length);
  if (fallidos.length) console.table(fallidos);
}

main();
