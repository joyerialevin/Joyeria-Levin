// Restaura REL-0024 (Citizen EQ0539-56Y), borrado por error creyendo que
// era un duplicado de REL-0023 — son relojes distintos según la planilla
// (cada uno con su propia ficha técnica y link oficial). Recrea producto,
// ficha, stock inicial y sube de nuevo sus fotos desde Drive.
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
  const { data: producto, error: prodErr } = await supabase
    .from("productos")
    .insert({
      codigo: "REL-0024",
      referencia_fabricante: "EQ0539-56Y",
      categoria_slug: "relojes",
      marca: "Citizen",
      linea: "Quartz",
      tipo: "dama",
      precio: 784350,
      precio_anterior: null,
      precio_transferencia: 666698,
      ocultar_precio: false,
      estado: "activo",
      destacar_nuevo: false,
    })
    .select()
    .single();

  if (prodErr) throw new Error("producto: " + prodErr.message);
  console.log("Producto recreado:", producto.id);

  const { error: fichaErr } = await supabase.from("producto_fichas").insert({
    producto_id: producto.id,
    movimiento: "Cuarzo",
    material_caja: "Acero inoxidable",
    material_malla: "Acero inoxidable",
    color_esfera: "Nácar gris",
    color_malla: "Plateada y dorada",
    diametro_mm: 25.5,
    cristal: "Mineral",
    resistencia_agua_m: 30,
    funciones: "Analógico, calendario y fecha",
    descripcion: "Cristales Swarovski en el bisel. 3 ATM: no apto para sumergir.",
    revisado: false,
  });
  if (fichaErr) console.error("ERROR ficha:", fichaErr.message);
  else console.log("Ficha recreada");

  const { error: stockErr } = await supabase.from("movimientos_stock").insert({
    producto_id: producto.id,
    tipo: "entrada",
    cantidad: 1,
    nota: "Stock inicial (restaurado tras borrado accidental)",
  });
  if (stockErr) console.error("ERROR stock:", stockErr.message);
  else console.log("Stock inicial cargado");
}

main();
