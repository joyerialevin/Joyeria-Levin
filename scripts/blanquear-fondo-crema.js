// Corrige fotos con fondo crema/hueso (típico de fotos oficiales de marca,
// no de las que sacamos nosotros) reemplazándolo por blanco puro. A
// diferencia del fondo transparente (que se soluciona compositando), acá
// el fondo es un color opaco casi-blanco, así que se usa flood fill desde
// las 4 esquinas.
//
// OJO con PIL/ImageDraw.floodfill (Python, usado para generar los JPG que
// este script sube): si el color de relleno queda MUY parecido al color
// original (thresh alto tipo 30), floodfill no hace nada — hay que usar un
// thresh bajo (10-15) para que blanco puro se distinga lo suficiente del
// crema original y el fill se dispare de verdad.
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

// { storagePath: rutaLocalDelJpgYaCorregido }
const SUBIDAS = {
  "relojes/EFR-S108D-1AV.jpg": "/tmp/rel1_final.jpg",
  "relojes/EFR-S108D-7AV.jpg": "/tmp/rel2_final.jpg",
  "relojes/REL-0035.jpg": "/tmp/rel35_final.jpg",
  "relojes/REL-0036.jpg": "/tmp/rel36_final.jpg",
};

async function main() {
  for (const [storagePath, file] of Object.entries(SUBIDAS)) {
    if (!fs.existsSync(file)) continue;
    const buffer = fs.readFileSync(file);
    const { error } = await supabase.storage
      .from("productos")
      .upload(storagePath, buffer, { contentType: "image/jpeg", upsert: true });
    console.log(storagePath, error ? "ERROR " + error.message : "OK");
  }
}

main();
