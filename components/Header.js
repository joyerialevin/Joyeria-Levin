import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 6%",
        borderBottom: "1px solid var(--line)",
        background: "var(--porcelain)",
      }}
    >
      <Link href="/" style={{ display: "block" }}>
        <Image
          src="/logo.png"
          alt="Levin Joyería & Relojería"
          width={160}
          height={82}
          style={{ height: 52, width: "auto" }}
          priority
        />
      </Link>
      <nav style={{ display: "flex", gap: 36 }}>
        <Link href="/catalogo" className="stamp" style={{ color: "var(--ink)" }}>
          Catálogo
        </Link>
        <Link href="/sobre-nosotros" className="stamp" style={{ color: "var(--ink)" }}>
          Sobre nosotros
        </Link>
        <Link href="/contacto" className="stamp" style={{ color: "var(--ink)" }}>
          Contactanos
        </Link>
      </nav>
    </header>
  );
}
