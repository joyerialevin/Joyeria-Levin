import GuiaMamaScript from "../../components/GuiaMamaScript";

// Guía de regalos del Día de la Madre — landing temporal.
// A diferencia de las demás páginas del sitio, este contenido vino como
// HTML/CSS/JS sueltos (ver public/regalos-dia-de-la-madre/). Se integró acá
// como página real para que el header y el footer del sitio (Header.js /
// Footer.js, via app/layout.js) se mantengan siempre visibles — antes era
// un archivo estático aparte con su propio header, así que navegar hacia
// acá "salía" del sitio. El CSS original (styles.css) se dejó tal cual
// pero escopado bajo la clase "guia-mama" para que no afecte al resto del
// sitio mientras esta página está montada.
//
// Sacar esta carpeta completa (y el link del menú en Header.js /
// MobileNav.js, y el banner en app/page.js) después del 18 de octubre.
export const metadata = {
  title: "Regalos para el Día de la Madre en Paraná | Joyería Levin",
  description:
    "Ideas de regalo para el Día de la Madre: joyas en oro 18K, plata 925, Swarovski y relojes. Asesoramiento personalizado en Perú 134, Paraná.",
  openGraph: {
    title: "Regalos para el Día de la Madre | Joyería Levin",
    description: "Joyas en oro 18K, plata 925, Swarovski y relojes para encontrar ese regalo especial.",
    images: ["/regalos-dia-de-la-madre/img/post4-hijo.jpg"],
  },
};

