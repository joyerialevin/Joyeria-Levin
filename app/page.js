import Link from "next/link";
import { getSanity, NOVEDADES_QUERY, RESUMEN_HOME_QUERY } from "../lib/sanityClient";
import { CATEGORIAS } from "../lib/categorias";
import CategoryStrip from "../components/CategoryStrip";
import BrandStrip from "../components/BrandStrip";
import NovedadesSection from "../components/NovedadesSection";
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
      <section className="levin-fade hero-home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fotos/clara-inicio.png"
          alt="Joyería Levin — Joyería & Relojería"
          className="hero-home-img"
        />
        <div className="hero-home-copy">
          <div className="stamp" style={{ color: "var(--oro-deep)", marginBottom: 14 }}>
            Joyería &amp; Relojería Levin
          </div>
          <h1
            className="display"
            style={{
              fontSize: "clamp(26px, 3.6vw, 46px)",
              lineHeight: 1.15,
              margin: "0 0 20px",
              color: "var(--ink)",
            }}
          >
            Desde 1973, acompañando momentos que perduran.
          </h1>
          <p
            style={{
              fontSize: "clamp(13px, 1.1vw, 16px)",
              lineHeight: 1.6,
              color: "var(--ink-soft)",
              margin: "0 0 32px",
            }}
          >
            Joyas en oro 18K y plata 925 · Relojes de primeras marcas · Taller y atención personalizada.
          </p>
          <div className="hero-home-botones" style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", marginBottom: 18 }}>
            <Link
              href="/catalogo"
              className="stamp"
              style={{ color: "var(--porcelain)", background: "var(--oro)", padding: "16px 34px", borderRadius: "var(--radius-sm)" }}
            >
              Ver catálogo
            </Link>
            <a
              href="#visitanos"
              className="stamp"
              style={{ color: "var(--ink)", borderBottom: "1px solid var(--oro)", paddingBottom: 4 }}
            >
              Visitanos en Paraná
            </a>
          </div>
          <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>Perú 134 · Paraná</div>
        </div>
      </section>

      <BeneficiosStrip />
      <NovedadesSection productos={novedades} />
      <CategoryStrip categorias={categorias} />
      <VisitanosSection />
      <BrandStrip marcas={marcas} />
    </>
  );
}
