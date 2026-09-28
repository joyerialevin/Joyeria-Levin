// Actualiza precios de los 42 relojes de la planilla según la última
// versión de la hoja "Relojes". La planilla ahora distingue el tipo de
// descuento por marca:
//   - "Efectivo / transferencia": el precio de lista se muestra entero, y
//     el precio con descuento va en precio_transferencia (línea aparte,
//     "con Efectivo y Transferencia" + "% OFF EXTRA" — no cambia nada de
//     la UI, ya soporta este caso).
//   - "Todos los medios de pago": el descuento aplica siempre, así que el
//     precio con descuento pasa a ser el precio real (precio), y el
//     precio de lista queda como precio_anterior (tachado, badge "% OFF"
//     general) — también ya soportado por la UI, sin tocar componentes.
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
  const rows = JSON.parse(
    fs.readFileSync(
      "/private/tmp/claude-501/-Users-danalevin-Joyeria-Levin/548d163d-e5ae-4630-ae0a-d3cbf5b4a33c/scratchpad/relojes_hoy.json",
      "utf8"
    )
  );

  const resumen = [];

  for (const r of rows) {
    const codigo = r["Cód. producto"];
    const precioOriginal = r["Precio original Levin ($)"];
    const precioConDescuento = r["Precio con descuento Levin ($)"];
    const aplicaA = r["Descuento aplica a"];

    let update;
    if (precioOriginal == null) {
      update = { precio: null, precio_anterior: null, precio_transferencia: null };
    } else if (aplicaA === "Efectivo / transferencia") {
      update = { precio: precioOriginal, precio_anterior: null, precio_transferencia: precioConDescuento ?? null };
    } else if (aplicaA === "Todos los medios de pago") {
      update = { precio: precioConDescuento ?? precioOriginal, precio_anterior: precioOriginal, precio_transferencia: null };
    } else {
      update = { precio: precioOriginal, precio_anterior: null, precio_transferencia: null };
    }

    const { error } = await supabase.from("productos").update(update).eq("codigo", codigo);
    resumen.push({ codigo, marca: r["Marca"], ...update, estado: error ? "ERROR: " + error.message : "OK" });
  }

  console.table(resumen);
  const fallidos = resumen.filter((r) => r.estado !== "OK");
  console.log("Actualizados:", resumen.length - fallidos.length, "de", resumen.length);
}

main();
