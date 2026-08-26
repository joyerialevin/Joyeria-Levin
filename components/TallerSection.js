export default function TallerSection() {
  return (
    <section id="nosotros" style={{ background: "var(--ink)" }}>
      <div
        className="container"
        style={{
          padding: 0,
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "stretch",
        }}
      >
        <div style={{ position: "relative", minHeight: 420 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/fotos/taller.jpg"
            alt="Taller de relojería Levin"
            style={{
              width: "100%",
              height: "100%",
              minHeight: 420,
              objectFit: "cover",
              display: "block",
              position: "absolute",
              inset: 0,
            }}
          />
        </div>
        <div style={{ padding: "72px 6%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="stamp" style={{ color: "var(--text-inverse-soft)", marginBottom: 20, fontWeight: 300 }}>
            Taller propio
          </div>
          <h2
            className="display"
            style={{ fontSize: 40, lineHeight: 1.12, margin: "0 0 20px", color: "var(--porcelain)" }}
          >
            Service técnico y grabados
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              color: "var(--text-inverse-soft)",
              margin: "0 0 32px",
              maxWidth: "42ch",
            }}
          >
            Cambio de pilas, ajuste de mallas, restauración y grabado a mano sobre alianzas. Traelo al local y lo
            revisamos con vos.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <a
              href="https://wa.me/5493434728312"
              target="_blank"
              rel="noopener noreferrer"
              className="stamp"
              style={{
                color: "var(--porcelain)",
                background: "var(--oro)",
                padding: "15px 30px",
                borderRadius: "var(--radius-sm)",
              }}
            >
              Consultar por WhatsApp
            </a>
            <a
              href="/contacto"
              className="stamp"
              style={{
                color: "var(--porcelain)",
                borderBottom: "1px solid rgba(253,252,248,0.4)",
                paddingBottom: 4,
                fontWeight: 400,
              }}
            >
              Ver en el local
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
