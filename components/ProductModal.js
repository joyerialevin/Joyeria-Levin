"use client";

import { useEffect, useRef, useState } from "react";
import { calcularDescuento, formatearPrecio } from "../lib/precio";
import { optimizarImagenSanity } from "../lib/imagenSanity";
import ConsultarWhatsApp from "./ConsultarWhatsApp";

export default function ProductModal({ producto, subtitulo, onClose }) {
  const galeria =
    producto.imagenes && producto.imagenes.filter(Boolean).length > 0
      ? producto.imagenes.filter(Boolean)
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
          maxWidth: 600,
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
              src={optimizarImagenSanity(galeria[indice], { width: 900 })}
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

          {producto.precio && !producto.ocultar_precio ? (
            <div style={{ marginTop: 20 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                {producto.precio_anterior > producto.precio && (
                  <span
                    className="stamp"
                    style={{ fontSize: 14, color: "var(--ink-soft)", textDecoration: "line-through" }}
                  >
                    {formatearPrecio(producto.precio_anterior)}
                  </span>
                )}
                <span className="display" style={{ fontSize: 22, color: "var(--ink)" }}>
                  {formatearPrecio(producto.precio)}
                </span>
                {calcularDescuento(producto.precio_anterior, producto.precio) != null && (
                  <span className="stamp" style={{ fontSize: 11, color: "var(--oro-deep)" }}>
                    {calcularDescuento(producto.precio_anterior, producto.precio)}% OFF
                  </span>
                )}
              </div>
              {producto.precio_transferencia > 0 && producto.precio_transferencia < producto.precio && (
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
                  <span style={{ fontSize: 15, color: "var(--ink)" }}>
                    {formatearPrecio(producto.precio_transferencia)} con transferencia
                  </span>
                  {calcularDescuento(producto.precio, producto.precio_transferencia) != null && (
                    <span className="stamp" style={{ fontSize: 11, color: "var(--oro-deep)" }}>
                      {calcularDescuento(producto.precio, producto.precio_transferencia)}% OFF EXTRA
                    </span>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="stamp" style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 20 }}>
              Precio a consultar
            </div>
          )}

          {producto.descripcion && (
            <p style={{ marginTop: 20, color: "var(--ink-soft)", lineHeight: 1.7 }}>
              {producto.descripcion}
            </p>
          )}

          {producto.detalles && producto.detalles.length > 0 && (
            <div style={{ marginTop: 28 }}>
              <h4 className="display" style={{ fontSize: 15, marginBottom: 12 }}>
                Detalles del producto
              </h4>
              <div style={{ borderTop: "1px solid var(--line)" }}>
                {producto.detalles.map((d, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 16,
                      padding: "10px 0",
                      borderBottom: "1px solid var(--line)",
                      fontSize: 13.5,
                    }}
                  >
                    <span style={{ color: "var(--ink-soft)" }}>{d.etiqueta}</span>
                    <span style={{ color: "var(--ink)", textAlign: "right" }}>{d.valor}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: 28, maxWidth: 260 }}>
            <ConsultarWhatsApp titulo={producto.titulo} imagenUrl={galeria[indice]} />
          </div>
        </div>
      </div>
    </div>
  );
}
