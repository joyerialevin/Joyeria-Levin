"use client";

import { useState } from "react";
import { optimizarImagenSanity } from "../lib/imagenSanity";
import { calcularDescuento, formatearCuota, formatearPrecio } from "../lib/precio";
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
  // Descuento que aplica en cualquier medio de pago (ej. Festina): precio
  // anterior tachado + el % OFF general, igual que en el catálogo.
  const tieneDescuentoGeneral = tienePrecio && producto.precio_anterior > producto.precio;
  const descuentoGeneral = tieneDescuentoGeneral
    ? calcularDescuento(producto.precio_anterior, producto.precio)
    : null;

  const nombreParaMensaje = producto.titulo;
  const mensajeWhatsApp = `Hola, quería consultar disponibilidad del ${nombreParaMensaje}.`;
  const linkWhatsApp = `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(mensajeWhatsApp)}`;

  return (
    <>
      <div
        style={{
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
            background: "var(--card-bg)",
            border: "none",
            borderRadius: 6,
            boxShadow: "var(--shadow-card)",
            overflow: "hidden",
            padding: 0,
            cursor: "pointer",
            display: "block",
            width: "100%",
            marginBottom: 14,
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

        <div style={{ padding: "0 2px 4px", display: "flex", flexDirection: "column", flex: 1 }}>
          <div className="display" style={{ fontSize: 13, color: "var(--ink)", marginBottom: 10 }}>
            {producto.titulo}
          </div>

          <div style={{ marginTop: "auto" }}>
            {tienePrecio ? (
              <>
                <div
                  className="display"
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 6,
                    flexWrap: "wrap",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--ink)",
                    marginBottom: 2,
                  }}
                >
                  {tieneDescuentoGeneral && (
                    <span
                      className="stamp"
                      style={{ fontSize: 10.5, fontWeight: 400, color: "var(--ink-soft)", textDecoration: "line-through" }}
                    >
                      {formatearPrecio(producto.precio_anterior)}
                    </span>
                  )}
                  {formatearPrecio(producto.precio)}
                  {descuentoGeneral != null && (
                    <span className="stamp" style={{ fontSize: 9, fontWeight: 700, color: "var(--oro-deep)" }}>
                      {descuentoGeneral}% OFF
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 10.5, color: "var(--ink-soft)", marginBottom: tieneTransferencia ? 4 : 10 }}>
                  3 cuotas sin interés de {formatearCuota(producto.precio)}
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
              </>
            ) : (
              <div className="stamp" style={{ fontSize: 10.5, color: "var(--ink-soft)", marginBottom: 10 }}>
                Precio a consultar
              </div>
            )}

            <a
              href={linkWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
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
              }}
            >
              Consultar disponibilidad
            </a>
          </div>
        </div>
      </div>

      {abierto && <ProductModal producto={producto} onClose={() => setAbierto(false)} />}
    </>
  );
}
