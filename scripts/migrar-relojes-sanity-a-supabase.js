// Migra a Supabase los relojes que todavía viven en Sanity (los que no
// pasaron por la planilla porque ya estaban cargados de antes). Usa los
// datos tal cual están en Sanity — título, precio, detalles, fotos — sin
// forzarlos al esquema rígido de ficha técnica (para eso están las
// columnas libres "titulo", "descripcion" y "detalles_extra" en
// productos). Las fotos quedan apuntando a la URL de Sanity: no se migran
// los binarios en esta pasada, es un paso aparte si hace falta.
//
// Después de correr esto, sanityClient.js vuelve a excluir "relojes" de
// todas sus queries — Supabase pasa a ser la ÚNICA fuente de relojes.
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
  const relojes = await sanity.fetch(`*[_type=="producto" && categoriaSlug=="relojes" && activo==true]{
    _id,
    titulo,
    descripcion,
    precio,
    "precio_anterior": precioAnterior,
    "precio_transferencia": precioTransferencia,
    "ocultar_precio": ocultarPrecio,
    "detalles": detalles[]{etiqueta, valor},
    "imagenes": imagenes[].asset->url,
    tipo,
    marca,
    destacarNuevo
  }`);

  console.log("Relojes a migrar desde Sanity:", relojes.length);

  let siguienteNumero = 43; // REL-0001..REL-0042 ya existen
  const resumen = [];

  for (const r of relojes) {
    const codigo = `REL-${String(siguienteNumero).padStart(4, "0")}`;
    siguienteNumero++;

    const { data: producto, error: prodErr } = await supabase
      .from("productos")
      .insert({
        codigo,
        categoria_slug: "relojes",
        marca: r.marca || null,
        titulo: r.titulo || null,
        descripcion: r.descripcion || null,
        tipo: r.tipo || null,
        precio: r.precio ?? null,
        precio_anterior: r.precio_anterior ?? null,
        precio_transferencia: r.precio_transferencia ?? null,
        ocultar_precio: !!r.ocultar_precio,
        estado: "activo",
        destacar_nuevo: !!r.destacarNuevo,
        detalles_extra: r.detalles && r.detalles.length > 0 ? r.detalles : null,
      })
      .select()
      .single();

    if (prodErr) {
      resumen.push({ sanityId: r._id, titulo: r.titulo, estado: "ERROR: " + prodErr.message });
      continue;
    }

    const imagenes = (r.imagenes || []).filter(Boolean);
    if (imagenes.length > 0) {
      const filas = imagenes.map((url, i) => ({ producto_id: producto.id, orden: i + 1, url }));
      const { error: imgErr } = await supabase.from("producto_imagenes").insert(filas);
      if (imgErr) console.error("ERROR imagenes", codigo, imgErr.message);
    }

    resumen.push({ codigo, sanityId: r._id, titulo: r.titulo, fotos: imagenes.length, estado: "OK" });
  }

  console.log("Migrados:", resumen.filter((r) => r.estado === "OK").length, "de", relojes.length);
  const errores = resumen.filter((r) => r.estado !== "OK");
  if (errores.length) {
    console.log("Errores:");
    console.table(errores);
  }
  fs.writeFileSync(
    "/private/tmp/claude-501/-Users-danalevin-Joyeria-Levin/548d163d-e5ae-4630-ae0a-d3cbf5b4a33c/scratchpad/migracion_relojes_sanity.json",
    JSON.stringify(resumen, null, 2)
  );
}

main();
