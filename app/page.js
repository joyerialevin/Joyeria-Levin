import Link from "next/link";
import Image from "next/image";
import { getSupabase } from "../lib/supabaseClient";
import { CATEGORIAS } from "../lib/categorias";
import CategoryStrip from "../components/CategoryStrip";
import FeaturedCarousel from "../components/FeaturedCarousel";
import BrandStrip from "../components/BrandStrip";
import TrustBar from "../components/TrustBar";

export const revalidate = 60;

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

  const categorias = CATEGORIAS.map((cat) => ({
    slug: cat.slug,
    nombre: cat.nombre,
    imagen: imagenPorCategoria[cat.slug] || null,
  }));

  const marcas = [...new Set(filas.map((f) => f.marca).filter(Boolean))].sort();

  return { categorias, marcas, destacados: destacados || [] };
}

export default async function HomePage() {
  const { categorias, marcas, destacados } = await getDatosHome();

  return (
    <>
      <section
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          alignItems: "center",
          gap: 40,
          padding: "96px 0 70px",
        }}
      >
        <div>
          <span
            className="stamp"
            style={{ color: "var(--text-inverse)" }}
          >
            Joyería &amp; Relojería
          </span>
          <h1
            className="display"
            style={{
              fontSize: "56px",
              lineHeight: 1.05,
              marginTop: 18,
              textTransform: "uppercase",
            }}
          >
            Piezas que
            <br />
            se heredan.
          </h1>
          <p
            className="editorial"
            style={{
              marginTop: 24,
              color: "var(--text-inverse-soft)",
              maxWidth: 420,
              lineHeight: 1.6,
              fontSize: 19,
            }}
          >
            Una estética bien cuidada no se ve. Se siente.
          </p>
          <p
            style={{
              marginTop: 14,
              color: "var(--text-inverse-soft)",
              maxWidth: 420,
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Relojes, anillos, pulseras, cadenas y aros en oro 18K y plata 925.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 34 }}>
            <div className="stamp" style={{ border: "1px solid var(--line)", borderRadius: 3, padding: "9px 14px" }}>
              Oro 18K
            </div>
            <div className="stamp" style={{ border: "1px solid var(--line)", borderRadius: 3, padding: "9px 14px" }}>
              Plata 925
            </div>
          </div>
          <Link
            href="/catalogo"
            className="stamp"
            style={{
              display: "inline-block",
              marginTop: 40,
              padding: "15px 28px",
              background: "var(--ink)",
              color: "var(--porcelain)",
              borderRadius: 3,
            }}
          >
            Ver catálogo
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#FFFFFF",
            borderRadius: 6,
            aspectRatio: "4 / 5",
          }}
        >
          <Image
            src="/logo.png"
            alt="Levin Joyería & Relojería"
            width={640}
            height={330}
            style={{ width: "62%", height: "auto" }}
          />
        </div>
      </section>

      <CategoryStrip categorias={categorias} />
      <FeaturedCarousel productos={destacados} />
      <BrandStrip marcas={marcas} />
      <TrustBar />
    </>
  );
}
