import Link from "next/link";
import Image from "next/image";
import { getSanity, MARCAS_RELOJES_QUERY } from "../lib/sanityClient";
import {
  CATEGORIAS,
  GRUPOS,
  MATERIAL_LABEL,
  MATERIALES_ESTANDAR,
  MATERIALES_ALIANZAS,
} from "../lib/categorias";

// Arma, para un grupo (Caballero/Dama), la lista de categorías del mega
// menú con su tipo de submenú: "marca" para relojes (las marcas se cargan
// dinámicamente más abajo), "material" para las categorías que ya separan
// por material, o null cuando la categoría no tiene subdivisión todavía
// (Bebés, Swarovski).
function itemsDelGrupo(grupoSlug) {
  const grupo = GRUPOS.find((g) => g.slug === grupoSlug);
  return grupo.categorias.map(({ slug }) => {
    const cat = CATEGORIAS.find((c) => c.slug === slug);
    const tipoSubmenu = slug === "relojes" ? "marca" : cat.filtros.includes("material") ? "material" : null;
    return { slug, nombre: cat.nombre, tipoSubmenu };
  });
}

async function getMarcasPorTipo() {
  try {
    const filas = await getSanity().fetch(MARCAS_RELOJES_QUERY, {}, { next: { revalidate: 300 } });
    const porTipo = { caballero: new Set(), dama: new Set() };
    for (const f of filas) {
      if (f.tipo === "caballero" || f.tipo === "dama") porTipo[f.tipo].add(f.marca);
    }
    return {
      caballero: [...porTipo.caballero].sort(),
      dama: [...porTipo.dama].sort(),
    };
  } catch (error) {
    return { caballero: [], dama: [] };
  }
}

export default async function Header() {
  const marcasPorTipo = await getMarcasPorTipo();

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
        <nav className="mega-nav" style={{ justifySelf: "center" }}>
          <Link href="/" className="stamp" style={{ color: "var(--ink)", fontWeight: 400 }}>
            Inicio
          </Link>

          <div className="mega-item">
            <Link href="/catalogo?grupo=caballero" className="stamp mega-trigger">
              Caballero
            </Link>
            <PanelGrupo grupoSlug="caballero" tipo="caballero" marcas={marcasPorTipo.caballero} />
          </div>

          <div className="mega-item">
            <Link href="/catalogo?grupo=dama" className="stamp mega-trigger">
              Dama
            </Link>
            <PanelGrupo grupoSlug="dama" tipo="dama" marcas={marcasPorTipo.dama} />
          </div>

          <div className="mega-item">
            <Link href="/catalogo?grupo=alianzas" className="stamp mega-trigger">
              Alianzas
            </Link>
            <div className="mega-panel mega-panel-alianzas">
              <ul className="mega-sublist">
                {MATERIALES_ALIANZAS.map((mat) => (
                  <li key={mat}>
                    <Link href={`/catalogo?grupo=alianzas&material=${mat}`}>{MATERIAL_LABEL[mat]}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

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

function PanelGrupo({ grupoSlug, tipo, marcas }) {
  const items = itemsDelGrupo(grupoSlug);
  return (
    <div className="mega-panel">
      <div className="mega-panel-inner">
        {items.map((item) => (
          <div key={item.slug} className="mega-col">
            <Link href={`/catalogo?grupo=${grupoSlug}&cat=${item.slug}`} className="stamp mega-col-title">
              {item.nombre}
            </Link>
            {item.tipoSubmenu === "marca" && (
              <ul className="mega-sublist">
                {marcas.length === 0 && <li className="mega-empty">Próximamente</li>}
                {marcas.map((m) => (
                  <li key={m}>
                    <Link href={`/catalogo?grupo=${grupoSlug}&cat=relojes&marca=${encodeURIComponent(m)}`}>{m}</Link>
                  </li>
                ))}
              </ul>
            )}
            {item.tipoSubmenu === "material" && (
              <ul className="mega-sublist">
                {MATERIALES_ESTANDAR.map((mat) => (
                  <li key={mat}>
                    <Link href={`/catalogo?grupo=${grupoSlug}&cat=${item.slug}&material=${mat}`}>
                      {MATERIAL_LABEL[mat]}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
