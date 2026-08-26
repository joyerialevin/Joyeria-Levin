export default function BrandStrip({ marcas }) {
  if (!marcas || marcas.length === 0) return null;

  return (
    <section
      style={{
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        background: "var(--porcelain)",
        padding: "30px 0",
        overflow: "hidden",
      }}
    >
      <div className="levin-ticker">
        {[0, 1].map((rep) => (
          <div
            key={rep}
            style={{
              display: "flex",
              gap: 72,
              paddingRight: 72,
            }}
          >
            {marcas.map((marca) => (
              <span
                key={marca}
                className="stamp"
                style={{ fontSize: 15, letterSpacing: "0.2em", color: "var(--ink-soft)", fontWeight: 300 }}
              >
                {marca}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
