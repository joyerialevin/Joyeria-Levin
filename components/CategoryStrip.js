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
        {categorias.map((cat) =>
          cat.imagen ? (
            <Link
              key={cat.slug}
              href={`/catalogo?cat=${cat.slug}`}
              className="hover-lift"
              style={{
                position: "relative",
                display: "block",
                aspectRatio: "3 / 4",
                borderRadius: "var(--radius-sm)",
                overflow: "hidden",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cat.imagen}
                alt={cat.nombre}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(38,38,31,0) 45%, rgba(38,38,31,0.78) 100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: 20,
                }}
              >
                <div className="stamp" style={{ color: "var(--porcelain)", marginBottom: 4 }}>
                  {cat.nombre}
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.4, color: "rgba(253,252,248,0.82)" }}>
                  {cat.subtexto}
                </div>
              </div>
            </Link>
          ) : (
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
          )
        )}
      </div>
    </section>
  );
}
