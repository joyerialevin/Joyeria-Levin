// Los 47 productos Blühend estaban todos bajo categoria_slug "swarovski".
// A pedido del usuario, se reparten en las categorías reales del catálogo
// (Aritos, Cadenas / Dijes, Pulseras, Anillos) igual que el resto del
// catálogo, en vez de vivir aparte. También se marca tipo:"dama" (son
// joyas de mujer) para que aparezcan bajo Dama en esas categorías, que
// filtran por género.
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

function inferirTipoProducto(titulo) {
  if (!titulo) return null;
  const t = titulo.trim().toLowerCase();
  if (t.startsWith("aros")) return "aros";
  if (t.startsWith("pulsera")) return "pulseras";
  if (t.startsWith("collar") || t.startsWith("corbatero")) return "collares";
  if (t.startsWith("dije")) return "dijes";
  if (t.startsWith("anillo")) return "anillos";
  return null;
}

const MAPA_CATEGORIA = { aros: "aros", pulseras: "pulseras", collares: "cadenas", dijes: "cadenas", anillos: "anillos" };

async function main() {
  const { data, error } = await supabase
    .from("productos")
    .select("id, codigo, titulo")
    .eq("categoria_slug", "swarovski");
  if (error) throw error;

  const resumen = {};
  for (const p of data) {
    const tipoProducto = inferirTipoProducto(p.titulo);
    const nuevaCategoria = MAPA_CATEGORIA[tipoProducto];
    if (!nuevaCategoria) {
      console.log("SIN MAPEO, se deja como está:", p.codigo, p.titulo);
      continue;
    }
    const { error: updErr } = await supabase
      .from("productos")
      .update({ categoria_slug: nuevaCategoria, tipo: "dama" })
      .eq("id", p.id);
    if (updErr) throw new Error(`${p.codigo}: ${updErr.message}`);
    resumen[nuevaCategoria] = (resumen[nuevaCategoria] || 0) + 1;
    console.log(p.codigo, "->", nuevaCategoria);
  }

  console.log("Listo.", resumen);
}

main();
