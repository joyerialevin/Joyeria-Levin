import Link from "next/link";
import HistoriaCarousel from "../../components/HistoriaCarousel";

const VALORES = [
  { nombre: "Confianza", texto: "Clientes que vuelven desde hace tres generaciones." },
  { nombre: "Honestidad", texto: "Decimos qué conviene y qué no, siempre." },
  { nombre: "Seguridad", texto: "Materiales verificados y trabajo en taller propio." },
  { nombre: "Garantía", texto: "Garantía escrita y service sobre lo que vendemos." },
];

export default function SobreNosotrosPage() {
  return (
    <>
      {/* 1. Presentación */}
      <section className="container" style={{ padding: "80px 6% 56px", textAlign: "center" }}>
        <div className="stamp" style={{ color: "var(--oro-deep)", fontWeight: 300, marginBottom: 18 }}>
          Sobre nosotros · Desde 1973
        </div>
        <h1
          className="display"
          style={{ fontSize: 40, lineHeight: 1.18, margin: "0 auto 22px", maxWidth: 720 }}
        >
          Una historia de familia construida sobre la confianza
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: "var(--ink-soft)", margin: "0 auto", maxWidth: "52ch" }}>
          Desde hace más de 50 años acompañamos a familias de Paraná en sus momentos más importantes.
        </p>
      </section>

      <HistoriaCarousel />

      {/* 2. Fotografía histórica a todo lo ancho */}
      <section aria-label="Nuestra historia">
        <div className="sobre-historica" style={{ position: "relative", overflow: "hidden", background: "var(--ink)" }}>
          {/*
            TODO: reemplazar por la fotografía histórica que enviará la clienta.
            Cuando esté lista, reemplazar el div de abajo por una <img> (o
            next/image) con object-fit: cover y el object-position ajustado
            al punto principal de la foto — dejando encima la capa oscura
            que ya está puesta para que el texto blanco se siga leyendo.
          */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, #3a3625 0%, #26261f 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span className="stamp" style={{ color: "var(--text-inverse-soft)", fontWeight: 300 }}>
              Fotografía histórica — próximamente
            </span>
          </div>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(38,38,31,0.25) 0%, rgba(38,38,31,0.8) 100%)",
            }}
          />
          <div
            className="container"
            style={{ position: "relative", height: "100%", display: "flex", alignItems: "flex-end", padding: "0 6% 48px" }}
          >
            <div style={{ maxWidth: 550 }}>
              <div
                className="display"
                style={{ fontSize: "clamp(36px, 8vw, 52px)", lineHeight: 1, color: "var(--oro)", marginBottom: 12 }}
              >
                1973
              </div>
              <h2
                className="display"
                style={{ fontSize: "clamp(22px, 5vw, 28px)", lineHeight: 1.2, color: "var(--porcelain)", margin: "0 0 14px" }}
              >
                Donde empezó todo
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(253,252,248,0.85)", margin: 0 }}>
                David Levin abrió un pequeño taller de orfebrería en Perú 134. Con oficio, dedicación y el
                apoyo de Clara, comenzó una historia familiar que continúa hasta hoy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. El presente */}
      <section className="container" style={{ padding: "72px 6%" }}>
        <div
          className="sobre-presente-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}
        >
          <div style={{ position: "relative" }}>
            {/* TODO: reemplazar por una fotografía actual que enviará la clienta. */}
            <div
              style={{
                width: "100%",
                aspectRatio: "4 / 5",
                borderRadius: "var(--radius-sm)",
                background: "var(--sunken)",
                border: "1px dashed var(--line)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span className="stamp" style={{ color: "var(--ink-soft)", fontWeight: 300 }}>
                Foto del equipo — próximamente
              </span>
            </div>
            <div
              className="stamp"
              style={{
                position: "absolute",
                left: 20,
                bottom: 20,
                background: "var(--porcelain)",
                color: "var(--oro-deep)",
                padding: "8px 16px",
                borderRadius: "var(--radius-sm)",
              }}
            >
              Equipo Levin · Hoy
            </div>
          </div>

          <div>
            <div className="stamp" style={{ color: "var(--oro-deep)", fontWeight: 300, marginBottom: 16 }}>
              Hoy
            </div>
            <h2 className="display" style={{ fontSize: 32, lineHeight: 1.18, margin: "0 0 20px" }}>
              La misma esencia, una historia que continúa
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--ink-soft)", margin: "0 0 16px" }}>
              Más de 50 años después, Levin continúa siendo una joyería familiar.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--ink-soft)", margin: "0 0 28px" }}>
              Desde el mismo lugar donde comenzó todo, nuestro equipo acompaña cada elección con atención
              cercana, honestidad y dedicación.
            </p>
            <p className="stamp" style={{ color: "var(--ink)", marginBottom: 32 }}>
              Más de 50 años · Desde 1973 · Perú 134
            </p>

            {/* 4. Botón final */}
            <Link href="/catalogo" className="stamp btn-oro">
              Conocé nuestras joyas
            </Link>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--ink)" }}>
        <div className="container" style={{ padding: "80px 6%", maxWidth: 760, textAlign: "center" }}>
          <p
            className="display"
            style={{ fontSize: 32, lineHeight: 1.35, color: "var(--porcelain)", margin: "0 0 22px" }}
          >
            "Desde la época de mi padre, los valores de fondo no cambiaron."
          </p>
          <div className="stamp" style={{ color: "var(--text-inverse-soft)", fontWeight: 300 }}>
            Ricardo Levin
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: "70px 6%" }}>
        <div className="stamp" style={{ color: "var(--oro-deep)", marginBottom: 30 }}>
          Nuestros valores
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 32,
          }}
        >
          {VALORES.map((v) => (
            <div key={v.nombre}>
              <div style={{ width: 24, height: 1, background: "var(--oro)", marginBottom: 14 }} />
              <h3 className="stamp" style={{ fontSize: 12.5, color: "var(--ink)", marginBottom: 8 }}>
                {v.nombre}
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-soft)", margin: 0 }}>{v.texto}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
