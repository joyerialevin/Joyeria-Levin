import Link from "next/link";
import { getSupabase } from "../lib/supabaseClient";
import { CATEGORIAS } from "../lib/categorias";
import CategoryStrip from "../components/CategoryStrip";
import PhotoStrip from "../components/PhotoStrip";
import FeaturedCarousel from "../components/FeaturedCarousel";
import BrandStrip from "../components/BrandStrip";
import TrustBar from "../components/TrustBar";
import TallerSection from "../components/TallerSection";

export const revalidate = 60;

const SUBTEXTO_ESTATICO = {
  anillos: "Oro 18K y plata 925",
  pulseras: "Esclavas, rígidas y tejidas",
  cadenas: "Con o sin dije",
  aros: "Argollas, pasantes y colgantes",
  swarovski: "Línea de cristales",
};

async function getDatosHome() {
  const supabase = getSupabase();

  const [{ data: resumen }, { data: destacados }] = await Promise.all([
    supabase
      .from("productos")
      .select("categoria_slug,marca,imagen_url,creado_en")
      .eq("activo", true)
      .order("creado_en", { ascending: false }),
    supabase
      .from("productos")
      .select("*")
      .eq("activo", true)
      .order("creado_en", { ascending: false })
      .limit(10),
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

  const categorias = CATEGORIAS.map((cat) => ({
    slug: cat.slug,
    nombre: cat.nombre,
    imagen: imagenPorCategoria[cat.slug] || null,
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
      <section
        className="container levin-fade"
        style={{
          padding: "84px 6% 64px",
          display: "grid",
          gridTemplateColumns: "1fr 1.05fr",
          gap: 72,
          alignItems: "center",
        }}
      >
        <div>
          <div className="stamp" style={{ color: "var(--oro-deep)", fontWeight: 300, marginBottom: 26 }}>
            Joyería y relojería · Paraná
          </div>
          <h1
            className="display"
            style={{ fontSize: 64, lineHeight: 1.06, letterSpacing: "-0.01em", margin: "0 0 26px" }}
          >
            Piezas que se heredan.
          </h1>
          <p
            style={{
              fontSize: 19,
              lineHeight: 1.65,
              color: "var(--ink-soft)",
              margin: "0 0 32px",
              maxWidth: "44ch",
            }}
          >
            Oro, plata y tiempo. Cada pieza se elige por su permanencia — y se entrega en mano, en nuestro local de
            siempre.
          </p>
          <div style={{ display: "flex", gap: 10, marginBottom: 38 }}>
            {["Oro 18K", "Plata 925", "Relojería"].map((etiqueta) => (
              <span
                key={etiqueta}
                className="stamp"
                style={{
                  padding: "5px 14px",
                  borderRadius: "var(--radius-pill)",
                  fontWeight: 300,
                  fontSize: 11,
                  background: "rgba(130,120,56,0.12)",
                  color: "var(--oro-deep)",
                }}
              >
                {etiqueta}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <Link
              href="/catalogo"
              className="stamp"
              style={{
                color: "var(--porcelain)",
                background: "var(--oro)",
                padding: "16px 34px",
                borderRadius: "var(--radius-sm)",
              }}
            >
              Ver catálogo
            </Link>
            <a
              href="https://wa.me/5493434728312"
              target="_blank"
              rel="noopener noreferrer"
              className="stamp"
              style={{
                color: "var(--ink)",
                borderBottom: "1px solid var(--line)",
                paddingBottom: 4,
                fontWeight: 400,
              }}
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: 16, alignItems: "end" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/fotos/hero-aros-modelo.jpg"
            alt="Aros de oro puestos en modelo"
            style={{
              width: "100%",
              aspectRatio: "3 / 4.1",
              objectFit: "cover",
              objectPosition: "50% 22%",
              display: "block",
              borderRadius: "var(--radius-sm)",
            }}
          />
          <div style={{ display: "grid", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/fotos/hero-pulsera.jpg"
              alt="Pulsera de oro"
              style={{ width: "100%", aspectRatio: "3 / 4", objectFit: "cover", display: "block", borderRadius: "var(--radius-sm)" }}
            />
            <div style={{ borderTop: "1px solid var(--line)", paddingTop: 14 }}>
              <div className="stamp" style={{ color: "var(--ink-soft)", fontWeight: 300 }}>
                Perú 134 · Paraná
              </div>
              <div style={{ fontSize: 15, color: "var(--ink)", marginTop: 6 }}>
                Lun a sáb · 9 a 13 y 17 a 20.30
              </div>
            </div>
          </div>
        </div>
      </section>

      <PhotoStrip />
      <CategoryStrip categorias={categorias} />
      <TrustBar />
      <FeaturedCarousel productos={destacados} />
      <TallerSection />
      <BrandStrip marcas={marcas} />
    </>
  );
}
