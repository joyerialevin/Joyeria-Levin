import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import { getSanity, MARCAS_RELOJES_QUERY } from "../lib/sanityClient";
import {
  CATEGORIAS,
  GRUPOS,
  MATERIAL_LABEL,
  MATERIALES_ESTANDAR,
  MATERIALES_ALIANZAS,
} from "../lib/categorias";

// Todavía sin página propia — se muestran sin link hasta que se cargue
// el contenido de cada una.
const INFORMACION_VACIA = [
  "Envíos",
  "Cambios y devoluciones",
  "Garantía y cuidados",
  "Medios de pago",
  "Preguntas frecuentes",
];

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
        background: "var(--ink)",
        borderBottom: "1px solid rgba(253,252,248,0.12)",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "6px 32px",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: 24,
        }}
      >
        <Link href="/" style={{ display: "block", justifySelf: "start" }}>
          <Image
            src="/logo-blanco.png"
            alt="Levin Joyería & Relojería"
            width={160}
            height={82}
            style={{ height: 80, width: "auto" }}
            priority
          />
        </Link>
        <nav className="mega-nav" style={{ justifySelf: "center" }}>
          <Link href="/" className="stamp" style={{ color: "var(--porcelain)", fontWeight: 400 }}>
            Inicio
          </Link>

          <div className="mega-item">
            <Link href="/catalogo?grupo=caballero" className="stamp mega-trigger">
              Caballero
            </Link>
            <PanelGrupo grupoSlug="caballero" tipo="caballero" marcas={marcasPorTipo.caballero} alinear="left" />
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

          <Link href="/service-relojeria" className="stamp" style={{ color: "var(--porcelain)", fontWeight: 400 }}>
            Service
          </Link>

          <div className="mega-item">
            <Link href="/sobre-nosotros" className="stamp mega-trigger">
              Información
            </Link>
            <div className="mega-panel mega-panel-alianzas mega-panel-right">
              <ul className="mega-sublist">
                <li>
                  <Link href="/sobre-nosotros">Sobre nosotros</Link>
                </li>
                {INFORMACION_VACIA.map((texto) => (
                  <li key={texto}>
                    <span className="mega-empty">{texto}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
        <div className="header-actions-desktop" style={{ alignItems: "center", gap: 18, justifySelf: "end" }}>
          <button
            type="button"
            className="stamp"
            aria-label="Buscar"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              color: "var(--line)",
              fontWeight: 300,
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
            Buscar
          </button>
          <span style={{ width: 1, height: 16, background: "rgba(253,252,248,0.25)" }} />
          <a
            href="https://instagram.com/joyerialevin"
            target="_blank"
            rel="noopener noreferrer"
            className="stamp"
            style={{ color: "var(--line)", fontWeight: 300 }}
          >
            Instagram
          </a>
          <Link href="/contacto" className="stamp" style={{ color: "var(--line)", fontWeight: 300 }}>
            Contacto
          </Link>
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
        <MobileNav />
      </div>
    </header>
  );
}

function PanelGrupo({ grupoSlug, tipo, marcas, alinear }) {
  const items = itemsDelGrupo(grupoSlug);
  return (
    <div className={`mega-panel${alinear === "left" ? " mega-panel-left" : ""}`}>
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
