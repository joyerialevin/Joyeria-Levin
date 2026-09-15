import ProductCard from "./ProductCard";

function GrupoNovedades({ titulo, productos, esUltimo }) {
  return (
    <div style={{ marginBottom: esUltimo ? 0 : 48 }}>
      <div
        className="stamp"
        style={{
          color: "var(--ink)",
          marginBottom: 18,
          paddingBottom: 10,
          borderBottom: "1px solid var(--line)",
        }}
      >
        {titulo}
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
    </div>
  );
}

export default function NovedadesSection({ productos }) {
  if (!productos || productos.length === 0) return null;

  const grupos = [
    { titulo: "Caballero", productos: productos.filter((p) => p.tipo === "caballero") },
    { titulo: "Dama", productos: productos.filter((p) => p.tipo === "dama") },
    { titulo: "Otros", productos: productos.filter((p) => p.tipo !== "caballero" && p.tipo !== "dama") },
  ].filter((g) => g.productos.length > 0);

  return (
    <section className="container" style={{ padding: "84px 6% 0" }}>
      <div style={{ marginBottom: 40 }}>
        <h2 className="display" style={{ fontSize: 40, lineHeight: 1.1, margin: 0 }}>
          Nuevos ingresos
        </h2>
      </div>

      {grupos.map((g, i) => (
        <GrupoNovedades key={g.titulo} titulo={g.titulo} productos={g.productos} esUltimo={i === grupos.length - 1} />
      ))}
    </section>
  );
}
