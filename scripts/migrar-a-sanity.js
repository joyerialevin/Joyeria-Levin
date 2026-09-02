// Trae todos los productos actuales de Supabase y los crea en Sanity,
// incluyendo la foto. Se corre una sola vez (o cada vez que haga falta
// re-sincronizar algo puntual). No borra ni toca nada en Supabase.
//
// Uso: node scripts/migrar-a-sanity.js

const fs = require("fs");
const path = require("path");
const { createClient: createSupabaseClient } = require("@supabase/supabase-js");
const { createClient: createSanityClient } = require("@sanity/client");

function cargarEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  const contenido = fs.readFileSync(envPath, "utf-8");
  contenido.split("\n").forEach((linea) => {
    const match = linea.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match) process.env[match[1]] = match[2].trim();
  });
}

cargarEnvLocal();

const supabase = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const sanity = createSanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function subirImagen(url, nombre) {
  const respuesta = await fetch(url);
  if (!respuesta.ok) throw new Error(`No se pudo descargar la foto: ${url}`);
  const buffer = Buffer.from(await respuesta.arrayBuffer());
  return sanity.assets.upload("image", buffer, { filename: nombre });
}

async function migrar() {
  console.log("Leyendo productos de Supabase...");
  const { data: productos, error } = await supabase
    .from("productos")
    .select("*")
    .order("creado_en", { ascending: true });

  if (error) throw error;
  console.log(`Encontrados ${productos.length} productos.\n`);

  let migrados = 0;
  let saltados = 0;

  for (const p of productos) {
    // Evita duplicar si el script se corre más de una vez.
    const yaExiste = await sanity.fetch(
      `count(*[_type == "producto" && supabaseId == $id])`,
      { id: p.id }
    );
    if (yaExiste > 0) {
      console.log(`— Ya migrado, salteo: ${p.titulo}`);
      saltados++;
      continue;
    }

    console.log(`→ Migrando: ${p.titulo}`);

    let imagenes = [];
    if (p.imagen_url) {
      try {
        const asset = await subirImagen(p.imagen_url, `${p.id}.jpg`);
        imagenes = [
          {
            _type: "image",
            _key: asset._id,
            asset: { _type: "reference", _ref: asset._id },
          },
        ];
      } catch (e) {
        console.warn(`  ⚠️ No se pudo subir la foto de "${p.titulo}": ${e.message}`);
      }
    }

    await sanity.create({
      _type: "producto",
      supabaseId: p.id, // guarda el id viejo para no duplicar en próximas corridas
      titulo: p.titulo,
      descripcion: p.descripcion || undefined,
      precio: Number(p.precio),
      imagenes,
      categoriaSlug: p.categoria_slug,
      tipo: p.tipo || undefined,
      marca: p.marca || undefined,
      material: p.material || undefined,
      tieneAbridor: p.tiene_abridor ?? undefined,
      activo: p.activo,
    });

    migrados++;
  }

  console.log(`\nListo. Migrados: ${migrados}. Ya existían: ${saltados}.`);
}

migrar().catch((err) => {
  console.error("Error en la migración:", err);
  process.exit(1);
});
