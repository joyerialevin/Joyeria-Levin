// Vuelve a subir las fotos que habían quedado con fondo negro (bug de
// compresión: PNG con transparencia convertido directo a RGB en vez de
// compositarlo sobre blanco). Sobrescribe los mismos archivos en Storage
// (mismo path, mismo nombre) — no hace falta tocar producto_imagenes,
// las URLs no cambian.
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
  "/private/tmp/claude-501/-Users-danalevin-Joyeria-Levin/548d163d-e5ae-4630-ae0a-d3cbf5b4a33c/scratchpad/relojes_fix";

async function main() {
  const archivos = fs.readdirSync(FOTOS_DIR).filter((f) => f.endsWith(".jpg"));
  const resumen = [];

  for (const archivo of archivos) {
    const sinExt = archivo.replace(/\.jpg$/, "");
    const buffer = fs.readFileSync(path.join(FOTOS_DIR, archivo));
    const storagePath = `relojes/${sinExt}.jpg`;

    const { error } = await supabase.storage
      .from("productos")
      .upload(storagePath, buffer, { contentType: "image/jpeg", upsert: true });

    resumen.push({ archivo, estado: error ? "ERROR: " + error.message : "OK" });
  }

  console.table(resumen);
}

main();