export default function RegalosDiaDeLaMadrePage() {
  return (
    <div className="guia-mama">
      <link rel="stylesheet" href="/regalos-dia-de-la-madre/styles.css" />

      <main>
        {/* PORTADA */}
        <section className="hero">
          <div className="hero-text">
            <div className="hero-kicker">
              <span className="eyebrow eyebrow-light">DÍA DE LA MADRE · DOMINGO 18 DE OCTUBRE</span>
              <span className="pill" id="countdown" hidden></span>
            </div>
            <h1>
              Un regalo para mamá,
              <br />
              para siempre.
            </h1>
            <p>
              Joyas en oro 18K, plata 925, Swarovski y relojes para encontrar ese regalo especial. Te
              ayudamos a elegirlo en nuestro local o por WhatsApp.
            </p>
            <div className="btn-row">
              <a href="#guia" className="btn btn-olive">
                VER REGALOS
              </a>
              <a
                href="#"
                className="btn btn-outline-light js-wa"
                data-msg="Hola! Quiero consultar por los regalos del Día de la Madre"
              >
                CONSULTAR POR WHATSAPP
              </a>
            </div>
          </div>
          <div className="hero-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/regalos-dia-de-la-madre/img/post4-hijo.jpg" alt="Mamá e hijo abrazados, ella con joyas de Levin" />
          </div>
        </section>

        {/* CONFIANZA */}
        <section className="trust">
          <div>
            <strong>Más de 50 años en Paraná</strong>
            <span>La confianza de generaciones de familias.</span>
          </div>
          <div>
            <strong>Asesoramiento personalizado</strong>
            <span>Te ayudamos a encontrar el regalo indicado.</span>
          </div>
          <div>
            <strong>Grabados personalizados</strong>
            <span>Nombres, iniciales y fechas en oro y plata.</span>
          </div>
        </section>

        {/* GUÍA */}
        <section className="guide" id="guia">
          <div className="section-head">
            <div>
              <span className="eyebrow">LA GUÍA</span>
              <h2>Un regalo para cada mamá</h2>
            </div>
            <p>
              Explorá nuestra selección de joyas, relojes y regalos personalizados. Elegí lo que te guste
              y consultanos disponibilidad por WhatsApp o en el local.
            </p>
          </div>

          <div className="tabs" role="group" aria-label="Filtrar regalos">
            <button type="button" className="tab is-on" data-cat="todo" aria-pressed="true">
              TODO
            </button>
            <button type="button" className="tab" data-cat="oro" aria-pressed="false">
              ORO 18K
            </button>
            <button type="button" className="tab" data-cat="plata" aria-pressed="false">
              PLATA 925
            </button>
            <button type="button" className="tab" data-cat="cristales" aria-pressed="false">
              SWAROVSKI
            </button>
            <button type="button" className="tab" data-cat="personalizados" aria-pressed="false">
              PERSONALIZADOS
            </button>
            <button type="button" className="tab" data-cat="relojes" aria-pressed="false">
              RELOJES
            </button>
          </div>

          {/* Las tarjetas se arman desde script.js (lista PRODUCTOS) */}
          <div className="grid" id="grid"></div>
        </section>

        {/* JOYA DESTACADA */}
        <section className="split split-sand">
          <div className="split-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/regalos-dia-de-la-madre/img/post6-ninosoro-3.jpg"
              alt="Mujer con dije de niño en oro 18K"
              style={{ objectPosition: "center 20%" }}
            />
          </div>
          <div className="split-text">
            <span className="eyebrow">UNA JOYA CON SIGNIFICADO</span>
            <h2>
              Sus hijos,
              <br />
              siempre cerca.
            </h2>
            <p>
              El dije de niño en oro 18K es uno de esos regalos que guardan un significado especial.
              Completá el conjunto con cadena, anillo y pulseras para usar juntos o por separado.
            </p>
            <a href="#" className="btn btn-dark js-wa" data-msg="Hola! Quiero consultar por el dije de niño en oro 18K">
              CONSULTAR DISPONIBILIDAD
            </a>
          </div>
        </section>

        {/* PERSONALIZADOS */}
        <section className="split split-dark split-reverse">
          <div className="split-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/regalos-dia-de-la-madre/img/post2-personalizado-1.jpg"
              alt="Cadena con dije para grabar"
              loading="lazy"
              style={{ objectPosition: "center 40%" }}
            />
          </div>
          <div className="split-text">
            <span className="eyebrow eyebrow-light">PERSONALIZADOS</span>
            <h2>Un regalo hecho especialmente para ella.</h2>
            <p>
              Personalizamos nombres, iniciales y fechas en cadenas, medallas, anillos y pulseras. Los
              trabajos se realizan a pedido, por eso recomendamos consultarnos con anticipación.
            </p>
            <a href="#" className="btn btn-olive js-wa" data-msg="Hola! Quiero consultar por una personalización para el Día de la Madre">
              CONSULTAR PERSONALIZACIÓN
            </a>
          </div>
        </section>

        {/* PARA SALIR DE LO DE SIEMPRE */}
        <section className="moment">
          <div className="section-head">
            <div>
              <span className="eyebrow">PARA SALIR DE LO DE SIEMPRE</span>
              <h2>Regalale algo distinto.</h2>
            </div>
            <p>
              Un conjunto pensado para esas ocasiones especiales: una cena, una salida con amigas, una
              fiesta o un cumpleaños. Para que mamá se arregle, salga y se sienta especial.
            </p>
          </div>
          <div className="mosaic">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/regalos-dia-de-la-madre/img/post5-regalo-2.jpg" alt="Hijo sosteniendo un estuche de regalo" loading="lazy" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/regalos-dia-de-la-madre/img/post5-regalo.jpg" alt="Estuche abierto con conjunto de joyas" loading="lazy" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/regalos-dia-de-la-madre/img/post5-regalo-1.jpg" alt="Detalle del estuche con joyas" loading="lazy" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/regalos-dia-de-la-madre/img/post5-regalo-3.jpg" alt="Hijo abriendo el estuche" loading="lazy" />
          </div>
        </section>

        {/* VISITANOS */}
        <section className="visit" id="visitanos">
          <div className="visit-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/regalos-dia-de-la-madre/img/post-eleccion-mama.jpg" alt="Mamá eligiendo entre distintos collares" loading="lazy" />
          </div>
          <div className="visit-text">
            <span className="eyebrow">VISITANOS</span>
            <h2>¿No sabés qué regalarle?</h2>
            <p>
              Vení a nuestro local y te ayudamos a encontrar una opción según su estilo y tu presupuesto.
              Hace más de 50 años acompañamos a las familias de Paraná.
            </p>
            <dl className="info">
              <div>
                <dt>DIRECCIÓN</dt>
                <dd>Perú 134, Paraná, Entre Ríos</dd>
              </div>
              <div>
                <dt>LUNES A VIERNES</dt>
                <dd>9 a 13 y 16 a 20</dd>
              </div>
              <div>
                <dt>SÁBADOS</dt>
                <dd>9 a 13</dd>
              </div>
            </dl>
            <div className="btn-row">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Per%C3%BA+134+Paran%C3%A1+Entre+R%C3%ADos"
                target="_blank"
                rel="noopener"
                className="btn btn-dark"
              >
                CÓMO LLEGAR
              </a>
              <a href="#" className="btn btn-outline js-wa" data-msg="Hola! Quiero consultar por los regalos del Día de la Madre">
                ESCRIBINOS POR WHATSAPP
              </a>
            </div>
          </div>
        </section>

        {/* PREGUNTAS FRECUENTES */}
        <section className="faq">
          <div>
            <span className="eyebrow">PREGUNTAS FRECUENTES</span>
            <h2>Antes de elegir</h2>
          </div>
          <div className="faq-list">
            <details open>
              <summary>¿Cómo sé la medida de anillo de mamá?</summary>
              <p>Podés traernos un anillo que ella use habitualmente y lo medimos en el momento.</p>
            </details>
            <details>
              <summary>¿Con cuánta anticipación encargo un grabado?</summary>
              <p>
                Los trabajos personalizados requieren preparación. Consultanos por WhatsApp para confirmar
                el plazo según el tipo de grabado y la fecha en que lo necesitás.
              </p>
            </details>
            <details>
              <summary>¿Qué medios de pago aceptan?</summary>
              <p>
                Efectivo, débito y transferencia. También contamos con opciones de financiación con
                tarjetas de crédito. Consultanos para conocer las promociones vigentes.
              </p>
            </details>
            <details>
              <summary>¿Puedo consultar por WhatsApp antes de ir?</summary>
              <p>
                Sí. Mandanos una foto o el nombre del producto que te gustó y te confirmamos disponibilidad,
                precio y opciones de pago.
              </p>
            </details>
          </div>
        </section>
      </main>

      <GuiaMamaScript />
    </div>
  );
}
