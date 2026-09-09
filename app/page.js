import { getSanity, DESTACADOS_QUERY, RESUMEN_HOME_QUERY } from "../lib/sanityClient";
import { CATEGORIAS } from "../lib/categorias";
import CategoryStrip from "../components/CategoryStrip";
import PhotoStrip from "../components/PhotoStrip";
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
  relojes:
    "https://cpoaqzrgggpghnaitpqu.supabase.co/storage/v1/object/public/productos/relojes/dsc-4333.jpg", // Reloj Citizen 1
  swarovski:
    "https://cpoaqzrgggpghnaitpqu.supabase.co/storage/v1/object/public/productos/pulseras/pulsera-comb-10-colores.jpg",
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
      <section className="levin-fade home-hero-section" style={{ position: "relative", background: "var(--ink)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fotos/hero-portada.jpg"
          alt="Modelo luciendo joyas y reloj Levin"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 26%",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(38,38,31,0.52)",
          }}
        />
        <div
          className="container home-hero-content"
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
        <div className="home-hero-text" style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 0, maxWidth: 620, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "clamp(8px, 1.6vh, 18px)" }}>
            <span style={{ width: 24, height: 1, background: "var(--oro)", flexShrink: 0 }} />
            <span className="stamp" style={{ color: "var(--oro-20)", fontWeight: 400, fontSize: "clamp(10px, 1.4vh, 12px)" }}>
              Joyería &amp; relojería · Paraná
            </span>
          </div>
          <h1
            className="display"
            style={{
              fontSize: "clamp(26px, min(4.5vw, 4.6vh), 52px)",
              lineHeight: 1.15,
              color: "var(--porcelain)",
              margin: "0 0 clamp(10px, 1.8vh, 18px)",
            }}
          >
            Más de 50 años acompañando momentos que perduran.
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 2.4vh, 21px)",
              lineHeight: 1.6,
              color: "var(--line)",
              margin: "0 0 clamp(14px, 2.6vh, 28px)",
              maxWidth: "42ch",
            }}
          >
            Joyas y relojes elegidos con dedicación, atención personalizada y el cuidado de siempre.
          </p>

          <div style={{ borderTop: "1px solid rgba(253,252,248,0.15)", paddingTop: "clamp(10px, 2vh, 24px)", marginBottom: "clamp(14px, 2.6vh, 28px)" }}>
            <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
              <div>
                <div className="stamp" style={{ color: "var(--oro-20)", fontWeight: 300, marginBottom: "clamp(4px, 0.8vh, 8px)", fontSize: "clamp(10px, 1.4vh, 12px)" }}>
                  Dirección
                </div>
                <div style={{ fontSize: "clamp(12px, 1.5vh, 15px)", color: "var(--porcelain)", lineHeight: 1.6 }}>
                  Perú 134, Paraná
                  <br />
                  Entre Ríos
                </div>
              </div>
              <div>
                <div className="stamp" style={{ color: "var(--oro-20)", fontWeight: 300, marginBottom: "clamp(4px, 0.8vh, 8px)", fontSize: "clamp(10px, 1.4vh, 12px)" }}>
                  Horarios
                </div>
                <div style={{ fontSize: "clamp(12px, 1.5vh, 15px)", color: "var(--porcelain)", lineHeight: 1.6 }}>
                  Lunes a viernes 9:00–13:00 y 16:00–20:00
                  <br />
                  Sábados 9:00–13:00
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <a
              href="https://wa.me/5493434728312"
              target="_blank"
              rel="noopener noreferrer"
              className="stamp"
              style={{
                color: "var(--porcelain)",
                background: "var(--oro)",
                padding: "clamp(11px, 2vh, 16px) clamp(18px, 3vh, 28px)",
                borderRadius: "var(--radius-sm)",
                fontSize: "clamp(10px, 1.4vh, 12px)",
              }}
            >
              Escribinos por WhatsApp
            </a>
            <a
              href="/catalogo"
              className="stamp"
              style={{
                color: "var(--porcelain)",
                borderBottom: "1px solid rgba(253,252,248,0.4)",
                paddingBottom: 4,
                fontWeight: 400,
                fontSize: "clamp(10px, 1.4vh, 12px)",
              }}
            >
              Ver colección
            </a>
          </div>
        </div>
        </div>
      </section>

      <PhotoStrip />
      <CategoryStrip categorias={categorias} />
      <TrustBar />
      <FeaturedCarousel productos={destacados} />
      <BrandStrip marcas={marcas} />
    </>
  );
}
