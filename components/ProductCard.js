"use client";

import { useState } from "react";
import { MATERIAL_LABEL, TIPO_LABEL } from "../lib/categorias";
import { calcularDescuento, formatearPrecio } from "../lib/precio";
import ConsultarWhatsApp from "./ConsultarWhatsApp";
import ProductModal from "./ProductModal";

export default function ProductCard({ producto }) {
  const [abierto, setAbierto] = useState(false);
  const [indice, setIndice] = useState(0);

  const galeria =
    producto.imagenes && producto.imagenes.filter(Boolean).length > 0
      ? producto.imagenes.filter(Boolean)
      : [producto.imagen_url].filter(Boolean);

  function anterior(e) {
    e.stopPropagation();
    setIndice((i) => (i - 1 + galeria.length) % galeria.length);
  }
  function siguiente(e) {
    e.stopPropagation();
    setIndice((i) => (i + 1) % galeria.length);
  }

  const badge = producto.material ? MATERIAL_LABEL[producto.material] : null;

  const subtitulo = [
    producto.tipo ? TIPO_LABEL[producto.tipo] : null,
    producto.marca,
    !producto.tipo && producto.material ? MATERIAL_LABEL[producto.material] : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <div
        onClick={() => setAbierto(true)}
        className="hover-lift"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--line)",
          borderRadius: 4,
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <div
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
          {badge && (
            <span
              className="stamp"
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                padding: "4px 8px",
                borderRadius: 2,
                background: "rgba(255,255,255,0.92)",
                color:
                  producto.material === "oro_18k"
                    ? "var(--oro-deep)"
                    : "var(--plata-deep)",
              }}
            >
              {badge}
            </span>
          )}
          {galeria.length > 1 && (
            <>
              <button
                type="button"
                onClick={anterior}
                aria-label="Foto anterior"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 8,
                  transform: "translateY(-50%)",
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: "none",
                  background: "rgba(255,255,255,0.85)",
                  color: "var(--ink)",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                ‹
              </button>
              <button
                type="button"
                onClick={siguiente}
                aria-label="Foto siguiente"
                style={{
                  position: "absolute",
                  top: "50%",
                  right: 8,
                  transform: "translateY(-50%)",
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: "none",
                  background: "rgba(255,255,255,0.85)",
                  color: "var(--ink)",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                ›
              </button>
            </>
          )}
        </div>
        <div style={{ padding: "16px 16px 20px" }}>
          <h5 className="display" style={{ fontSize: 16, marginBottom: 4 }}>
            {producto.titulo}
          </h5>
          {subtitulo && (
            <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 12 }}>
              {subtitulo}
            </div>
          )}
          {producto.precio && !producto.ocultar_precio ? (
            <div style={{ marginBottom: 4 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                {producto.precio_anterior > producto.precio && (
                  <span
                    className="stamp"
                    style={{ fontSize: 11.5, color: "var(--ink-soft)", textDecoration: "line-through" }}
                  >
                    {formatearPrecio(producto.precio_anterior)}
                  </span>
                )}
                <span className="stamp" style={{ fontSize: 15, color: "var(--ink)" }}>
                  {formatearPrecio(producto.precio)}
                </span>
                {calcularDescuento(producto.precio_anterior, producto.precio) != null && (
                  <span className="stamp" style={{ fontSize: 10, color: "var(--oro-deep)" }}>
                    {calcularDescuento(producto.precio_anterior, producto.precio)}% OFF
                  </span>
                )}
              </div>
              {producto.precio_transferencia > 0 && producto.precio_transferencia < producto.precio && (
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 2, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11.5, color: "var(--ink)" }}>
                    {formatearPrecio(producto.precio_transferencia)} con transferencia
                  </span>
                  {calcularDescuento(producto.precio, producto.precio_transferencia) != null && (
                    <span className="stamp" style={{ fontSize: 10, color: "var(--oro-deep)" }}>
                      {calcularDescuento(producto.precio, producto.precio_transferencia)}% OFF EXTRA
                    </span>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="stamp" style={{ fontSize: 11, color: "var(--ink-soft)" }}>
              Precio a consultar
            </div>
          )}
          <div onClick={(e) => e.stopPropagation()}>
            <ConsultarWhatsApp titulo={producto.titulo} imagenUrl={producto.imagen_url} />
          </div>
        </div>
      </div>

      {abierto && (
        <ProductModal
          producto={producto}
          subtitulo={subtitulo}
          onClose={() => setAbierto(false)}
        />
      )}
    </>
  );
}
