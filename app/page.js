import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <section
      className="container"
      style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        alignItems: "center",
        gap: 40,
        padding: "96px 0 70px",
      }}
    >
      <div>
        <span
          className="stamp"
          style={{ color: "var(--oro-deep)" }}
        >
          Joyería &amp; Relojería
        </span>
        <h1
          className="display"
          style={{
            fontSize: "56px",
            lineHeight: 1.05,
            marginTop: 18,
            textTransform: "uppercase",
          }}
        >
          Piezas que
          <br />
          se heredan.
        </h1>
        <p
          className="editorial"
          style={{
            marginTop: 24,
            color: "var(--ink-soft)",
            maxWidth: 420,
            lineHeight: 1.6,
            fontSize: 19,
          }}
        >
          Una estética bien cuidada no se ve. Se siente.
        </p>
        <p
          style={{
            marginTop: 14,
            color: "var(--ink-soft)",
            maxWidth: 420,
            lineHeight: 1.7,
            fontWeight: 300,
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
            padding: "15px 28px",
            background: "var(--ink)",
            color: "var(--porcelain)",
            borderRadius: 3,
          }}
        >
          Ver catálogo
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "var(--ink)",
          borderRadius: 6,
          aspectRatio: "4 / 5",
        }}
      >
        <Image
          src="/logo.png"
          alt="Levin Joyería & Relojería"
          width={640}
          height={330}
          style={{ width: "62%", height: "auto" }}
        />
      </div>
    </section>
  );
}
