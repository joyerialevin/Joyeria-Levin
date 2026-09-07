const PASOS = [
  "Traés tu reloj y lo evaluamos.",
  "Te informamos el costo antes de comenzar.",
  "Si se puede resolver en el momento, te lo entregamos en el acto.",
  "Si requiere más tiempo, avanzamos únicamente con tu aprobación.",
];

const SERVICIOS = [
  "Cambio de pilas",
  "Ajuste y cambio de mallas",
  "Cambio de pernos",
  "Ajuste de cierres",
  "Revisión y reparación",
];

export default function ServiceRelojeriaPage() {
  return (
    <section style={{ background: "var(--oro-deep)" }}>
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
        <div style={{ position: "relative", minHeight: 480 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/fotos/service-relojeria.jpg"
            alt="Service técnico de relojería en el taller"
            style={{
              width: "100%",
              height: "100%",
              minHeight: 480,
              objectFit: "cover",
              display: "block",
              position: "absolute",
              inset: 0,
            }}
          />
        </div>

        <div style={{ padding: "72px 6%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="stamp" style={{ color: "var(--text-inverse-soft)", marginBottom: 16, fontWeight: 300 }}>
            Forma de trabajo
          </div>
          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: 34,
              lineHeight: 1.2,
              color: "var(--porcelain)",
              margin: "0 0 20px",
            }}
          >
            Servicio técnico de relojería
          </h1>
          <div style={{ width: 48, height: 2, background: "var(--porcelain)", marginBottom: 32 }} />

          <div style={{ display: "grid", gap: 20, marginBottom: 36 }}>
            {PASOS.map((paso, i) => (
              <div key={paso} style={{ display: "flex", gap: 18 }}>
                <span
                  className="stamp"
                  style={{ color: "var(--porcelain)", fontWeight: 700, fontSize: 15, minWidth: 24 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: 17, lineHeight: 1.5, color: "var(--porcelain)" }}>{paso}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(253,252,248,0.15)", paddingTop: 28 }}>
            <div className="stamp" style={{ color: "var(--text-inverse-soft)", marginBottom: 14, fontWeight: 300 }}>
              Nuestros servicios
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 28px" }}>
              {SERVICIOS.map((s) => (
                <span key={s} style={{ fontSize: 16, color: "var(--porcelain)" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
