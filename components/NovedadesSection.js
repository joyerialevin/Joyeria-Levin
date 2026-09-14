import ProductCard from "./ProductCard";

export default function NovedadesSection({ productos }) {
  if (!productos || productos.length === 0) return null;

  return (
    <section className="container" style={{ padding: "84px 6% 0" }}>
      <div style={{ marginBottom: 30 }}>
        <div className="stamp" style={{ color: "var(--oro-deep)", marginBottom: 12 }}>
          Recién llegados
        </div>
        <h2 className="display" style={{ fontSize: 40, lineHeight: 1.1, margin: 0 }}>
          Nuevos
        </h2>
      </div>

      <div
        className="product-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 26,
        }}
      >
        {productos.map((p) => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>
    </section>
  );
}
