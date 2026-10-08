"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function IconoChevron({ direccion }) {
  const d = direccion === "prev" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6";
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

// Carrusel de una sola imagen a la vez, con crossfade + zoom sutil,
// pensado para ilustrar una sección de contenido (no un hero de
// pantalla completa) — por eso acá sí tiene sentido pausar con el
// mouse encima: es un elemento chico y deliberado, no algo que ocupe
// toda la pantalla y se pause sin querer.
export default function ImageCarousel({ images, aspectRatio = "3 / 2", intervalMs = 4000, label = "Imágenes" }) {
  const [activo, setActivo] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [reducirMovimiento, setReducirMovimiento] = useState(false);
  const touchX = useRef(null);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducirMovimiento(mql.matches);
    const onChange = (e) => setReducirMovimiento(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const irA = useCallback((i) => setActivo((v) => (i + images.length) % images.length), [images.length]);
  const siguiente = useCallback(() => irA(activo + 1), [activo, irA]);
  const anterior = useCallback(() => irA(activo - 1), [activo, irA]);

  const autoplayActivo = !pausado && !reducirMovimiento && images.length > 1;

  useEffect(() => {
    if (!autoplayActivo) return undefined;
    const id = setInterval(() => {
      setActivo((a) => (a + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [autoplayActivo, activo, images.length, intervalMs]);

  function onTouchStart(e) {
    touchX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e) {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) siguiente();
      else anterior();
    }
    touchX.current = null;
  }

  if (!images || !images.length) return null;

  return (
    <div
      className="img-carousel"
      style={{ aspectRatio }}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPausado(false);
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="img-carousel-plane" aria-hidden="true" />
      <div className="img-carousel-frame">
        {images.map((img, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            loading="lazy"
            decoding="async"
            className={`img-carousel-slide${i === activo ? " is-active" : ""}`}
            aria-hidden={i !== activo}
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button type="button" className="img-carousel-arrow img-carousel-arrow-prev" aria-label="Imagen anterior" onClick={anterior}>
            <IconoChevron direccion="prev" />
          </button>
          <button type="button" className="img-carousel-arrow img-carousel-arrow-next" aria-label="Imagen siguiente" onClick={siguiente}>
            <IconoChevron direccion="next" />
          </button>
          <div className="img-carousel-dots" role="group" aria-label="Elegir imagen">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                className={`img-carousel-dot${i === activo ? " is-active" : ""}`}
                aria-label={`Mostrar imagen ${i + 1} de ${images.length}`}
                aria-current={i === activo ? "true" : undefined}
                onClick={() => irA(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
