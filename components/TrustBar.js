const ITEMS = [
  { titulo: "Pagos con Mercado Pago", detalle: "Tarjetas y cuotas" },
  { titulo: "Atención personalizada", detalle: "Te asesoramos antes de comprar" },
  { titulo: "Relojería y tasación", detalle: "Reparación y grabados a pedido" },
];

export default function TrustBar() {
  return (
    <section
      className="container"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 24,
        padding: "20px 0 50px",
      }}
    >
      {ITEMS.map((item) => (
        <div
          key={item.titulo}
          style={{
            border: "1px solid rgba(253,252,248,0.35)",
            borderRadius: 6,
            padding: "20px 22px",
          }}
        >
          <div className="stamp" style={{ color: "var(--text-inverse)", fontSize: 12 }}>
            {item.titulo}
          </div>
          <div style={{ marginTop: 6, fontSize: 13, color: "var(--text-inverse-soft)" }}>
            {item.detalle}
          </div>
        </div>
      ))}
    </section>
  );
}
