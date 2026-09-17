const ITEMS = [
  "3 cuotas sin interés (Macro)",
  "Descuentos en efectivo y transferencia",
  "Envíos a todo el país",
  "Atención personalizada",
];

export default function BeneficiosStrip() {
  return (
    <section
      style={{
        borderBottom: "1px solid var(--line)",
        background: "var(--oro)",
        padding: "14px 0",
        overflow: "hidden",
      }}
    >
      <div className="levin-ticker" style={{ animationDuration: "26s" }}>
        {[0, 1].map((rep) => (
          <div key={rep} style={{ display: "flex", alignItems: "center", gap: 72, paddingRight: 72 }}>
            {ITEMS.map((item) => (
              <span
                key={item}
                className="stamp"
                style={{
                  color: "var(--porcelain)",
                  fontSize: 14.5,
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: 72,
                }}
              >
                {item}
                <span style={{ opacity: 0.5 }}>|</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
