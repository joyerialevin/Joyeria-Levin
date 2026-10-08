"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const NUMERO_WHATSAPP = "5493434728312";
const MSG_DIA_MADRE = "Hola! Quería consultar por los regalos del Día de la Madre.";
const LINK_WHATSAPP_DIA_MADRE = `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(MSG_DIA_MADRE)}`;

const INTERVALO_MS = 5000;

const SLIDES = [
  {
    id: "institucional",
    estilo: "original",
    imagen: "/fotos/clara-inicio.png",
    alt: "Joyería Levin — Joyería & Relojería",
    opDesktop: "75% 28%",
    opMobile: "25% center",
    eyebrow: "Joyería & Relojería Levin",
    titulo: "Desde 1973, acompañando momentos que perduran.",
    texto: "Joyas en oro 18K y plata 925 · Relojes de primeras marcas · Taller y atención personalizada.",
    extra: "Perú 134 · Paraná",
    primario: { texto: "Ver catálogo", href: "/catalogo" },
    secundario: { texto: "Visitanos en Paraná", href: "#visitanos" },
  },
  {
    id: "dia-de-la-madre",
    imagen: "/fotos/banner-dia-madre-joyas.jpg",
    alt: "Joyas en oro de Joyería Levin: pulseras, anillos y reloj, luciendo el conjunto completo",
    opDesktop: "100% center",
    opMobile: "54% center",
    eyebrow: "Día de la Madre · 18 de octubre",
    titulo: "Encontrá el regalo para mamá.",
    texto: "Joyas en oro 18K, plata 925, Swarovski, relojes y regalos personalizados.",
    primario: { texto: "Ver especial Día de la Madre", href: "/regalos-dia-de-la-madre" },
    secundario: { texto: "Consultar por WhatsApp", href: LINK_WHATSAPP_DIA_MADRE, externo: true },
  },
];

function BotonSlide({ slide, variante }) {
  const esPrimario = variante === "primario";
  const data = slide[variante];
  const className = esPrimario ? "svc-btn-primary" : "svc-btn-secondary-dark";
  if (data.externo) {
    return (
      <a href={data.href} target="_blank" rel="noopener noreferrer" className={className}>
        {data.texto}
      </a>
    );
  }
  if (data.href.startsWith("#")) {
    return (
      <a href={data.href} className={className}>
        {data.texto}
      </a>
    );
  }
  return (
    <Link href={data.href} className={className}>
      {data.texto}
    </Link>
  );
}

