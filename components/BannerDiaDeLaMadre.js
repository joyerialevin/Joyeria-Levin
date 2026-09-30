import Link from "next/link";

// Banner temporal para la Guía de regalos del Día de la Madre.
// Sacar este componente (y su uso en app/page.js) después del
// domingo 18 de octubre — junto con el ítem "Guía de regalos" del
// menú en Header.js y MobileNav.js.
export default function BannerDiaDeLaMadre() {
  return (
    <section style={{ background: "var(--porcelain)" }}>
      <div
        className="container banner-dia-madre"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: 0,
        }}
      >
        <div style={{ aspectRatio: "4 / 3", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/regalos-dia-de-la-madre/img/post4-hijo.jpg"
            alt="Mamá e hijo abrazados, ella con joyas de Levin"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        <div style={{ padding: "48px 6%" }}>
          <div className="stamp" style={{ color: "var(--oro-deep)", marginBottom: 14 }}>
            Día de la Madre
          </div>
          <h2 className="display" style={{ fontSize: "clamp(24px, 3vw, 34px)", lineHeight: 1.2, margin: "0 0 18px", color: "var(--ink)" }}>
            ¿Qué le regalás a mamá?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-soft)", margin: "0 0 28px" }}>
            Mirá nuestra guía del Día de la Madre.
          </p>
          <Link
            href="/regalos-dia-de-la-madre/"
            className="stamp"
            style={{
              display: "inline-block",
              color: "var(--porcelain)",
              background: "var(--oro)",
              padding: "15px 32px",
              borderRadius: "var(--radius-sm)",
            }}
          >
            Ver la guía
          </Link>
        </div>
      </div>
    </section>
  );
}
