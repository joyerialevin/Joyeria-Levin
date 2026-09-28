// Importa la planilla maestra de relojes (Relojes + Fichas) a Supabase.
// Lee /tmp/relojes.json y /tmp/fichas.json (exportados de la planilla real)
// y hace upsert por código, así se puede correr de nuevo sin duplicar nada.
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

const ESTADO_MAP = {
  Activo: "activo",
  "A pedido": "a_pedido",
  Oculto: "oculto",
  Discontinuado: "discontinuado",
};

async function main() {
  const relojes = JSON.parse(fs.readFileSync("/tmp/relojes.json", "utf8"));
  const fichas = JSON.parse(fs.readFileSync("/tmp/fichas.json", "utf8"));
  const fichaPorCodigo = new Map(fichas.map((f) => [f["Cód. producto"], f]));

  const resumen = [];

  for (const r of relojes) {
    const codigo = r["Cód. producto"];
    const tipo = r["Género"] === "Caballero" ? "caballero" : "dama";
    const estado = ESTADO_MAP[r["Estado"]] || "activo";

    const { data: producto, error: prodErr } = await supabase
      .from("productos")
      .upsert(
        {
          codigo,
          referencia_fabricante: r["Ref. fabricante"] || null,
          categoria_slug: "relojes",
          marca: r["Marca"] || null,
          linea: r["Línea"] || null,
          tipo,
          precio: r["Precio original Levin ($)"] ?? null,
          precio_transferencia: r["Precio efectivo / transferencia Levin ($)"] ?? null,
          estado,
        },
        { onConflict: "codigo" }
      )
      .select()
      .single();

    if (prodErr) {
      console.error("ERROR producto", codigo, prodErr.message);
      continue;
    }

    const f = fichaPorCodigo.get(codigo) || {};
    const { error: fichaErr } = await supabase.from("producto_fichas").upsert(
      {
        producto_id: producto.id,
        movimiento: f["Movimiento"] || null,
        material_caja: f["Material caja"] || null,
        material_malla: f["Material malla"] || null,
        color_esfera: f["Color esfera"] || null,
        color_malla: f["Color malla"] || null,
        diametro_mm: f["Diámetro (mm)"] ?? null,
        cristal: f["Cristal"] || null,
        resistencia_agua_m: f["Resist. agua (m)"] ?? null,
        funciones: f["Funciones"] || null,
        descripcion: f["Descripción"] || null,
        revisado: f["Revisado"] === "Sí",
      },
      { onConflict: "producto_id" }
    );
    if (fichaErr) console.error("ERROR ficha", codigo, fichaErr.message);

    // Stock inicial: solo si el producto todavía no tiene ningún movimiento
    // (evita duplicar el stock del REL-0004 que ya se cargó a mano de prueba).
    const { count } = await supabase
      .from("movimientos_stock")
      .select("id", { count: "exact", head: true })
      .eq("producto_id", producto.id);

    if (!count) {
      const stockInicial = Math.round(r["Stock inicial"] ?? 0);
      if (stockInicial > 0) {
        const { error: stockErr } = await supabase.from("movimientos_stock").insert({
          producto_id: producto.id,
          tipo: "entrada",
          cantidad: stockInicial,
          nota: "Stock inicial (carga desde planilla)",
        });
        if (stockErr) console.error("ERROR stock", codigo, stockErr.message);
      }
    }

    resumen.push({ codigo, marca: r["Marca"], precio: producto.precio, estado: producto.estado });
  }

  console.log("Productos procesados:", resumen.length);
  console.table(resumen);
}

main();
