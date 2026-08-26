const ITEMS = [
  { titulo: "Certificado de origen", detalle: "Cada pieza de oro y plata con su garantía escrita." },
  { titulo: "Envíos a todo el país", detalle: "Coordinamos por WhatsApp, con seguimiento." },
  { titulo: "Atención personalizada", detalle: "Te asesoramos en el local, sin apuro." },
  { titulo: "Relojería y tasación", detalle: "Taller propio: service, pilas y valuaciones." },
];

export default function TrustBar() {
  return (
    <section style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "var(--sunken)" }}>
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 48,
          padding: "44px 6%",
        }}
      >
        {ITEMS.map((item) => (
          <div key={item.titulo}>
            <div style={{ width: 28, height: 1, background: "var(--oro)", marginBottom: 16 }} />
            <div className="stamp" style={{ fontSize: 11, color: "var(--ink)", marginBottom: 8 }}>
              {item.titulo}
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-soft)", margin: 0 }}>
              {item.detalle}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
