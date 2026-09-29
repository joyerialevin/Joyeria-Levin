// Prueba puntual: cargar el primer producto de la planilla Blühend
// (BLU-0001, Dije Corazón 10mm Light Rose AB) en Supabase, mismo estilo
// de precio/descuento que los relojes (precio de lista + precio con
// descuento por transferencia). Descripción tomada tal cual de la
// página oficial de Blühend.
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
    .upsert(
      {
        codigo: "BLU-0001",
        referencia_fabricante: "#000004",
        categoria_slug: "swarovski",
        marca: "Blühend",
        linea: "Light Rose AB",
        titulo: "Dije Corazón 10 mm",
        descripcion:
          "Dije de corazón 10 mm creado con cristal auténtico de Swarovski® y Plata 925. El precio no incluye la cadena de plata.",
        material: "plata_925",
        tipo: null,
        precio: 18200,
        precio_anterior: null,
        precio_transferencia: 16380,
        ocultar_precio: false,
        estado: "activo",
        destacar_nuevo: false,
      },
      { onConflict: "codigo" }
    )
    .select()
    .single();

  if (prodErr) throw new Error("producto: " + prodErr.message);
  console.log("Producto:", producto.id, producto.codigo);

  const buffer = fs.readFileSync("/tmp/BLU-0001.jpg");
  const storagePath = "swarovski/BLU-0001.jpg";
  const { error: upErr } = await supabase.storage
    .from("productos")
    .upload(storagePath, buffer, { contentType: "image/jpeg", upsert: true });
  if (upErr) throw new Error("storage: " + upErr.message);

  const { data: pub } = supabase.storage.from("productos").getPublicUrl(storagePath);
  console.log("Foto:", pub.publicUrl);

  const { data: existente } = await supabase
    .from("producto_imagenes")
    .select("id")
    .eq("producto_id", producto.id)
    .eq("orden", 1);
  if (existente && existente.length) {
    await supabase.from("producto_imagenes").update({ url: pub.publicUrl }).eq("id", existente[0].id);
  } else {
    await supabase.from("producto_imagenes").insert({ producto_id: producto.id, orden: 1, url: pub.publicUrl });
  }

  const { count } = await supabase
    .from("movimientos_stock")
    .select("id", { count: "exact", head: true })
    .eq("producto_id", producto.id);
  if (!count) {
    await supabase.from("movimientos_stock").insert({
      producto_id: producto.id,
      tipo: "entrada",
      cantidad: 3,
      nota: "Stock inicial (prueba planilla Blühend)",
    });
    console.log("Stock inicial cargado: 3");
  }

  console.log("Listo.");
}

main();
