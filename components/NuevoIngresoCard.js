"use client";

import { useState } from "react";
import { optimizarImagenSanity } from "../lib/imagenSanity";
import { calcularDescuento, formatearPrecio } from "../lib/precio";
import ProductModal from "./ProductModal";

const NUMERO_WHATSAPP = "5493434728312";

export default function NuevoIngresoCard({ producto }) {
  const [abierto, setAbierto] = useState(false);

  const galeria =
    producto.imagenes && producto.imagenes.filter(Boolean).length > 0
      ? producto.imagenes.filter(Boolean)
      : [producto.imagen_url].filter(Boolean);

  const tienePrecio = producto.precio > 0 && !producto.ocultar_precio;
  const tieneTransferencia =
    tienePrecio && producto.precio_transferencia > 0 && producto.precio_transferencia < producto.precio;
  const descuentoTransferencia = tieneTransferencia
    ? calcularDescuento(producto.precio, producto.precio_transferencia)
    : null;

  const nombreParaMensaje = producto.titulo;
  const mensajeWhatsApp = `Hola, quería consultar disponibilidad del ${nombreParaMensaje}.`;
  const linkWhatsApp = `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(mensajeWhatsApp)}`;

  return (
    <>
      <div
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--line)",
          borderRadius: 6,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <button
          type="button"
          onClick={() => setAbierto(true)}
          aria-label={`Ver ${nombreParaMensaje}`}
          style={{
            aspectRatio: "1 / 1",
            background: "var(--porcelain-dim)",
            border: "none",
            padding: 0,
            cursor: "pointer",
            display: "block",
            width: "100%",
          }}
        >
          {galeria[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={optimizarImagenSanity(galeria[0], { width: 600 })}
              alt={producto.titulo}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          )}
        </button>

        <div style={{ padding: "10px 12px 12px", display: "flex", flexDirection: "column", flex: 1 }}>
          <div className="display" style={{ fontSize: 13, color: "var(--ink)", marginBottom: 10 }}>
            {producto.titulo}
          </div>

          <div style={{ marginTop: "auto" }}>
            {tienePrecio ? (
              <>
                <div className="display" style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", marginBottom: 2 }}>
                  {formatearPrecio(producto.precio)}
                </div>
                {tieneTransferencia && (
                  <div style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 10.5, color: "var(--ink)" }}>
                      <strong>{formatearPrecio(producto.precio_transferencia)}</strong> con Efectivo y Transferencia
                    </span>
                    {descuentoTransferencia != null && (
                      <span
                        className="stamp"
                        style={{
                          display: "inline-block",
                          fontSize: 9,
                          fontWeight: 700,
                          color: "var(--porcelain)",
                          background: "var(--oro)",
                          padding: "2px 6px",
                          borderRadius: "var(--radius-pill)",
                        }}
                      >
                        {descuentoTransferencia}% OFF EXTRA
                      </span>
                    )}
                  </div>
                )}
                {!tieneTransferencia && <div style={{ marginBottom: 10 }} />}
              </>
            ) : (
              <div className="stamp" style={{ fontSize: 10.5, color: "var(--ink-soft)", marginBottom: 10 }}>
                Precio a consultar
              </div>
            )}

            <button
              type="button"
              onClick={() => setAbierto(true)}
              className="stamp"
              style={{
                display: "block",
                width: "100%",
                textAlign: "center",
                padding: "8px 0",
                fontSize: 10.5,
                background: "var(--oro)",
                color: "var(--porcelain)",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                marginBottom: 7,
              }}
            >
              Ver producto
            </button>

            <a
              href={linkWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="stamp"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                fontSize: 9.5,
                color: "var(--ink-soft)",
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.36a9.87 9.87 0 0 0 4.62 1.15h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.7c2.19 0 4.25.85 5.79 2.4a8.13 8.13 0 0 1 2.4 5.8c0 4.52-3.68 8.2-8.2 8.2a8.2 8.2 0 0 1-4.16-1.13l-.3-.17-3.22.81.86-3.14-.19-.32a8.13 8.13 0 0 1-1.25-4.36c0-4.52 3.68-8.2 8.2-8.2Z" />
              </svg>
              Consultar disponibilidad
            </a>
          </div>
        </div>
      </div>

      {abierto && <ProductModal producto={producto} onClose={() => setAbierto(false)} />}
    </>
  );
}
