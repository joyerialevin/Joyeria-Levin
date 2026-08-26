import Link from "next/link";

export default function CategoryStrip({ categorias }) {
  return (
    <section className="container" style={{ padding: "50px 0" }}>
      <h2
        className="display"
        style={{ fontSize: 22, textTransform: "uppercase", marginBottom: 24 }}
      >
        Comprá por categoría
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 18,
        }}
      >
        {categorias.map((cat) => (
          <Link
            key={cat.slug}
            href={`/catalogo?cat=${cat.slug}`}
            className="hover-lift"
            style={{
              display: "block",
              borderRadius: 6,
              overflow: "hidden",
              position: "relative",
              aspectRatio: "3 / 4",
              background: cat.imagen ? "var(--porcelain-dim)" : "var(--oro-deep)",
            }}
          >
            {cat.imagen && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cat.imagen}
                alt={cat.nombre}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: cat.imagen
                  ? "linear-gradient(180deg, rgba(38,38,31,0) 45%, rgba(38,38,31,0.75) 100%)"
                  : "none",
                display: "flex",
                alignItems: "flex-end",
                padding: 16,
              }}
            >
              <span
                className="stamp"
                style={{ color: "var(--text-inverse)", fontSize: 12 }}
              >
                {cat.nombre}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