function IconoChevron({ direccion }) {
  const d = direccion === "prev" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6";
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function IconoPlayPause({ reproduciendo }) {
  return reproduciendo ? (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="5" y="4" width="5" height="16" rx="1" />
      <rect x="14" y="4" width="5" height="16" rx="1" />
    </svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 4.5v15l13-7.5z" />
    </svg>
  );
}

export default function HomeHeroCarousel() {
  const [activo, setActivo] = useState(0);
  const [reproduciendo, setReproduciendo] = useState(true);
  const [conFoco, setConFoco] = useState(false);
  const [pestanaVisible, setPestanaVisible] = useState(true);
  const [reducirMovimiento, setReducirMovimiento] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducirMovimiento(mql.matches);
    const onChange = (e) => setReducirMovimiento(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const onVisibility = () => setPestanaVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const irA = useCallback((indice) => {
    setActivo((indice + SLIDES.length) % SLIDES.length);
  }, []);

  const siguiente = useCallback(() => irA(activo + 1), [activo, irA]);
  const anterior = useCallback(() => irA(activo - 1), [activo, irA]);

  // Navegación manual: no pausa la rotación automática, solo mueve el
  // slide. El contador de 10s se reinicia solo porque el efecto de
  // abajo depende de `activo` — cualquier cambio (manual o automático)
  // vuelve a armar el temporizador desde cero.
  function manejarNavegacionManual(fn) {
    return () => {
      fn();
    };
  }

  const autoplayActivo = reproduciendo && !conFoco && pestanaVisible && !reducirMovimiento;

  useEffect(() => {
    if (!autoplayActivo) return undefined;
    const id = setInterval(() => {
      setActivo((a) => (a + 1) % SLIDES.length);
    }, INTERVALO_MS);
    return () => clearInterval(id);
  }, [autoplayActivo, activo]);

  function onKeyDown(e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      manejarNavegacionManual(anterior)();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      manejarNavegacionManual(siguiente)();
    }
  }

  return (
    <>
    <section
      ref={heroRef}
      className="home-hero"
      aria-roledescription="carousel"
      aria-label="Banners destacados de Joyería Levin"
      onFocus={() => setConFoco(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setConFoco(false);
      }}
      onKeyDown={onKeyDown}
    >
      <div aria-live={reproduciendo ? "off" : "polite"}>
        {SLIDES.map((slide, i) => {
          const esActivo = i === activo;
          return (
            <div
              key={slide.id}
              className={`home-hero-slide${esActivo ? " is-active" : ""}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`Banner ${i + 1} de ${SLIDES.length}: ${slide.eyebrow}`}
              aria-hidden={!esActivo}
              style={{ pointerEvents: esActivo ? "auto" : "none" }}
              {...(!esActivo ? { inert: "" } : {})}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.imagen}
                alt={slide.alt}
                className="home-hero-slide-img"
                style={{ "--op-desktop": slide.opDesktop, "--op-mobile": slide.opMobile }}
                fetchPriority={i === 0 ? "high" : "low"}
              />

              {slide.estilo === "original" ? (
                <div className="home-hero-copy-original">
                  <div className="stamp" style={{ color: "var(--oro-deep)", marginBottom: 14 }}>
                    {slide.eyebrow}
                  </div>
                  <h1
                    className="display"
                    style={{
                      fontSize: "clamp(26px, 3.6vw, 46px)",
                      lineHeight: 1.15,
                      margin: "0 0 20px",
                      color: "var(--ink)",
                    }}
                  >
                    {slide.titulo}
                  </h1>
                  <p
                    style={{
                      fontSize: "clamp(13px, 1.1vw, 16px)",
                      lineHeight: 1.6,
                      color: "var(--ink-soft)",
                      margin: "0 0 32px",
                    }}
                  >
                    {slide.texto}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", marginBottom: 18 }}>
                    <Link
                      href={slide.primario.href}
                      className="stamp"
                      style={{ color: "var(--porcelain)", background: "var(--oro)", padding: "16px 34px", borderRadius: "var(--radius-sm)" }}
                    >
                      {slide.primario.texto}
                    </Link>
                    <a
                      href={slide.secundario.href}
                      className="stamp"
                      style={{ color: "var(--ink)", borderBottom: "1px solid var(--oro)", paddingBottom: 4 }}
                    >
                      {slide.secundario.texto}
                    </a>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>{slide.extra}</div>
                </div>
              ) : (
                <>
                  <div className="home-hero-overlay" />
                  <div className="home-hero-content">
                    <div className="svc-container" style={{ maxWidth: 1180, width: "100%" }}>
                      <div style={{ maxWidth: 560 }}>
                        <div className="svc-eyebrow" style={{ color: "var(--line)" }}>{slide.eyebrow}</div>
                        <h1 className="svc-h1" style={{ color: "var(--porcelain)", textWrap: "balance" }}>
                          {slide.titulo}
                        </h1>
                        <p className="svc-lead" style={{ color: "var(--line)" }}>
                          {slide.texto}
                        </p>
                        <div className="svc-btn-row">
                          <BotonSlide slide={slide} variante="primario" />
                          <BotonSlide slide={slide} variante="secundario" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <button type="button" className="home-hero-arrow home-hero-arrow-prev" aria-label="Banner anterior" onClick={manejarNavegacionManual(anterior)}>
        <IconoChevron direccion="prev" />
      </button>
      <button type="button" className="home-hero-arrow home-hero-arrow-next" aria-label="Banner siguiente" onClick={manejarNavegacionManual(siguiente)}>
        <IconoChevron direccion="next" />
      </button>

      <div className="home-hero-controls">
        <div className="home-hero-dots" role="group" aria-label="Elegir banner">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              className={`home-hero-dot${i === activo ? " is-active" : ""}`}
              aria-label={`Mostrar banner ${i + 1} de ${SLIDES.length}: ${slide.eyebrow}`}
              aria-current={i === activo ? "true" : undefined}
              onClick={manejarNavegacionManual(() => irA(i))}
            />
          ))}
        </div>
        <button
          type="button"
          className="home-hero-playpause"
          aria-label={reproduciendo ? "Pausar rotación automática" : "Reanudar rotación automática"}
          aria-pressed={reproduciendo}
          onClick={() => setReproduciendo((r) => !r)}
        >
          <IconoPlayPause reproduciendo={reproduciendo} />
        </button>
      </div>
    </section>
    </>
  );
}
