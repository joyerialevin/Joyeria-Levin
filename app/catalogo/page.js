import { Suspense } from "react";
import { getSanity, PRODUCTOS_QUERY } from "../../lib/sanityClient";
import CatalogoClient from "../../components/CatalogoClient";

export const revalidate = 60; // vuelve a pedir los productos cada 60s

const NUMERO_WHATSAPP = "5493434728312";
const LINK_WHATSAPP = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(
  "Hola! Vi el catálogo de Joyería Levin y quería hacer una consulta."
)}`;

export default async function CatalogoPage() {
  let productos = [];
  try {
    productos = await getSanity().fetch(PRODUCTOS_QUERY);
  } catch (error) {
    return (
      <div className="container" style={{ padding: "60px 0" }}>
        <p>No se pudieron cargar los productos. Intentá de nuevo más tarde.</p>
      </div>
    );
  }

  return (
    <>
      <div id="catalogo">
        <Suspense fallback={null}>
          <CatalogoClient productos={productos || []} />
        </Suspense>
      </div>

      <section style={{ background: "var(--ink)" }}>
        <div
          className="container"
          style={{
            padding: 0,
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "stretch",
          }}
        >
          <div style={{ position: "relative", minHeight: 420 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/fotos/taller.jpg"
              alt="Taller de relojería Levin"
              style={{
                width: "100%",
                height: "100%",
                minHeight: 420,
                objectFit: "cover",
                display: "block",
                position: "absolute",
                inset: 0,
              }}
            />
          </div>
          <div style={{ padding: "72px 6%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="stamp" style={{ color: "var(--text-inverse-soft)", marginBottom: 20, fontWeight: 300 }}>
              Taller propio
            </div>
            <h2 className="display" style={{ fontSize: 36, lineHeight: 1.15, margin: "0 0 20px", color: "var(--porcelain)" }}>
              El reloj se queda acá.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--text-inverse-soft)", margin: "0 0 32px", maxWidth: "44ch" }}>
              Cambio de pilas, ajuste de mallas, cambio de vidrio y revisión completa. Evaluamos la pieza, te pasamos
              presupuesto y recién entonces trabajamos.
            </p>
            <div style={{ display: "grid", gap: 14, marginBottom: 32 }}>
              {["Cambio de pila", "Ajuste o cambio de malla", "Revisión y reparación"].map((s) => (
                <div
                  key={s}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(253,252,248,0.15)",
                    paddingTop: 14,
                    fontSize: 14.5,
                  }}
                >
                  <span style={{ color: "var(--porcelain)" }}>{s}</span>
                  <span style={{ color: "var(--text-inverse-soft)" }}>A presupuesto</span>
                </div>
              ))}
            </div>
            <a
              href={LINK_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="stamp"
              style={{
                color: "var(--porcelain)",
                background: "var(--oro)",
                padding: "15px 30px",
                borderRadius: "var(--radius-sm)",
                alignSelf: "flex-start",
              }}
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section
        id="visitanos"
        style={{ background: "var(--sunken)", borderTop: "1px solid var(--line)" }}
      >
        <div className="container" style={{ padding: "70px 6%", maxWidth: 640, textAlign: "center", margin: "0 auto" }}>
          <div className="stamp" style={{ color: "var(--oro-deep)", marginBottom: 18 }}>
            Visitanos
          </div>
          <h2 className="display" style={{ fontSize: 32, lineHeight: 1.15, margin: "0 0 28px" }}>
            Te esperamos en el local.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 36, textAlign: "left" }}>
            <div>
              <div className="stamp" style={{ fontSize: 11, color: "var(--oro-deep)", marginBottom: 10 }}>
                Dirección
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-soft)", margin: 0 }}>
                Perú 134
                <br />
                Paraná, Entre Ríos
                <br />
                Argentina
              </p>
            </div>
            <div>
              <div className="stamp" style={{ fontSize: 11, color: "var(--oro-deep)", marginBottom: 10 }}>
                Horarios
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-soft)", margin: 0 }}>
                Lun a vie
                <br />
                9 a 13 y 16 a 20
                <br />
                Sáb 9 a 13
              </p>
            </div>
          </div>
          <a
            href={LINK_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="stamp"
            style={{
              color: "var(--porcelain)",
              background: "var(--oro)",
              padding: "16px 32px",
              borderRadius: "var(--radius-sm)",
            }}
          >
            Consultar por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
