"use client";

import { useRef, useState } from "react";
import { calcularDescuento, formatearPrecio } from "../lib/precio";
import { optimizarImagenSanity } from "../lib/imagenSanity";
import ConsultarWhatsApp from "./ConsultarWhatsApp";

// Mismo contenido que ProductModal (foto grande + ficha completa), pero
// embebido en el flujo normal de la página en vez de como overlay fijo —
// solo para previsualizar "la ficha individual" sin tener que simular un
// click en un componente cliente.
export default function ProductModalPreview({ producto, subtitulo }) {
  const galeria =
    producto.imagenes && producto.imagenes.filter(Boolean).length > 0
      ? producto.imagenes.filter(Boolean)
      : [producto.imagen_url].filter(Boolean);

  const [indice, setIndice] = useState(0);
  const tocandoDesde = useRef(null);

  const anterior = () => setIndice((i) => (i - 1 + galeria.length) % galeria.length);
  const siguiente = () => setIndice((i) => (i + 1) % galeria.length);

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
      className="product-modal"
      style={{
        background: "var(--card-bg)",
        borderRadius: 6,
        maxWidth: 600,
        width: "100%",
        border: "1px solid var(--line)",
        position: "relative",
      }}
    >
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          aspectRatio: "1 / 1",
          background: "var(--card-bg)",
          borderRadius: 6,
          boxShadow: "var(--shadow-card)",
          overflow: "hidden",
          margin: "24px 24px 0",
          width: "calc(100% - 48px)",
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

      <div style={{ padding: "40px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <h3 className="display" style={{ fontSize: 26, marginBottom: 6 }}>
            {producto.titulo}
          </h3>
          {producto.precio && !producto.ocultar_precio ? (
            <div style={{ marginTop: 24 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
                {producto.precio_anterior > producto.precio && (
                  <span
                    className="stamp"
                    style={{ fontSize: 12, color: "var(--ink-soft)", textDecoration: "line-through" }}
                  >
                    {formatearPrecio(producto.precio_anterior)}
                  </span>
                )}
                <span className="display" style={{ fontSize: 19, fontWeight: 700, color: "var(--ink)" }}>
                  {formatearPrecio(producto.precio)}
                </span>
                {calcularDescuento(producto.precio_anterior, producto.precio) != null && (
                  <span className="stamp" style={{ fontSize: 10, color: "var(--oro-deep)" }}>
                    {calcularDescuento(producto.precio_anterior, producto.precio)}% OFF
                  </span>
                )}
              </div>
              {producto.precio_transferencia > 0 && producto.precio_transferencia < producto.precio && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
                  <span style={{ fontSize: 16, color: "var(--ink)" }}>
                    <strong>{formatearPrecio(producto.precio_transferencia)}</strong> con Efectivo y Transferencia
                  </span>
                  {calcularDescuento(producto.precio, producto.precio_transferencia) != null && (
                    <span
                      className="stamp"
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "var(--porcelain)",
                        background: "var(--oro)",
                        padding: "4px 12px",
                        borderRadius: "var(--radius-pill)",
                      }}
                    >
                      {calcularDescuento(producto.precio, producto.precio_transferencia)}% OFF EXTRA
                    </span>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="stamp" style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 24 }}>
              Precio a consultar
            </div>
          )}

          {typeof producto.stock === "number" && (
            <div
              className="stamp"
              style={{
                marginTop: 12,
                fontSize: 11,
                color: producto.stock > 0 ? "var(--oro-deep)" : "var(--ink-soft)",
              }}
            >
              {producto.stock > 0
                ? `${producto.stock} ${producto.stock === 1 ? "disponible" : "disponibles"}`
                : "Sin stock"}
            </div>
          )}
        </div>

        {producto.descripcion && (
          <p style={{ marginTop: 32, color: "var(--ink-soft)", lineHeight: 1.6, fontSize: 12.5 }}>
            {producto.descripcion}
          </p>
        )}

        {producto.detalles && producto.detalles.length > 0 && (
          <div style={{ marginTop: 32 }}>
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

        <div style={{ marginTop: 32, maxWidth: 280, marginLeft: "auto", marginRight: "auto" }}>
          <ConsultarWhatsApp titulo={producto.titulo} imagenUrl={galeria[indice]} />
        </div>
      </div>
    </div>
  );
}
