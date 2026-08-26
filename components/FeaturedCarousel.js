import ProductCard from "./ProductCard";

export default function FeaturedCarousel({ productos }) {
  if (!productos || productos.length === 0) return null;

  return (
    <section className="container" style={{ padding: "84px 6%" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div className="stamp" style={{ color: "var(--oro-deep)", fontWeight: 300, marginBottom: 12 }}>
          Destacados
        </div>
        <h2 className="display" style={{ fontSize: 40, lineHeight: 1.1, margin: 0 }}>
          Lo más elegido de la temporada
        </h2>
      </div>
      <div className="scroll-row">
        {productos.map((p) => (
          <div key={p.id} style={{ width: 220 }}>
            <ProductCard producto={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
