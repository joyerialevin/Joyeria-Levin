import { Suspense } from "react";
import { getSanity, PRODUCTOS_QUERY } from "../../lib/sanityClient";
import CatalogoClient from "../../components/CatalogoClient";

export const revalidate = 60; // vuelve a pedir los productos cada 60s

const NUMERO_WHATSAPP = "5493434728312";
const LINK_WHATSAPP = `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(
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

      <section id="visitanos" style={{ background: "var(--ink)" }}>
        <div
          className="container taller-grid"
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
              alt="Joyería Levin"
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
              Visitanos
            </div>
            <h2 className="display" style={{ fontSize: 36, lineHeight: 1.15, margin: "0 0 28px", color: "var(--porcelain)" }}>
              Te esperamos en el local.
            </h2>
            <div style={{ display: "grid", gap: 24, marginBottom: 32 }}>
              <div>
                <div className="stamp" style={{ fontSize: 11, color: "var(--text-inverse-soft)", marginBottom: 8 }}>
                  Dirección
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--porcelain)", margin: 0 }}>
                  Perú 134, Paraná, Entre Ríos.
                </p>
              </div>
              <div>
                <div className="stamp" style={{ fontSize: 11, color: "var(--text-inverse-soft)", marginBottom: 8 }}>
                  Horarios
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--porcelain)", margin: 0 }}>
                  Lunes a viernes 9:00–13:00 y 16:00–20:00
                  <br />
                  Sábados 9:00–13:00
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
    </>
  );
}
