const ITEMS = [
  "3 cuotas sin interés",
  "10% off por transferencia",
  "Perú 134, Paraná, Entre Ríos",
  "Envíos a todo el país",
];

export default function AnnouncementBar() {
  return (
    <div
      style={{
        height: 19,
        background: "var(--oro)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className="announcement-bar-static stamp"
        style={{
          width: "100%",
          justifyContent: "center",
          color: "var(--porcelain)",
          fontSize: 10,
          fontWeight: 400,
          letterSpacing: "0.08em",
          alignItems: "center",
          gap: 10,
          whiteSpace: "nowrap",
        }}
      >
        {ITEMS.map((item, i) => (
          <span key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {i > 0 && <span style={{ opacity: 0.5 }}>|</span>}
            {item}
          </span>
        ))}
      </div>

      <div className="announcement-bar-ticker levin-ticker" style={{ animationDuration: "16s" }}>
        {[0, 1].map((rep) => (
          <div key={rep} style={{ display: "flex", alignItems: "center", gap: 16, paddingRight: 16 }}>
            {ITEMS.map((item) => (
              <span
                key={item}
                className="stamp"
                style={{
                  color: "var(--porcelain)",
                  fontSize: 10,
                  fontWeight: 400,
                  letterSpacing: "0.08em",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                {item}
                <span style={{ opacity: 0.5 }}>|</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
