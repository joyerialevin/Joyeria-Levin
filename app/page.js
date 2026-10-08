import { getSanity, NOVEDADES_QUERY, RESUMEN_HOME_QUERY } from "../lib/sanityClient";
import { getRelojesSupabase } from "../lib/productosSupabase";
import { CATEGORIAS } from "../lib/categorias";
import CategoryStrip from "../components/CategoryStrip";
import BrandStrip from "../components/BrandStrip";
import NovedadesSection from "../components/NovedadesSection";
import HomeHeroCarousel from "../components/HomeHeroCarousel";
import ServiciosInicio from "../components/ServiciosInicio";
import BeneficiosStrip from "../components/BeneficiosStrip";
import VisitanosSection from "../components/VisitanosSection";

export const revalidate = 60;

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

  const [resumenSanity, novedadesSanity, relojes] = await Promise.all([
    sanity.fetch(RESUMEN_HOME_QUERY),
    sanity.fetch(NOVEDADES_QUERY),
    getRelojesSupabase(),
  ]);

  // Relojes ya viven en Supabase — se agregan acá con la misma forma que
  // usa el resumen de Sanity (categoria_slug, marca, imagen_url) para que
  // sigan apareciendo en la tira de marcas y en la foto de la categoría.
  const resumenRelojes = relojes.map((r) => ({
    categoria_slug: r.categoria_slug,
    marca: r.marca,
    imagen_url: r.imagen_url,
  }));
  const filas = [...(resumenSanity || []), ...resumenRelojes];

  const novedadesRelojes = relojes.filter((r) => r.destacar_nuevo);
  const novedades = [...(novedadesSanity || []), ...novedadesRelojes];

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

  // La tira de marcas de la home es solo de relojes. Se agrupa sin
  // distinguir mayúsculas/minúsculas porque el mismo nombre puede estar
  // cargado con distinta capitalización en Sanity (ej. "CASIO" y
  // "Casio"), y se prefiere la versión que no está toda en mayúscula.
  const marcasPorClave = new Map();
  filas
    .filter((f) => f.categoria_slug === "relojes" && f.marca)
    .forEach((f) => {
      const marca = f.marca.trim();
      const clave = marca.toLowerCase();
      const actual = marcasPorClave.get(clave);
      if (!actual || (actual === actual.toUpperCase() && marca !== marca.toUpperCase())) {
        marcasPorClave.set(clave, marca);
      }
    });
  const marcas = [...marcasPorClave.values()].sort();

  return { categorias, marcas, novedades: novedades || [] };
}

export default async function HomePage() {
  const { categorias, marcas, novedades } = await getDatosHome();

  return (
    <>
      <HomeHeroCarousel />
      <BeneficiosStrip />

      {/* Debajo del banner de Día de la Madre (que vive adentro de
          HomeHeroCarousel.js) y antes de Nuevos ingresos. Cuando se
          saque ese banner, esta sección queda directamente debajo
          del hero. */}
      <ServiciosInicio />

      <NovedadesSection productos={novedades} />
      <CategoryStrip categorias={categorias} />
      <VisitanosSection />
      <BrandStrip marcas={marcas} />
    </>
  );
}
