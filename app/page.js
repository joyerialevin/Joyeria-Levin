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
      <section className="levin-fade" style={{ background: "var(--ink)" }}>
        <div
          className="container home-hero-grid"
          style={{
            padding: "64px 6% 48px",
            display: "grid",
            gridTemplateColumns: "0.9fr 1.15fr",
            gap: 56,
            alignItems: "stretch",
          }}
        >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <span style={{ width: 24, height: 1, background: "var(--oro)" }} />
            <span className="stamp" style={{ color: "var(--oro-20)", fontWeight: 400 }}>
              Joyería &amp; relojería · Paraná
            </span>
          </div>
          <h1
            className="display"
            style={{
              fontSize: "clamp(36px, 4.5vw, 52px)",
              lineHeight: 1.15,
              color: "var(--porcelain)",
              margin: "0 0 18px",
            }}
          >
            Más de 50 años acompañando momentos que perduran.
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--line)",
              margin: "0 0 28px",
              maxWidth: "42ch",
            }}
          >
            Joyas y relojes elegidos con dedicación, atención personalizada y el cuidado de siempre.
          </p>

          <div style={{ borderTop: "1px solid rgba(253,252,248,0.15)", paddingTop: 24, marginBottom: 28 }}>
            <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
              <div>
                <div className="stamp" style={{ color: "var(--oro-20)", fontWeight: 300, marginBottom: 8 }}>
                  Dirección
                </div>
                <div style={{ fontSize: 15, color: "var(--porcelain)", lineHeight: 1.6 }}>
                  Perú 134, Paraná
                  <br />
                  Entre Ríos
                </div>
              </div>
              <div>
                <div className="stamp" style={{ color: "var(--oro-20)", fontWeight: 300, marginBottom: 8 }}>
                  Horarios
                </div>
                <div style={{ fontSize: 15, color: "var(--porcelain)", lineHeight: 1.6 }}>
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
                padding: "16px 28px",
                borderRadius: "var(--radius-sm)",
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
              }}
            >
              Ver colección
            </a>
          </div>
        </div>

        <video
          src="/videos/hero-inicio.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            minHeight: 480,
            objectFit: "cover",
            borderRadius: "var(--radius-sm)",
            display: "block",
          }}
        />
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
