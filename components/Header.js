import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "22px 6%",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <Link href="/" style={{ display: "block" }}>
        <Image
          src="/logo.png"
          alt="Levin Joyería & Relojería"
          width={160}
          height={82}
          style={{ height: 48, width: "auto" }}
          priority
        />
      </Link>
      <nav style={{ display: "flex", gap: 32 }}>
        <Link href="/catalogo" className="stamp">
          Catálogo
        </Link>
        <Link href="/sobre-nosotros" className="stamp">
          Sobre nosotros
        </Link>
        <Link href="/contacto" className="stamp">
          Contactanos
        </Link>
      </nav>
    </header>
  );
}
