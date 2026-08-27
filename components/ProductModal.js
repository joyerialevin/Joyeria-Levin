"use client";

import { useEffect, useRef, useState } from "react";
import ConsultarWhatsApp from "./ConsultarWhatsApp";

export default function ProductModal({ producto, subtitulo, onClose }) {
  const galeria =
    producto.imagenes && producto.imagenes.length > 0
      ? producto.imagenes
      : [producto.imagen_url].filter(Boolean);

  const [indice, setIndice] = useState(0);
  const tocandoDesde = useRef(null);

  const anterior = () => setIndice((i) => (i - 1 + galeria.length) % galeria.length);
  const siguiente = () => setIndice((i) => (i + 1) % galeria.length);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && galeria.length > 1) anterior();
      if (e.key === "ArrowRight" && galeria.length > 1) siguiente();
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, galeria.length]);

  function onTouchStart(e) {
    tocandoDesde.current = e.touches[0].clientX;
  }
  function onTouchEnd(e) {
    if (tocandoDesde.current === null) return;
    const delta = e.changedTouches[0].clientX - tocandoDesde.current;
    if (Math.abs(delta) > 40) {
      delta > 0 ? anterior() : siguiente();
    }
    tocandoDesde.current = null;
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(38,38,31,0.75)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="product-modal"
        style={{
          background: "var(--card-bg)",
          borderRadius: 6,
          maxWidth: 860,
          width: "100%",
          maxHeight: "88vh",
          overflow: "auto",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "none",
            background: "rgba(255,255,255,0.92)",
            color: "var(--ink)",
            fontSize: 16,
            cursor: "pointer",
            zIndex: 2,
          }}
        >
          ✕
        </button>

        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{
            aspectRatio: "1 / 1",
            background: "var(--porcelain-dim)",
            position: "relative",
          }}
        >
          {galeria[indice] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={galeria[indice]}
              alt={producto.titulo}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}

          {galeria.length > 1 && (
            <>
              <button
                onClick={anterior}
                aria-label="Foto anterior"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 10,
                  transform: "translateY(-50%)",
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "none",
                  background: "rgba(255,255,255,0.85)",
                  color: "var(--ink)",
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                ‹
              </button>
              <button
                onClick={siguiente}
                aria-label="Foto siguiente"
                style={{
                  position: "absolute",
                  top: "50%",
                  right: 10,
                  transform: "translateY(-50%)",
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "none",
                  background: "rgba(255,255,255,0.85)",
                  color: "var(--ink)",
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                ›
              </button>
              <div
                className="stamp"
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(38,38,31,0.65)",
                  color: "var(--text-inverse)",
                  padding: "3px 10px",
                  borderRadius: 10,
                  fontSize: 10,
                }}
              >
                {indice + 1} / {galeria.length}
              </div>
            </>
          )}
        </div>

        <div style={{ padding: 32 }}>
          <h3 className="display" style={{ fontSize: 24, marginBottom: 4 }}>
            {producto.titulo}
          </h3>
          {subtitulo && (
            <div className="stamp" style={{ color: "var(--ink-soft)" }}>
              {subtitulo}
            </div>
          )}
          {producto.descripcion && (
            <p style={{ marginTop: 20, color: "var(--ink-soft)", lineHeight: 1.7 }}>
              {producto.descripcion}
            </p>
          )}
          <div style={{ marginTop: 24 }}>
            <div className="stamp" style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>
              Precio a consultar
            </div>
            <div style={{ maxWidth: 260 }}>
              <ConsultarWhatsApp titulo={producto.titulo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
