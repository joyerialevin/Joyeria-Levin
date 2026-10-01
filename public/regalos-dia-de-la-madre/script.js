// ===== Joyería Levin — Guía Día de la Madre =====

// 1) NÚMERO DE WHATSAPP: código de país + área + número, sin espacios ni signos.
//    Ejemplo: '5493434123456'
const WHATSAPP = '5493434728312';

// 2) PRODUCTOS DE LA GUÍA
//    Para sumar, sacar o cambiar fotos, editá esta lista.
//    cat: oro | plata | cristales | personalizados | relojes
const PRODUCTOS = [
  {
    cat: 'oro', tag: 'ORO 18K', destacado: true,
    titulo: 'Conjunto con dije de nenito',
    texto: 'Cadena, anillo y dos pulseras en oro 18k. Sus hijos, siempre con ella.',
    fotos: ['post6-ninosoro.jpg', 'post6-ninosoro-1.jpg', 'post6-ninosoro-2.jpg', 'post6-ninosoro-3.jpg']
  },
  {
    cat: 'oro', tag: 'ORO 18K',
    titulo: 'Oro blanco y amarillo',
    texto: 'Los dos tonos del oro 18k, pensados para usarse juntos.',
    fotos: ['post8-1.jpg']
  },
  {
    cat: 'oro', tag: 'ORO 18K',
    titulo: 'Oro 18k para vestir',
    texto: 'Piezas en oro para acompañar sus días más elegantes.',
    fotos: ['post7-formal1.jpg', 'post7-formal3.jpg']
  },
  {
    cat: 'plata', tag: 'PLATA 925',
    titulo: 'Conjunto de perlas',
    texto: 'Perlas y plata 925: el clásico que nunca pasa de moda.',
    fotos: ['post3-perlas-1.jpg', 'post3-perlas-2.jpg', 'post3-perlas-3.jpg', 'post3-perlas-4.jpg']
  },
  {
    cat: 'cristales', tag: 'CRISTALES SWAROVSKI',
    titulo: 'Conjunto Swarovski rosado',
    texto: 'Aros y dije con cristales Swarovski en rosa. Delicado y femenino.',
    fotos: ['post1-sw-01-0.jpg', 'post1-sw-01-7.jpg', 'post1-sw-01-8.jpg', 'post1-sw-01-5.jpg', 'post1-sw-01-6.jpg', 'post1-sw-01-1.jpg']
  },
  {
    cat: 'personalizados', tag: 'PERSONALIZADOS',
    titulo: 'Dijes para grabar',
    texto: 'Su nombre, o el de sus hijos, grabado en plata u oro.',
    fotos: ['post2-personalizado-1.jpg', 'post2-personalizado-2.jpg', 'post2-personalizado-3.jpg']
  },
  {
    cat: 'relojes', tag: 'RELOJES',
    titulo: 'Relojes para Mamá',
    texto: 'Los nuevos ingresos de Citizen y Festina para mujer, para usar todos los días.',
    fotos: [
      'reloj-mama-REL-0021.jpg', 'reloj-mama-REL-0022.jpg', 'reloj-mama-REL-0023.jpg',
      'reloj-mama-REL-0024.jpg', 'reloj-mama-REL-0025.jpg', 'reloj-mama-REL-0026.jpg',
      'reloj-mama-REL-0027.jpg', 'reloj-mama-REL-0028.jpg', 'reloj-mama-REL-0029.jpg',
      'reloj-mama-REL-0030.jpg', 'reloj-mama-REL-0031.jpg', 'reloj-mama-REL-0032.jpg',
      'reloj-mama-REL-0033.jpg', 'reloj-mama-REL-0034.jpg', 'reloj-mama-REL-0037.jpg',
      'reloj-mama-REL-0038.jpg', 'reloj-mama-REL-0039.jpg', 'reloj-mama-REL-0040.jpg'
    ]
  }
];

// ---------- A partir de acá no hace falta tocar nada ----------

function waLink(msg) {
  return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg);
}

// Links de WhatsApp de toda la página
document.querySelectorAll('.js-wa').forEach(function (a) {
  a.href = waLink(a.dataset.msg || 'Hola!');
  a.target = '_blank';
  a.rel = 'noopener';
});

// Tarjetas con galería
const grid = document.getElementById('grid');
const iconPrev = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#26261f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>';
const iconNext = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#26261f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>';

PRODUCTOS.forEach(function (p) {
  const card = document.createElement('article');
  card.className = 'card';
  card.dataset.cat = p.cat;
  const multi = p.fotos.length > 1;
  card.innerHTML =
    '<div class="card-media">' +
      '<img src="/regalos-dia-de-la-madre/img/' + p.fotos[0] + '" alt="' + p.titulo + '" loading="lazy">' +
      (p.destacado ? '<span class="badge">PIEZA DE LA TEMPORADA</span>' : '') +
      (multi ?
        '<button type="button" class="arrow arrow-prev" aria-label="Foto anterior">' + iconPrev + '</button>' +
        '<button type="button" class="arrow arrow-next" aria-label="Foto siguiente">' + iconNext + '</button>' +
        '<span class="counter">1 / ' + p.fotos.length + '</span>' : '') +
    '</div>' +
    '<div><span class="card-tag">' + p.tag + '</span><h3>' + p.titulo + '</h3><p>' + p.texto + '</p></div>' +
    '<a class="card-link" href="' + waLink('Hola! Quiero consultar por: ' + p.titulo) + '" target="_blank" rel="noopener">CONSULTAR</a>';

  if (multi) {
    let i = 0;
    const img = card.querySelector('img');
    const counter = card.querySelector('.counter');
    const go = function (d) {
      i = (i + d + p.fotos.length) % p.fotos.length;
      img.src = '/regalos-dia-de-la-madre/img/' + p.fotos[i];
      counter.textContent = (i + 1) + ' / ' + p.fotos.length;
    };
    card.querySelector('.arrow-prev').addEventListener('click', function () { go(-1); });
    card.querySelector('.arrow-next').addEventListener('click', function () { go(1); });
    // Deslizar con el dedo en el celular
    let x0 = null;
    const media = card.querySelector('.card-media');
    media.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    media.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      x0 = null;
    });
  }
  grid.appendChild(card);
});

// Filtros
document.querySelectorAll('.tab').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const cat = btn.dataset.cat;
    document.querySelectorAll('.tab').forEach(function (b) {
      const on = b === btn;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    grid.querySelectorAll('.card').forEach(function (c) {
      c.hidden = !(cat === 'todo' || c.dataset.cat === cat);
    });
  });
});

// Cuenta regresiva al 18 de octubre
(function () {
  const el = document.getElementById('countdown');
  const days = Math.ceil((new Date('2026-10-18T00:00:00-03:00') - new Date()) / 86400000);
  if (days > 0) {
    el.textContent = days === 1 ? 'FALTA 1 DÍA' : 'FALTAN ' + days + ' DÍAS';
    el.hidden = false;
  }
})();
