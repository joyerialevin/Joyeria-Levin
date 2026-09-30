import Script from "next/script";

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
    "Ideas de regalo para el Día de la Madre: joyas en oro 18k, plata 925, cristales Swarovski y relojes. Asesoramiento personalizado en Perú 134, Paraná.",
  openGraph: {
    title: "Regalos para el Día de la Madre | Joyería Levin",
    description: "Joyas en oro 18k, plata 925, cristales Swarovski y relojes, elegidos para cada mamá.",
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
              Para ella,
              <br />
              para siempre.
            </h1>
            <p>
              Joyas en oro 18k, plata 925, cristales Swarovski y relojes, elegidos para cada mamá. Con el
              asesoramiento de siempre, en Perú 134.
            </p>
            <div className="btn-row">
              <a href="#guia" className="btn btn-olive">
                VER LA GUÍA
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
            <span>Confianza de generaciones de familias.</span>
          </div>
          <div>
            <strong>Asesoramiento personalizado</strong>
            <span>Te ayudamos a elegir la pieza justa.</span>
          </div>
          <div>
            <strong>Grabados en plata y oro</strong>
            <span>Nombres, iniciales y fechas a pedido.</span>
          </div>
        </section>

        {/* GUÍA */}
        <section className="guide" id="guia">
          <div className="section-head">
            <div>
              <span className="eyebrow">LA GUÍA</span>
              <h2>Un regalo para cada mamá</h2>
            </div>
            <p>Elegí por material o por tipo de regalo. Pasá las fotos de cada conjunto y consultalo por WhatsApp o en el local.</p>
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

        {/* PIEZA DE LA TEMPORADA */}
        <section className="split split-sand">
          <div className="split-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/regalos-dia-de-la-madre/img/post6-ninosoro-3.jpg"
              alt="Mujer con cadena de dije de nenito en oro 18k"
              style={{ objectPosition: "center 20%" }}
            />
          </div>
          <div className="split-text">
            <span className="eyebrow">PIEZA DE LA TEMPORADA</span>
            <h2>
              Sus hijos,
              <br />
              siempre cerca.
            </h2>
            <p>
              El conjunto con dije de nenito, en oro 18k, es de esas piezas que se usan todos los días y se
              heredan. Cadena, anillo y dos pulseras que se llevan juntos o por separado.
            </p>
            <a href="#" className="btn btn-dark js-wa" data-msg="Hola! Quiero consultar por el conjunto con dije de nenito en oro 18k">
              CONSULTAR POR ESTA PIEZA
            </a>
          </div>
        </section>

        {/* EL MOMENTO DE REGALAR */}
        <section className="moment">
          <div className="section-head">
            <div>
              <span className="eyebrow">EL MOMENTO DE REGALAR</span>
              <h2>Lo que queda es el gesto.</h2>
            </div>
            <p>Cada pieza se entrega en su estuche, lista para regalar. Vos elegís; nosotros te ayudamos con el resto.</p>
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
            <h2>
              Su nombre,
              <br />
              grabado en Plata 925.
            </h2>
            <p>
              Nombres, iniciales y fechas en cadenas, medallas, anillos y pulseras. Los grabados se hacen a
              pedido: consultá los plazos para tenerlo antes del 18.
            </p>
            <a href="#" className="btn btn-olive js-wa" data-msg="Hola! Quiero encargar un grabado para el Día de la Madre">
              ENCARGAR UN GRABADO
            </a>
          </div>
        </section>

        {/* VISITANOS */}
        <section className="visit" id="visitanos">
          <div className="visit-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/regalos-dia-de-la-madre/img/post1-sw-01-0.jpg" alt="Mamá sonriendo con joyas de Levin" loading="lazy" />
          </div>
          <div className="visit-text">
            <span className="eyebrow">VISITANOS</span>
            <h2>¿No sabés cuál elegir?</h2>
            <p>Pasá por el local y te ayudamos a encontrar la pieza justa. Más de 50 años asesorando a las familias de Paraná.</p>
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
              <summary>¿Cómo sé la medida de anillo de mi mamá?</summary>
              <p>Podés traernos un anillo que ella use y lo medimos en el momento.</p>
            </details>
            <details>
              <summary>¿Con cuánta anticipación encargo un grabado?</summary>
              <p>[PLAZO A CONFIRMAR]. Consultanos con tiempo para tenerlo antes del domingo 18 de octubre.</p>
            </details>
            <details>
              <summary>¿Qué medios de pago aceptan?</summary>
              <p>[MEDIOS DE PAGO — A CONFIRMAR]</p>
            </details>
            <details>
              <summary>¿Puedo consultar por WhatsApp antes de ir?</summary>
              <p>Sí. Mandanos la foto o el nombre de la pieza y te respondemos con disponibilidad.</p>
            </details>
          </div>
        </section>
      </main>

      <Script src="/regalos-dia-de-la-madre/script.js" strategy="afterInteractive" />
    </div>
  );
}
