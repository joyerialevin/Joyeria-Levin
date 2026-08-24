import Link from "next/link";

export default function HomePage() {
  return (
    <section
      className="container"
      style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        alignItems: "center",
        gap: 40,
        padding: "80px 0 60px",
      }}
    >
      <div>
        <h1 className="display" style={{ fontSize: "48px", lineHeight: 1.1 }}>
          Piezas que se heredan.
        </h1>
        <p
          style={{
            marginTop: 22,
            color: "var(--ink-soft)",
            maxWidth: 420,
            lineHeight: 1.6,
          }}
        >
          Relojes, anillos, pulseras, cadenas y aros en oro 18K y plata 925.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 34 }}>
          <div className="stamp" style={{ border: "1px solid var(--line)", borderRadius: 3, padding: "9px 14px" }}>
            Oro 18K
          </div>
          <div className="stamp" style={{ border: "1px solid var(--line)", borderRadius: 3, padding: "9px 14px" }}>
            Plata 925
          </div>
        </div>
        <Link
          href="/catalogo"
          className="stamp"
          style={{
            display: "inline-block",
            marginTop: 40,
            padding: "14px 26px",
            background: "var(--ink)",
            color: "var(--porcelain)",
            borderRadius: 3,
          }}
        >
          Ver catálogo
        </Link>
      </div>
    </section>
  );
}
