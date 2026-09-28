// Los 97 relojes migrados desde Sanity quedaron con creado_en = momento
// de la migración, no su fecha real de carga — así que aparecían todos
// como "recién llegados" en el orden más reciente primero. Se restaura
// la fecha original de Sanity (_createdAt) para que el orden refleje
// cuándo se cargó cada uno de verdad.
const fs = require("fs");
const path = require("path");

const env = {};
fs.readFileSync(path.join(__dirname, "..", ".env.local"), "utf8")
  .split("\n")
  .forEach((line) => {
    const m = line.match(/^([A-Z_0-9]+)=(.*)$/);
    if (m) env[m[1]] = m[2];
  });

const { createClient: createSanity } = require("next-sanity");
const { createClient: createSupabase } = require("@supabase/supabase-js");

const sanity = createSanity({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: env.SANITY_API_TOKEN,
});
const supabase = createSupabase(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  const migrados = JSON.parse(
    fs.readFileSync(
      "/private/tmp/claude-501/-Users-danalevin-Joyeria-Levin/548d163d-e5ae-4630-ae0a-d3cbf5b4a33c/scratchpad/migracion_relojes_sanity.json",
      "utf8"
    )
  ).filter((m) => m.estado === "OK");

  const fechas = await sanity.fetch(
    `*[_id in $ids]{ _id, _createdAt }`,
    { ids: migrados.map((m) => m.sanityId) }
  );
  const fechaPorId = new Map(fechas.map((f) => [f._id, f._createdAt]));

  let ok = 0;
  for (const m of migrados) {
    const creadoEn = fechaPorId.get(m.sanityId);
    if (!creadoEn) continue;
    const { error } = await supabase.from("productos").update({ creado_en: creadoEn }).eq("codigo", m.codigo);
    if (error) console.error("ERROR", m.codigo, error.message);
    else ok++;
  }
  console.log("Fechas corregidas:", ok, "de", migrados.length);
}

main();
