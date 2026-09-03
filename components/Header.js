import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "rgba(253,252,248,0.94)",
        backdropFilter: "blur(6px)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        className="container"
        style={{
          padding: "18px 6%",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: 24,
        }}
      >
        <Link href="/" style={{ display: "block", justifySelf: "start" }}>
          <Image
            src="/logo.png"
            alt="Levin Joyería & Relojería"
            width={160}
            height={82}
            style={{ height: 48, width: "auto" }}
            priority
          />
        </Link>
        <nav style={{ display: "flex", gap: 32, justifySelf: "center" }}>
          <Link href="/" className="stamp" style={{ color: "var(--ink)", fontWeight: 400 }}>
            Inicio
          </Link>
          <Link href="/catalogo?grupo=caballero" className="stamp" style={{ color: "var(--ink)", fontWeight: 400 }}>
            Caballero
          </Link>
          <Link href="/catalogo?grupo=dama" className="stamp" style={{ color: "var(--ink)", fontWeight: 400 }}>
            Dama
          </Link>
          <Link href="/catalogo?grupo=alianzas" className="stamp" style={{ color: "var(--ink)", fontWeight: 400 }}>
            Alianzas
          </Link>
          <Link href="/sobre-nosotros" className="stamp" style={{ color: "var(--ink)", fontWeight: 400 }}>
            Sobre nosotros
          </Link>
          <Link href="/contacto" className="stamp" style={{ color: "var(--ink)", fontWeight: 400 }}>
            Contactanos
          </Link>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 22, justifySelf: "end" }}>
          <a
            href="https://instagram.com/joyerialevin"
            target="_blank"
            rel="noopener noreferrer"
            className="stamp"
            style={{ color: "var(--ink-soft)", fontWeight: 300 }}
          >
            Instagram
          </a>
          <a
            href="https://wa.me/5493434728312"
            target="_blank"
            rel="noopener noreferrer"
            className="stamp"
            style={{
              color: "var(--porcelain)",
              background: "var(--oro)",
              padding: "11px 22px",
              borderRadius: "var(--radius-sm)",
            }}
          >
            Consultar
          </a>
        </div>
      </div>
    </header>
  );
}
