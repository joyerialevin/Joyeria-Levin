import Link from "next/link";

export default function CategoryStrip({ categorias }) {
  return (
    <section className="container" style={{ padding: "0 6% 84px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 30,
        }}
      >
        <div>
          <div className="stamp" style={{ color: "var(--oro-deep)", marginBottom: 12 }}>
            Catálogo
          </div>
          <h2 className="display" style={{ fontSize: 40, lineHeight: 1.1, margin: 0 }}>
            Elegí por categoría
          </h2>
        </div>
        <Link
          href="/catalogo"
          className="stamp"
          style={{ color: "var(--ink)", borderBottom: "1px solid var(--oro)", paddingBottom: 4 }}
        >
          Ver todo el catálogo
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 14,
        }}
      >
        {categorias.map((cat) => (
          <Link
            key={cat.slug}
            href={`/catalogo?cat=${cat.slug}`}
            className="hover-lift"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 168,
              padding: "22px 22px 20px",
              background: "var(--card-bg)",
              border: "1px solid var(--line)",
              borderRadius: "var(--radius-sm)",
              color: "var(--ink)",
            }}
          >
            <div style={{ width: 24, height: 1, background: "var(--oro)" }} />
            <div>
              <div className="stamp" style={{ marginBottom: 8 }}>
                {cat.nombre}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.5, color: "var(--ink-soft)" }}>
                {cat.subtexto}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
