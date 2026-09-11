"use client";

import { useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo?grupo=caballero", label: "Caballero" },
  { href: "/catalogo?grupo=dama", label: "Dama" },
  { href: "/catalogo?grupo=alianzas", label: "Alianzas" },
  { href: "/service-relojeria", label: "Service" },
  { href: "/sobre-nosotros", label: "Información" },
];

export default function MobileNav() {
  const [abierto, setAbierto] = useState(false);

  function cerrar() {
    setAbierto(false);
  }

  return (
    <>
      <button
        type="button"
        className="header-hamburger"
        aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={abierto}
        onClick={() => setAbierto((v) => !v)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 6,
          justifySelf: "end",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--porcelain)" strokeWidth="1.6" aria-hidden="true">
          {abierto ? (
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          ) : (
            <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {abierto && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "var(--ink)",
            borderTop: "1px solid rgba(253,252,248,0.12)",
            maxHeight: "calc(100vh - 100%)",
            overflowY: "auto",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", padding: "8px 6% 24px" }}>
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="stamp"
                onClick={cerrar}
                style={{
                  color: "var(--porcelain)",
                  padding: "18px 0",
                  borderBottom: "1px solid rgba(253,252,248,0.12)",
                  fontWeight: 400,
                }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              className="stamp"
              onClick={cerrar}
              style={{
                color: "var(--porcelain)",
                padding: "18px 0",
                borderBottom: "1px solid rgba(253,252,248,0.12)",
                fontWeight: 400,
              }}
            >
              Contacto
            </Link>
            <button
              type="button"
              className="stamp"
              aria-label="Buscar"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "none",
                border: "none",
                color: "var(--line)",
                padding: "18px 0",
                borderBottom: "1px solid rgba(253,252,248,0.12)",
                fontWeight: 300,
                cursor: "pointer",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
              </svg>
              Buscar
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 20 }}>
              <a
                href="https://api.whatsapp.com/send?phone=5493434728312"
                target="_blank"
                rel="noopener noreferrer"
                className="stamp"
                onClick={cerrar}
                style={{
                  flex: 1,
                  color: "var(--porcelain)",
                  background: "var(--oro)",
                  textAlign: "center",
                  padding: "16px 0",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                Consultar
              </a>
              <a
                href="https://maps.google.com/?q=Perú+134,+Paraná,+Entre+Ríos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver ubicación en Google Maps"
                onClick={cerrar}
                style={{ display: "flex", alignItems: "center", color: "var(--oro)", flexShrink: 0 }}
              >
                <svg width="26" height="26" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                </svg>
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
