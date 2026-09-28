// Pone en formato 1:1 (cuadrado, agregando margen blanco arriba/abajo o a
// los costados) las fotos de relojes que no venían cuadradas. Al mostrarse
// en una tarjeta cuadrada con object-fit:contain, una foto no-cuadrada deja
// ver el fondo de la tarjeta (var(--porcelain-dim), un crema clarito) como
// una franja arriba y abajo — por eso hay que cuadrarlas en el archivo
// mismo, no alcanza con el contenedor.
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

async function main() {
  const arreglados = JSON.parse(fs.readFileSync("/tmp/arreglados.json", "utf8"));
  const resumen = [];

  for (const [codigo, orden, storagePath, localFile] of arreglados) {
    const buffer = fs.readFileSync(localFile);
    const { error } = await supabase.storage
      .from("productos")
      .upload(storagePath, buffer, { contentType: "image/jpeg", upsert: true });
    resumen.push({ codigo, orden, storagePath, estado: error ? "ERROR: " + error.message : "OK" });
  }

  console.table(resumen);
  const fallidos = resumen.filter((r) => r.estado !== "OK");
  console.log("Cuadradas subidas:", resumen.length - fallidos.length, "de", resumen.length);
}

main();
