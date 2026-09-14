"use client";

import { useState } from "react";
import { MATERIAL_LABEL, TIPO_LABEL } from "../lib/categorias";
import { calcularDescuento, formatearPrecio } from "../lib/precio";
import ConsultarWhatsApp from "./ConsultarWhatsApp";
import ProductModal from "./ProductModal";

export default function ProductCard({ producto }) {
  const [abierto, setAbierto] = useState(false);

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
          {producto.imagen_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={producto.imagen_url}
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
          {producto.imagenes && producto.imagenes.length > 1 && (
            <span
              className="stamp"
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                padding: "4px 8px",
                borderRadius: 2,
                background: "rgba(38,38,31,0.72)",
                color: "var(--text-inverse)",
              }}
            >
              +{producto.imagenes.length - 1}
            </span>
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
            <ConsultarWhatsApp titulo={producto.titulo} />
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
