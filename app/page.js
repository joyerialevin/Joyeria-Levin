import { getSanity, DESTACADOS_QUERY, RESUMEN_HOME_QUERY } from "../lib/sanityClient";
import { CATEGORIAS } from "../lib/categorias";
import CategoryStrip from "../components/CategoryStrip";
import FeaturedCarousel from "../components/FeaturedCarousel";
import BrandStrip from "../components/BrandStrip";
import TrustBar from "../components/TrustBar";

export const revalidate = 60;

const SUBTEXTO_ESTATICO = {
  anillos: "Oro 18K y plata 925",
  pulseras: "Esclavas, rígidas y tejidas",
  cadenas: "Con o sin dije",
  aros: "Argollas, pasantes y colgantes",
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

  const [resumen, destacados] = await Promise.all([
    sanity.fetch(RESUMEN_HOME_QUERY),
    sanity.fetch(DESTACADOS_QUERY),
  ]);

  const filas = resumen || [];

  const imagenPorCategoria = {};
  filas.forEach((f) => {
    if (!imagenPorCategoria[f.categoria_slug]) {
      imagenPorCategoria[f.categoria_slug] = f.imagen_url;
    }
  });

  const marcasRelojes = [
    ...new Set(filas.filter((f) => f.categoria_slug === "relojes").map((f) => f.marca).filter(Boolean)),
  ];

  // Bebés y Alianzas viven en el mega menú del header pero, por ahora,
  // no tienen tarjeta propia en esta grilla de la home.
  const categorias = CATEGORIAS.filter((cat) => !["bebes", "alianzas"].includes(cat.slug)).map((cat) => ({
    slug: cat.slug,
    nombre: cat.nombre,
    imagen: IMAGEN_CURADA[cat.slug] || imagenPorCategoria[cat.slug] || null,
    subtexto:
      cat.slug === "relojes"
        ? marcasRelojes.slice(0, 4).join(" · ") || "Casio · Festina · Citizen · Tissot"
        : SUBTEXTO_ESTATICO[cat.slug] || "",
  }));

  const marcas = [...new Set(filas.map((f) => f.marca).filter(Boolean))].sort();

  return { categorias, marcas, destacados: destacados || [] };
}

export default async function HomePage() {
  const { categorias, marcas, destacados } = await getDatosHome();

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

      <CategoryStrip categorias={categorias} />
      <TrustBar />
      <FeaturedCarousel productos={destacados} />
      <BrandStrip marcas={marcas} />
    </>
  );
}
