// Actualiza precio y precio_anterior de 7 relojes Festina puntuales (por
// referencia_fabricante exacta, para no tocar modelos hermanos con
// referencias parecidas, ej. F20560/3 y F20560/5 no están en esta lista).
// El precio con descuento siempre fue precio_anterior * 0.9 (10% OFF
// general) — se mantiene esa misma fórmula, solo cambia el precio
// original de cada uno.
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

const CAMBIOS = [
  { referencia: "F20285/8", precio_anterior: 441000 },
  { referencia: "F20560/1", precio_anterior: 750000 },
  { referencia: "F20560/7", precio_anterior: 750000 },
  { referencia: "F20669/2", precio_anterior: 810000 },
  { referencia: "F20096/1", precio_anterior: 774000 },
  { referencia: "F20098/2", precio_anterior: 891000 },
  { referencia: "F20752/1", precio_anterior: 525000 },
];

async function main() {
  const resultados = [];
  for (const c of CAMBIOS) {
    const nuevoPrecio = Math.round(c.precio_anterior * 0.9);

    const { data: actual, error: findErr } = await supabase
      .from("productos")
      .select("id, codigo, referencia_fabricante, precio, precio_anterior")
      .eq("referencia_fabricante", c.referencia)
      .eq("marca", "Festina")
      .single();
    if (findErr) throw new Error(`${c.referencia}: no encontrado (${findErr.message})`);

    const { error: updErr } = await supabase
      .from("productos")
      .update({ precio_anterior: c.precio_anterior, precio: nuevoPrecio })
      .eq("id", actual.id);
    if (updErr) throw new Error(`${c.referencia}: ${updErr.message}`);

    resultados.push({
      codigo: actual.codigo,
      referencia: c.referencia,
      precio_anterior_antes: actual.precio_anterior,
      precio_anterior_despues: c.precio_anterior,
      precio_antes: actual.precio,
      precio_despues: nuevoPrecio,
    });
  }

  console.table(resultados);
}

main();
