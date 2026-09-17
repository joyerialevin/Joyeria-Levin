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
          <div className="visitanos-info-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 36, textAlign: "left" }}>
            <div>
              <div className="stamp" style={{ fontSize: 11, color: "var(--oro-deep)", marginBottom: 10 }}>
                Dirección
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-soft)", margin: 0 }}>
                Perú 134, Paraná, Entre Ríos.
              </p>
            </div>
            <div>
              <div className="stamp" style={{ fontSize: 11, color: "var(--oro-deep)", marginBottom: 10 }}>
                Horarios
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-soft)", margin: 0 }}>
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
