import HistoriaCarousel from "../../components/HistoriaCarousel";
import SobreLineaDeTiempo from "../../components/SobreLineaDeTiempo";
import SobreReveal from "../../components/SobreReveal";

const VALORES = [
  { numero: "01", nombre: "Confianza", texto: "Clientes que vuelven desde hace tres generaciones." },
  { numero: "02", nombre: "Honestidad", texto: "Decimos qué conviene y qué no, siempre." },
  { numero: "03", nombre: "Seguridad", texto: "Materiales verificados y trabajo en taller propio." },
  { numero: "04", nombre: "Garantía", texto: "Garantía escrita y service sobre lo que vendemos." },
];

export default function SobreNosotrosPage() {
  return (
    <>
      <SobreReveal />

      {/* Hero: columna izquierda estática (fondo charcoal), derecha carrusel */}
      <header className="sobre-hero" style={{ background: "var(--ink)", borderBottom: "1px solid var(--line)" }}>
        <div
          data-reveal
          className="sobre-hero-left"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: 22,
            maxWidth: 640,
            marginLeft: "auto",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div
            className="stamp"
            style={{ fontWeight: 300, fontSize: 13, letterSpacing: "0.18em", color: "var(--oro-20)" }}
          >
            Sobre nosotros · Desde 1973
          </div>
          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(34px, 5vw, 60px)",
              lineHeight: 1.1,
              margin: 0,
              maxWidth: "15ch",
              color: "var(--porcelain)",
            }}
          >
            Una historia de familia construida sobre la confianza
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.65, margin: 0, maxWidth: "46ch", color: "var(--line)" }}>
            Desde hace más de 50 años acompañamos a familias de Paraná en sus momentos más importantes.
          </p>
        </div>

        <HistoriaCarousel />
      </header>

      <SobreLineaDeTiempo />

      {/* Cita */}
      <section style={{ background: "var(--ink)", color: "var(--porcelain)", padding: "130px 6%" }}>
        <figure
          data-reveal
          style={{
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 30,
          }}
        >
          <span style={{ width: 1, height: 46, background: "var(--oro-40)" }} />
          <blockquote style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(23px, 3.2vw, 38px)", lineHeight: 1.45, margin: 0 }}>
            "Desde la época de mi padre, los valores de fondo no cambiaron."
          </blockquote>
          <figcaption
            className="stamp"
            style={{ fontWeight: 300, fontSize: 13, letterSpacing: "0.14em", color: "var(--line)" }}
          >
            Ricardo Levin
          </figcaption>
        </figure>
      </section>

      {/* Valores */}
      <section id="valores" className="container" style={{ maxWidth: 1180, padding: "120px 6% 140px" }}>
        <h2
          data-reveal
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: "clamp(24px, 3vw, 34px)",
            margin: "0 0 12px",
            textAlign: "center",
          }}
        >
          Nuestros valores
        </h2>
        <p data-reveal style={{ textAlign: "center", color: "var(--ink-soft)", fontSize: 17, margin: "0 0 56px" }}>
          Lo que no cambió en tres generaciones.
        </p>
        <div className="sobre-valores-grid">
          {VALORES.map((v) => (
            <article key={v.numero} data-reveal className="sobre-valor-card">
              <span className="stamp" style={{ fontWeight: 300, fontSize: 12, letterSpacing: "0.14em", color: "var(--oro-deep)" }}>
                {v.numero}
              </span>
              <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 20, margin: 0 }}>{v.nombre}</h3>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--ink-soft)", margin: 0 }}>{v.texto}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
