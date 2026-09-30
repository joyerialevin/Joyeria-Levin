// A pedido del usuario, se saca la frase "Los aros no tienen cambio." de
// todas las descripciones de aritos (Blühend) que la tenían.
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
  const { data, error } = await supabase
    .from("productos")
    .select("id, codigo, descripcion")
    .ilike("descripcion", "%no tienen cambio%");
  if (error) throw error;

  for (const p of data) {
    const nueva = p.descripcion
      .replace(/\s*Los aros no tienen cambio\.?/i, "")
      .trim();
    const { error: updErr } = await supabase.from("productos").update({ descripcion: nueva }).eq("id", p.id);
    if (updErr) throw new Error(`${p.codigo}: ${updErr.message}`);
    console.log(p.codigo, "->", nueva);
  }

  console.log("Listo,", data.length, "productos actualizados.");
}

main();
