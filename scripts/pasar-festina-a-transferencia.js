// Cambia el mecanismo de descuento de los relojes Festina con 10% OFF:
// de "descuento general" (precio_anterior tachado, válido con cualquier
// medio de pago) a "descuento solo efectivo/transferencia" (precio_transferencia),
// igual que ya funciona en los Citizen. No toca el valor de los números,
// solo mueve cuál campo los contiene:
//   precio_anterior (precio de lista) -> precio
//   precio (ya con el 10% aplicado)   -> precio_transferencia
//   precio_anterior                   -> null
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
    .select("id, codigo, referencia_fabricante, precio, precio_anterior, precio_transferencia")
    .eq("marca", "Festina")
    .not("precio_anterior", "is", null);
  if (error) throw error;

  const resultados = [];
  for (const p of data) {
    const descuento = (1 - p.precio / p.precio_anterior) * 100;
    if (Math.round(descuento * 100) / 100 !== 10) {
      console.log("SALTEADO (no es 10% exacto):", p.codigo, p.referencia_fabricante, descuento.toFixed(2) + "%");
      continue;
    }

    const nuevoPrecio = p.precio_anterior;
    const nuevaTransferencia = p.precio;

    const { error: updErr } = await supabase
      .from("productos")
      .update({ precio: nuevoPrecio, precio_transferencia: nuevaTransferencia, precio_anterior: null })
      .eq("id", p.id);
    if (updErr) throw new Error(`${p.codigo}: ${updErr.message}`);

    resultados.push({
      codigo: p.codigo,
      referencia: p.referencia_fabricante,
      precio_antes: p.precio,
      precio_despues: nuevoPrecio,
      precio_anterior_antes: p.precio_anterior,
      precio_anterior_despues: null,
      transferencia_antes: p.precio_transferencia,
      transferencia_despues: nuevaTransferencia,
    });
  }

  console.table(resultados);
  console.log("Total actualizados:", resultados.length);
}

main();
