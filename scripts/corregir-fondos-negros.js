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

const SCRATCH = "/private/tmp/claude-501/-Users-danalevin-Joyeria-Levin/548d163d-e5ae-4630-ae0a-d3cbf5b4a33c/scratchpad";
const FOTOS_DIR = `${SCRATCH}/relojes_fix`;

// La foto principal (orden 1) se guarda SIN sufijo (relojes/{base}.jpg);
// solo los ángulos extra llevan "_{orden}" en el nombre. Los archivos
// locales sí llevan siempre "_{orden}" (incluido el 1), así que hay que
// pelarlo para orden 1 al armar el path real en Storage.
const items = JSON.parse(fs.readFileSync(`${SCRATCH}/fondos_negros.json`, "utf8"));

async function main() {
  const resumen = [];

  for (const [codigo, base, orden] of items) {
    const nombreLocal = `${base}_${orden}.jpg`;
    const buffer = fs.readFileSync(path.join(FOTOS_DIR, nombreLocal));
    const storagePath = orden === 1 ? `relojes/${base}.jpg` : `relojes/${base}_${orden}.jpg`;

    const { error } = await supabase.storage
      .from("productos")
      .upload(storagePath, buffer, { contentType: "image/jpeg", upsert: true });

    resumen.push({ codigo, storagePath, estado: error ? "ERROR: " + error.message : "OK" });
  }

  console.table(resumen);
}

main();
