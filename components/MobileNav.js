"use client";

import { useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo?grupo=caballero", label: "Caballero" },
  { href: "/catalogo?grupo=dama", label: "Dama" },
  { href: "/catalogo?grupo=alianzas", label: "Alianzas" },
  { href: "/service-relojeria", label: "Service Relojería" },
  { href: "/sobre-nosotros", label: "Información" },
  { href: "/contacto", label: "Contacto" },
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
            <a
              href="https://instagram.com/joyerialevin"
              target="_blank"
              rel="noopener noreferrer"
              className="stamp"
              onClick={cerrar}
              style={{
                color: "var(--line)",
                padding: "18px 0",
                borderBottom: "1px solid rgba(253,252,248,0.12)",
                fontWeight: 300,
              }}
            >
              Instagram
            </a>
            <a
              href="https://wa.me/5493434728312"
              target="_blank"
              rel="noopener noreferrer"
              className="stamp"
              onClick={cerrar}
              style={{
                color: "var(--porcelain)",
                background: "var(--oro)",
                textAlign: "center",
                padding: "16px 0",
                borderRadius: "var(--radius-sm)",
                marginTop: 20,
              }}
            >
              Consultar
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
