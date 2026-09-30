// BLU-0019 (Aros Gotas 10mm "Crystal") y BLU-0020 (Dije Pear Cut 11mm
// "Crystal") se cargaron con una foto equivocada: el color "Crystal" no
// existe realmente entre las variantes vigentes de esos dos productos en la
// web oficial de Blühend (se usó por error la imagen de otro producto,
// "Aros Lover", que compartía el mismo nombre de color en un bloque de datos
// de productos relacionados). Se borran del catálogo.
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
  for (const codigo of ["BLU-0019", "BLU-0020"]) {
    const { data: producto } = await supabase.from("productos").select("id").eq("codigo", codigo).single();
    if (!producto) {
      console.log(codigo, "no existe, nada que borrar.");
      continue;
    }
    await supabase.from("movimientos_stock").delete().eq("producto_id", producto.id);
    await supabase.from("producto_imagenes").delete().eq("producto_id", producto.id);
    await supabase.storage.from("productos").remove([`swarovski/${codigo}.jpg`]);
    await supabase.from("productos").delete().eq("id", producto.id);
    console.log(codigo, "borrado.");
  }
}

main();
