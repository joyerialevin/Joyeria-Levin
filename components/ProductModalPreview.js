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
        maxWidth: 1040,
        width: "100%",
        border: "1px solid var(--line)",
        position: "relative",
      }}
    >
      <div style={{ padding: "24px 24px 0" }}>
      <div style={{ display: "flex", gap: 8 }}>
        {galeria.length > 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
            {galeria.map((url, i) => (
              <button
                key={i}
                onClick={() => setIndice(i)}
                aria-label={`Ver foto ${i + 1}`}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 4,
                  overflow: "hidden",
                  padding: 0,
                  cursor: "pointer",
                  background: "var(--card-bg)",
                  border: i === indice ? "2px solid var(--oro)" : "1px solid var(--line)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={optimizarImagenSanity(url, { width: 100 })}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </button>
            ))}
          </div>
        )}
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{
            aspectRatio: "1 / 1",
            background: "var(--card-bg)",
            borderRadius: 6,
            boxShadow: "var(--shadow-card)",
            overflow: "hidden",
            position: "relative",
            flex: 1,
            minWidth: 0,
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
        </div>
      </div>
      </div>

      <div style={{ padding: "24px 32px 32px 20px" }}>
        <div style={{ textAlign: "left", marginBottom: 8 }}>
          <h3 className="display" style={{ fontSize: 26, marginBottom: 6 }}>
            {producto.titulo}
          </h3>
          {producto.precio && !producto.ocultar_precio ? (
            <div style={{ marginTop: 24 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "flex-start", gap: 10, flexWrap: "wrap" }}>
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
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
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

        <div style={{ marginTop: 32, maxWidth: 320 }}>
          <ConsultarWhatsApp titulo={producto.titulo} imagenUrl={galeria[indice]} />
        </div>
      </div>
    </div>
  );
}
