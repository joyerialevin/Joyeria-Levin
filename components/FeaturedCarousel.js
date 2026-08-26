import ProductCard from "./ProductCard";

export default function FeaturedCarousel({ productos }) {
  if (!productos || productos.length === 0) return null;

  return (
    <section
      style={{
        background: "var(--porcelain)",
        padding: "50px 0",
      }}
    >
      <div className="container">
        <h2
          className="display"
          style={{ fontSize: 22, textTransform: "uppercase", marginBottom: 24, color: "var(--ink)" }}
        >
          Destacados
        </h2>
        <div className="scroll-row">
          {productos.map((p) => (
            <div key={p.id} style={{ width: 220 }}>
              <ProductCard producto={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
