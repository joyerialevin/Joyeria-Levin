export default function BrandStrip({ marcas }) {
  if (!marcas || marcas.length === 0) return null;

  return (
    <section
      style={{
        background: "var(--porcelain)",
        padding: "28px 0",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "14px 34px",
        }}
      >
        {marcas.map((marca) => (
          <span
            key={marca}
            className="stamp"
            style={{ color: "var(--oro-deep)", fontSize: 12 }}
          >
            {marca}
          </span>
        ))}
      </div>
    </section>
  );
}
