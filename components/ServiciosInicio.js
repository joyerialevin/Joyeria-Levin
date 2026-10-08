import Image from "next/image";
import Link from "next/link";

const NUMERO_WHATSAPP = "5493434728312";
const LINK_WHATSAPP = `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(
  "Hola, vengo desde la página web. Quería consultar por un servicio."
)}`;

const SERVICIOS = [
  {
    href: "/service-relojeria",
    foto: "/fotos/service-tecnico-hero.jpg",
    alt: "Relojera trabajando en el taller de Joyería Levin",
    opDesktop: "50% 30%",
    opMobile: "50% 22%",
    categoria: "01 · TALLER DE RELOJERÍA",
    titulo: "Service de relojería",
    descripcion: "Pilas, mallas, pernos, cierres y reparaciones. Presupuesto antes de empezar.",
    datoCorto: "Presupuesto antes de empezar",
    chips: ["Muchos trabajos en el momento"],
  },
  {
    href: "/tasacion-oro-plata",
    foto: "/fotos/tasacion-balanza-oro.jpg",
    alt: "Pesaje de joyas de oro en la balanza de Joyería Levin",
    opDesktop: "62% 45%",
    opMobile: "62% 45%",
    categoria: "02 · ORO Y PLATA",
    titulo: "Tasación",
    descripcion: "Verificamos la pureza, pesamos cada pieza y te informamos su valor.",
    datoCorto: "Sin cargo · Sin turno previo",
    chips: ["Sin cargo", "Sin turno previo"],
  },
  {
    href: "/grabados-personalizados",
    foto: "/fotos/grabados-anillo-inicial-m.jpg",
    alt: "Anillo en oro y plata con la inicial M grabada",
    opDesktop: "55% 40%",
    opMobile: "55% 35%",
    categoria: "03 · PERSONALIZADOS",
    titulo: "Grabados",
    descripcion: "Nombres, iniciales, fechas y símbolos en oro y plata. También en piezas que ya tenés.",
    datoCorto: "Nombres · Iniciales · Fechas",
    chips: ["Anillos · Pulseras · Dijes · Relojes"],
  },
];

function IconoFlecha() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function ServiciosInicio() {
  return (
    <section className="servicios-inicio">
      <div className="container">
        <div className="servicios-inicio-head">
          <div>
            <div className="servicios-inicio-eyebrow">Nuestros servicios</div>
            <h2 className="servicios-inicio-title">Mucho más que una joyería.</h2>
            <p className="servicios-inicio-bajada">
              Taller propio y más de 50 años de oficio en Paraná. Cuidamos lo que ya tenés y lo hacemos tuyo.
            </p>
          </div>
          <Link href="/service-relojeria" className="servicios-inicio-link servicios-inicio-desktop-only">
            Ver todos los servicios
          </Link>
        </div>

        <div className="servicios-inicio-grid">
          {SERVICIOS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="servicios-inicio-card"
              style={{ "--op-desktop": s.opDesktop, "--op-mobile": s.opMobile }}
            >
              <Image
                src={s.foto}
                alt={s.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="servicios-inicio-card-img"
                style={{ objectFit: "cover" }}
              />
              <div className="servicios-inicio-card-veil" aria-hidden="true" />
              <div className="servicios-inicio-card-content">
                <div className="servicios-inicio-card-text">
                  <p className="servicios-inicio-card-cat">{s.categoria}</p>
                  <h3 className="servicios-inicio-card-title">{s.titulo}</h3>
                  <p className="servicios-inicio-card-desc servicios-inicio-desktop-only">{s.descripcion}</p>
                  <p className="servicios-inicio-card-dato servicios-inicio-mobile-only">{s.datoCorto}</p>
                  <div className="servicios-inicio-card-chips servicios-inicio-desktop-only">
                    {s.chips.map((c) => (
                      <span key={c} className="servicios-inicio-card-chip">
                        {c}
                      </span>
                    ))}
                  </div>
                  <span className="servicios-inicio-card-cta servicios-inicio-desktop-only">
                    Conocer el servicio →
                  </span>
                </div>
                <span className="servicios-inicio-card-arrow servicios-inicio-mobile-only" aria-hidden="true">
                  <IconoFlecha />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="servicios-inicio-cierre">
          <p className="servicios-inicio-cierre-texto">
            ¿No sabés qué necesita tu pieza? Mandanos una foto y te orientamos.
          </p>
          <a href={LINK_WHATSAPP} target="_blank" rel="noopener noreferrer" className="servicios-inicio-cierre-btn">
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
