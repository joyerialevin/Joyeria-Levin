import { getSanity, NOVEDADES_QUERY, RESUMEN_HOME_QUERY } from "../lib/sanityClient";
import { CATEGORIAS } from "../lib/categorias";
import CategoryStrip from "../components/CategoryStrip";
import BrandStrip from "../components/BrandStrip";
import NovedadesSection from "../components/NovedadesSection";

// 0 mientras curamos contenido en desarrollo, para ver los cambios de
// Sanity al instante. Volver a 60 antes de publicar el sitio.
export const revalidate = 0;

const SUBTEXTO_ESTATICO = {
  relojes: "+ de 15 marcas",
  anillos: "Oro 18K y plata 925",
  pulseras: "Oro 18K y plata 925",
  cadenas: "Oro 18K y plata 925",
  aros: "Oro 18K y plata 925",
  swarovski: "Línea de cristales",
};

// Fotos elegidas a mano para las tarjetas de categoría de la home —
// tienen prioridad sobre la foto del producto más reciente.
const IMAGEN_CURADA = {
  relojes: "/fotos/categoria-relojes.jpg",
  swarovski: "/fotos/categoria-swarovski.jpg",
  anillos: "/fotos/categoria-anillos.jpg",
  pulseras: "/fotos/categoria-pulseras.jpg",
  cadenas: "/fotos/categoria-cadenas.jpg",
  aros: "/fotos/categoria-aros.jpg",
};

async function getDatosHome() {
  const sanity = getSanity();

  const [resumen, novedades] = await Promise.all([
    sanity.fetch(RESUMEN_HOME_QUERY),
    sanity.fetch(NOVEDADES_QUERY),
  ]);

  const filas = resumen || [];

  const imagenPorCategoria = {};
  filas.forEach((f) => {
    if (!imagenPorCategoria[f.categoria_slug]) {
      imagenPorCategoria[f.categoria_slug] = f.imagen_url;
    }
  });

  // Bebés y Alianzas viven en el mega menú del header pero, por ahora,
  // no tienen tarjeta propia en esta grilla de la home.
  const categorias = CATEGORIAS.filter((cat) => !["bebes", "alianzas"].includes(cat.slug)).map((cat) => ({
    slug: cat.slug,
    nombre: cat.nombre,
    imagen: IMAGEN_CURADA[cat.slug] || imagenPorCategoria[cat.slug] || null,
    subtexto: SUBTEXTO_ESTATICO[cat.slug] || "",
  }));

  const marcas = [...new Set(filas.map((f) => f.marca).filter(Boolean))].sort();

  return { categorias, marcas, novedades: novedades || [] };
}

export default async function HomePage() {
  const { categorias, marcas, novedades } = await getDatosHome();

  return (
    <>
      <section className="levin-fade" style={{ lineHeight: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fotos/hero-portada.jpg"
          alt="Joyería Levin — Joyería & Relojería"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </section>

      <NovedadesSection productos={novedades} />
      <CategoryStrip categorias={categorias} />
      <BrandStrip marcas={marcas} />
    </>
  );
}
