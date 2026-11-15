/* =========================================================================
   MOMENTOS & REGALOS — Lógica de la tienda
   Sin carrito ni pasarela: cada producto se solicita directo por WhatsApp.
   Módulos: CONFIG · DATOS · ILUSTRACIONES · UTILIDADES · CATÁLOGO ·
            DETALLES · CONTACTO · INICIO
   ========================================================================= */

/* ---------- CONFIG: datos del negocio (EDITAR AQUÍ) ---------- */
const CONFIG = {
  whatsapp: '51935007861',   // 51 + número, sin "+" ni espacios
  instagram: '',             // Pega aquí el enlace de tu Instagram, ej.: 'https://www.instagram.com/tu_cuenta'
  tiktok: ''                 // Pega aquí el enlace de tu TikTok, ej.: 'https://www.tiktok.com/@tu_cuenta'
};

/* ---------- DATOS: ocasiones y boxes (del brochure) ---------- */
const OCCASIONS = [
  { id: 'cumpleanos', name: 'Cumpleaños' },
  { id: 'aniversario', name: 'Aniversario' },
  { id: 'graduacion', name: 'Graduación' }
];

/* Para agregar un box: copia un bloque, cambia los datos y sube su foto a /img.
   stock: 'ok' = Disponible · 'out' = Agotado (se oculta el botón de solicitar) */
const BOXES = [
  { id: 'cumpleanero-1', occ: 'cumpleanos', code: 'Box Cumpleañero 1', name: 'Fiesta Dorada', tarjeta: true, price: 49, stock: 'ok', featured: 1,
    desc: 'Dulces, sorpresas y globos para celebrar en grande.',
    img: 'img/box-cumpleanero-1.webp', alt: 'Box Fiesta Dorada con globos dorados de cumpleaños, papas Inka Chips, chocolates y cerveza Coronita',
    items: [[1, 'Papas Inka Chips Nativas 135 g'], [1, 'Chocolate Obsesión'], [1, 'Chocolate Vizzio Costa 72 g'], [1, 'Chocolate Cañonazo'], [1, 'Bombón Bon o Bon de leche 15 g'], [1, 'Cerveza Coronita']] },
  { id: 'cumpleanero-2', occ: 'cumpleanos', code: 'Box Cumpleañero 2', name: 'Stitch Party', tarjeta: true, price: 79, stock: 'ok', featured: 2,
    desc: 'Ternura, dulzura y diversión en un solo detalle.',
    img: 'img/box-cumpleanero-2.webp', alt: 'Box Stitch Party: caja de madera grabada con peluche de Stitch, globos de estrella dorados, Inka Chips, Pilsen, Oreo, chocolates y tarjeta con código QR',
    items: [[1, 'Peluche Stitch 27 cm'], [1, 'Cerveza Pilsen lata 355 ml'], [1, 'Papas Inka Chips Jalapeño 135 g'], [1, 'Chocolate La Ibérica Milky'], [1, 'Wafer Costa Nik chocolate 72 g'], [1, 'Galletas Oreo Original 135 g']] },
  { id: 'cumpleanero-3', occ: 'cumpleanos', code: 'Box Cumpleañero 3', name: 'Burbuja de Rosas', price: 45, stock: 'ok', featured: 3,
    desc: 'Flores, chocolates y tu mensaje dentro de una burbuja.',
    img: 'img/box-cumpleanero-3.webp', alt: 'Box Burbuja de Rosas: caja de corazón con rosas rosadas, bombones Ferrero Rocher y globo burbuja con nombre',
    items: [[12, 'Rosas de foami'], [9, 'Bombones Ferrero Rocher'], [2, 'Chocolates Hershey’s Cookies ’n’ Creme 43 g']] },
  { id: 'cumpleanero-4', occ: 'cumpleanos', code: 'Box Cumpleañero 4', name: 'Dulce Antojo', price: 49, stock: 'ok',
    desc: 'Pequeños antojos que hacen grandes momentos.',
    img: 'img/box-cumpleanero-4.webp', alt: 'Box Dulce Antojo en ramo morado con fotos personalizadas, Pringles, gomitas Trululú y chocolate Hershey’s',
    items: [[1, 'Chocolate Hershey’s con leche 82 g'], [1, 'Gomitas Trululú surtidas'], [1, 'Papas Pringles Original lata 104 g']] },
  { id: 'cumpleanero-5', occ: 'cumpleanos', code: 'Box Cumpleañero 5', name: 'Brindis Rosé', tarjeta: true, price: 55, stock: 'ok',
    desc: 'Para brindar, compartir y crear recuerdos.',
    img: 'img/box-cumpleanero-5.webp', alt: 'Box Brindis Rosé: caja rosada con rosas, vino rosé en lata, Ferrero Rocher y mix de arándanos',
    items: [[1, 'Vino Viña Vieja Rosé lata 355 ml'], [1, 'Bombones Ferrero Rocher caja 50 g'], [1, 'Mix de arándanos Granuts 160 g']] },
  { id: 'cumpleanero-6', occ: 'cumpleanos', code: 'Box Cumpleañero 6', name: 'Hincha Blanquiazul', tarjeta: true, price: 55, stock: 'ok',
    desc: 'Para el hincha de corazón: pasión, dulzura y fútbol.',
    img: 'img/box-cumpleanero-6.webp', alt: 'Box Hincha Blanquiazul con peluche de Alianza Lima, globo de camiseta, cerveza, chocolate y papas',
    items: [[1, 'Peluche Alianza Lima 20 cm'], [1, 'Cerveza Pilsen lata 355 ml'], [1, 'Chocolate Costa Vizzio 63 g'], [1, 'Papas Inka Chips Nativas 135 g']] },
  { id: 'aniversario-1', occ: 'aniversario', code: 'Box Aniversario 1', name: 'Corazón Eterno', price: 45, stock: 'ok', featured: 4,
    desc: 'Amor que se guarda: rosas eternas y tus fotos favoritas.',
    img: 'img/box-aniversario-1.webp', alt: 'Box Corazón Eterno: caja en forma de corazón con rosas eternas, Ferrero Rocher, fotos y globo Te Amo',
    items: [[17, 'Rosas eternas'], [2, 'Fotografías personalizadas'], [6, 'Bombones Ferrero Rocher']] },
  { id: 'aniversario-2', occ: 'aniversario', code: 'Box Aniversario 2', name: 'Panda Lover', tarjeta: true, price: 69, stock: 'ok',
    desc: 'Ternura y un brindis para tu persona favorita.',
    img: 'img/box-aniversario-2.webp', alt: 'Box Panda Lover: sombrerera negra con oso panda de peluche, vino rosé, Ferrero Rocher y globo Feliz Aniversario',
    items: [[1, 'Oso panda de peluche 22 cm'], [1, 'Bombones Ferrero Rocher caja 50 g'], [1, 'Vino Rosé Tabernero 750 ml']] },
  { id: 'graduacion-1', occ: 'graduacion', code: 'Box Graduación 1', name: 'Meta Cumplida', price: 79, stock: 'ok',
    desc: 'Celebra el esfuerzo y el gran logro.',
    img: 'img/box-graduacion-1.webp', alt: 'Box Meta Cumplida con oso graduado de peluche, globo Felicidades Graduado, rosas blancas, papas y cerveza',
    items: [[1, 'Oso graduado de peluche 22 cm'], [1, 'Chocolate La Ibérica Milky Pecanas sin azúcar 100 g'], [1, 'Papas Inka Chips Nativas 135 g'], [1, 'Cerveza Coronita']] }
];

/* Regalos digitales (precios de referencia: ajústalos a los tuyos) */
const DIGITAL = [
  { id: 'tarjeta-animada', code: 'Regalo digital', name: 'Tarjeta digital animada', price: 12.9, art: 'card', video: 'video/tarjeta-digital-animada.mp4', poster: 'video/tarjeta-digital-animada.webp',
    desc: 'Tarjeta con animación, foto y mensaje. La recibes por WhatsApp en 24 h.',
    items: [[1, 'Diseño animado personalizado'], [3, 'Fotos como máximo'], [1, 'Mensaje de hasta 300 caracteres']] },
  { id: 'video-dedicatoria', code: 'Regalo digital', name: 'Video dedicatoria con fotos', price: 24.9, art: 'video', video: 'video/video-dedicatoria.mp4', poster: 'video/video-dedicatoria.webp',
    desc: 'Video de 1 minuto con tus fotos, música y mensajes.',
    items: [[1, 'Video de hasta 60 segundos'], [15, 'Fotos como máximo'], [1, 'Música y textos a tu elección']] },
  { id: 'carta-qr', code: 'Regalo digital', name: 'Carta secreta con QR', price: 9.9, art: 'qr', video: 'video/carta-secreta-qr.mp4', poster: 'video/carta-secreta-qr.webp',
    desc: 'Una carta digital que se abre al escanear un código QR impreso.',
    items: [[1, 'Página privada con tu carta'], [1, 'Código QR listo para imprimir'], [1, 'Entrega en 24 horas por WhatsApp']] }
];

/* ---------- ILUSTRACIONES: regalos digitales (SVG, sin peticiones) ---------- */
function phoneArt(kind) {
  const C = { vino: '#8B0000', oro: '#D4AF37', crema: '#FFF7E6', tinta: '#2B1512', bg: '#F6EAD2', wa: '#1F8F4E' };
  const heart = (x, y, s, f) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 3C-6-3-12 2-6 8L0 14 6 8C12 2 6-3 0 3Z" fill="${f}"/>`;
  const star = (cx, cy, r, f, op = 1) => {
    const p = [];
    for (let i = 0; i < 10; i++) { const a = Math.PI / 5 * i - Math.PI / 2, rr = i % 2 ? r * .45 : r; p.push((cx + rr * Math.cos(a)).toFixed(1) + ',' + (cy + rr * Math.sin(a)).toFixed(1)); }
    return `<polygon points="${p.join(' ')}" fill="${f}" opacity="${op}"/>`;
  };
  let screen = '';
  if (kind === 'qr') {
    let q = '';
    for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
      const on = ((r * 7 + c * 13 + r * c) % 5) < 2 || (r < 3 && c < 3) || (r < 3 && c > 5) || (r > 5 && c < 3);
      if (on) q += `<rect x="${163 + c * 8.2}" y="${100 + r * 8.2}" width="7.4" height="7.4" fill="${C.tinta}"/>`;
    }
    screen = `<rect x="156" y="92" width="88" height="88" rx="6" fill="#fff"/>${q}<rect x="166" y="188" width="68" height="6" rx="3" fill="${C.vino}" opacity=".7"/>`;
  } else if (kind === 'video') {
    screen = `<rect x="156" y="80" width="88" height="114" rx="8" fill="${C.vino}"/><circle cx="200" cy="137" r="22" fill="#fff" opacity=".92"/><path d="M193 125l18 12-18 12Z" fill="${C.vino}"/><rect x="164" y="180" width="72" height="4" rx="2" fill="#fff" opacity=".4"/><rect x="164" y="180" width="30" height="4" rx="2" fill="${C.oro}"/>`;
  } else {
    screen = `<rect x="156" y="80" width="88" height="114" rx="8" fill="${C.vino}"/>${heart(200, 112, 2.2, C.oro)}<rect x="170" y="160" width="60" height="6" rx="3" fill="${C.crema}"/><rect x="180" y="172" width="40" height="5" rx="2.5" fill="${C.crema}" opacity=".7"/>${star(172, 98, 5, C.oro, .8)}${star(230, 150, 4, C.oro, .7)}`;
  }
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de un celular con el regalo digital">
    <rect width="400" height="300" fill="${C.bg}"/>
    <circle cx="200" cy="150" r="120" fill="${C.oro}" opacity=".12"/>
    ${star(70, 70, 10, C.oro, .6)}${star(330, 220, 12, C.oro, .5)}${heart(320, 64, 1.2, C.vino)}${heart(86, 210, 1, C.vino)}
    <ellipse cx="200" cy="272" rx="74" ry="7" fill="#000" opacity=".12"/>
    <rect x="140" y="34" width="120" height="232" rx="20" fill="${C.tinta}"/>
    <rect x="148" y="50" width="104" height="200" rx="10" fill="${C.crema}"/>
    <rect x="184" y="40" width="32" height="5" rx="2.5" fill="#000" opacity=".4"/>
    ${screen}
    <rect x="160" y="212" width="80" height="24" rx="12" fill="${C.wa}"/><rect x="176" y="222" width="48" height="4" rx="2" fill="#fff"/>
  </svg>`;
}

/* ---------- UTILIDADES ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money = n => 'S/ ' + Number(n).toFixed(2);
const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const waLink = text => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
const occName = id => (OCCASIONS.find(o => o.id === id) || {}).name || '';
const findProduct = id => BOXES.find(p => p.id === id) || DIGITAL.find(p => p.id === id);
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } }
};

/* Mensajes de WhatsApp */
const WA_TEXT = {
  general: 'Hola Momentos & Regalos, quisiera información sobre sus boxes.',
  custom: 'Hola Momentos & Regalos, quiero pedir un box a medida.\n\nOcasión:\nPresupuesto:\nFecha de entrega:\nIdeas o productos que me gustaría incluir:'
};
function productMessage(p) {
  return [
    `Hola Momentos & Regalos, quiero solicitar:`,
    `${p.code.toUpperCase()} – ${p.name}`,
    `Precio: ${money(p.price)}`,
    `¿Está disponible?`
  ].join('\n');
}

function toast(msg) {
  const el = document.createElement('div');
  el.className = 'toast'; el.textContent = msg;
  $('#toasts').appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 320); }, 2600);
}
async function copyText(text, fallbackEl) {
  try { await navigator.clipboard.writeText(text); toast('Copiado'); }
  catch (e) {
    if (fallbackEl) { const r = document.createRange(); r.selectNodeContents(fallbackEl); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
    toast('Selecciona el texto y cópialo manualmente');
  }
}
function setErr(key, msg) {
  const fld = $('#fld-' + key), err = $('#err-' + key), input = $('#' + key);
  if (fld) fld.classList.toggle('invalid', !!msg);
  if (err) err.textContent = msg || '';
  if (input) input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  return !msg;
}

/* Viñeta destacada para los boxes con tarjeta personalizable (campo tarjeta: true) */
const TARJETA_TEXT = 'Tarjeta personalizable: elige formato digital con código QR o formato físico impreso';
const tarjetaLi = p => p.tarjeta ? `<li class="tarjeta-li"><span class="q"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><use href="#i-card"/></svg></span><span>${TARJETA_TEXT}</span></li>` : '';

/* ---------- Componente: tarjeta de producto ---------- */
const WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><use href="#i-wa"/></svg>';
function productCard(p) {
  const isDigital = DIGITAL.includes(p);
  const media = isDigital ? digitalMedia(p, false) : `<img src="${p.img}" alt="${esc(p.alt)}" loading="lazy" decoding="async">`;
  const tag = isDigital ? 'Digital' : occName(p.occ);
  const shown = p.items.slice(0, 3), rest = p.items.length - shown.length;
  const out = p.stock === 'out';
  return `<article class="card">
    <button class="card-media" data-detail="${p.id}" aria-label="Ver detalles de ${esc(p.name)}">
      ${media}<span class="tag">${esc(tag)}</span>${isDigital && p.video ? '' : `<span class="price-badge">${money(p.price)}</span>`}
    </button>
    <div class="card-body">
      <p class="card-code">${esc(p.code)}</p>
      <h3>${esc(p.name)}</h3>
      <p class="card-desc">${esc(p.desc)}</p>
      <ul class="contents">${shown.map(([q, t]) => `<li><span class="q">${q}</span><span>${esc(t)}</span></li>`).join('')}${tarjetaLi(p)}</ul>
      ${rest > 0 ? `<p class="more">y ${rest} ${rest === 1 ? 'producto más' : 'productos más'}</p>` : ''}
      ${isDigital
        ? `<p class="includes"><span><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><use href="#i-wa"/></svg>Entrega por WhatsApp en 24 h</span></p>`
        : `<p class="includes">
            <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><use href="#i-gift"/></svg>Caja decorativa</span>
            <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><use href="#i-balloon"/></svg>Globos</span>
            <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><use href="#i-card"/></svg>Tarjeta</span>
          </p>`}
      <div class="card-foot">
        ${isDigital ? `<span class="digital-price">${money(p.price)}</span>` : `<span class="stock" ${out ? 'style="color:#B3261E"' : ''}>${out ? 'Agotado por ahora' : 'Disponible'}</span>`}
        <div class="card-actions">
          <button class="btn btn-ghost" data-detail="${p.id}">Ver detalles</button>
          ${out
            ? `<a class="btn btn-ghost" href="${waLink(`Hola, ¿cuándo vuelve a estar disponible el ${p.code} – ${p.name}?`)}" target="_blank" rel="noopener">Avísame</a>`
            : `<a class="btn btn-wa" href="${waLink(productMessage(p))}" target="_blank" rel="noopener">${WA_ICON}Solicitar por WhatsApp</a>`}
        </div>
      </div>
    </div>
  </article>`;
}

/* ---------- VIDEOS de regalos digitales ---------- */
/* En la tarjeta: se reproduce solo, sin sonido y en bucle. En el detalle: con controles y sonido. */
function digitalMedia(p, inModal) {
  if (!p.video) return phoneArt(p.art);
  return inModal
    ? `<video src="${p.video}" poster="${p.poster}" controls autoplay loop playsinline preload="auto" aria-label="Video de ejemplo: ${esc(p.name)}"></video>`
    : `<video src="${p.video}" poster="${p.poster}" muted autoplay loop playsinline preload="metadata" aria-label="Video de ejemplo: ${esc(p.name)}"></video>
       <span class="play-hint" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>Ver con sonido</span>`;
}
/* Reproduce solo los videos visibles en pantalla para ahorrar datos y batería */
let videoObserver = null;
function watchVideos() {
  const vids = $$('.card video');
  vids.forEach(v => { v.muted = true; });
  if (!('IntersectionObserver' in window)) { vids.forEach(v => v.play().catch(() => {})); return; }
  if (!videoObserver) videoObserver = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting && !$('#modal').classList.contains('open')) en.target.play().catch(() => {}); else en.target.pause();
  }), { threshold: 0.25 });
  vids.forEach(v => videoObserver.observe(v));
}
function playVisible() {
  $$('.card video').forEach(v => {
    const r = v.getBoundingClientRect();
    if (r.bottom > 0 && r.top < innerHeight) v.play().catch(() => {});
  });
}

/* ---------- CATÁLOGO ---------- */
const filters = { occ: store.get('mr_occ', 'all'), price: 'all', sort: 'relevance' };
/* Función pura: filtra y ordena los boxes */
function filterBoxes(list, f) {
  const out = list.filter(p => {
    if (f.occ !== 'all' && p.occ !== f.occ) return false;
    if (f.price !== 'all') { const [lo, hi] = f.price.split('-').map(Number); if (p.price < lo || p.price >= hi) return false; }
    return true;
  });
  if (f.sort === 'price-asc') out.sort((a, b) => a.price - b.price);
  if (f.sort === 'price-desc') out.sort((a, b) => b.price - a.price);
  return out;
}
function renderChips() {
  const all = [{ id: 'all', name: 'Todos' }, ...OCCASIONS];
  $('#cat-chips').innerHTML = all.map(o => {
    const n = o.id === 'all' ? BOXES.length : BOXES.filter(p => p.occ === o.id).length;
    return `<button class="chip" data-occ="${o.id}" aria-pressed="${filters.occ === o.id}">${esc(o.name)}<span class="n">${n}</span></button>`;
  }).join('');
}
function renderCatalog() {
  const list = filterBoxes(BOXES, filters);
  $('#catalog-grid').innerHTML = list.length ? list.map(productCard).join('') :
    `<div style="grid-column:1/-1;text-align:center;padding:48px 16px;border:1.5px dashed var(--linea);border-radius:var(--r-lg);color:var(--tinta-2)">
      <h3 style="margin-bottom:8px">No hay boxes en ese rango</h3><p>Prueba otro precio o pídenos uno a tu medida.</p>
      <div class="btn-row" style="justify-content:center;margin-top:16px"><button class="btn btn-ghost" data-reset>Ver todos</button>
      <a class="btn btn-wa" href="${waLink(WA_TEXT.custom)}" target="_blank" rel="noopener">${WA_ICON}Pedir box a medida</a></div></div>`;
  $('#result-count').textContent = `${list.length} ${list.length === 1 ? 'box' : 'boxes'}`;
  renderChips();
}
function renderDigital() { $('#digital-grid').innerHTML = DIGITAL.map(productCard).join(''); watchVideos(); }

/* ---------- DETALLES (modal) ---------- */
let lastFocus = null;
function openDetail(id) {
  const p = findProduct(id); if (!p) return;
  lastFocus = document.activeElement;
  const isDigital = DIGITAL.includes(p);
  $('#modal-media').innerHTML = isDigital ? digitalMedia(p, true) : `<img src="${p.img}" alt="${esc(p.alt)}">`;
  $('#modal-media').classList.toggle('is-video', !!(isDigital && p.video));
  $$('.card video').forEach(v => v.pause());
  $('#modal-info').innerHTML = `
    <p class="card-code">${esc(p.code)}${isDigital ? '' : ' · ' + esc(occName(p.occ))}</p>
    <h2 id="modal-title">${esc(p.name)}</h2>
    <p class="modal-price">${money(p.price)}</p>
    <p style="color:var(--tinta-2)">${esc(p.desc)}</p>
    <div><p class="lbl">${isDigital ? 'INCLUYE' : 'CONTENIDO'}</p>
      <ul class="contents">${p.items.map(([q, t]) => `<li><span class="q">${q}</span><span>${esc(t)}</span></li>`).join('')}${tarjetaLi(p)}</ul></div>
    ${isDigital ? '' : `<div><p class="lbl">ADEMÁS INCLUYE</p><p style="font-size:var(--t-sm)">Caja o base decorativa · Globos temáticos · Tarjeta con tu mensaje</p></div>`}
    <p class="modal-tip">${isDigital
      ? 'Activa el sonido en el video para escuchar un ejemplo. Después de solicitarlo, envíanos por WhatsApp las fotos y el mensaje. Lo recibes listo en 24 horas.'
      : 'Personalízalo: envíanos por WhatsApp el nombre, mensaje o fotos que quieras incluir. Delivery gratis en Huancayo, El Tambo y Chilca; otros distritos de Huancayo, Chupaca y Concepción: S/ 6.00.'}</p>
    ${p.stock === 'out'
      ? `<a class="btn btn-ghost btn-block" href="${waLink(`Hola, ¿cuándo vuelve a estar disponible el ${p.code} – ${p.name}?`)}" target="_blank" rel="noopener">Avísame cuando esté disponible</a>`
      : `<a class="btn btn-wa btn-block" href="${waLink(productMessage(p))}" target="_blank" rel="noopener">${WA_ICON}Solicitar por WhatsApp</a>`}`;
  $('#modal').classList.add('open'); $('#modal').setAttribute('aria-hidden', 'false'); $('#overlay').classList.add('show');
  document.body.style.overflow = 'hidden';
  setTimeout(() => $('#modal-close').focus(), 50);
}
function closeDetail() {
  $('#modal').classList.remove('open'); $('#modal').setAttribute('aria-hidden', 'true'); $('#overlay').classList.remove('show');
  document.body.style.overflow = '';
  $('#modal-media').innerHTML = '';
  playVisible();
  if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
}

/* ---------- CONTACTO ---------- */
function submitContact(e) {
  e.preventDefault();
  const name = $('#ct-name').value.trim(), topic = $('#ct-topic').value, msg = $('#ct-msg').value.trim();
  let ok = true;
  ok = setErr('ct-name', name.length < 2 ? 'Escribe tu nombre.' : '') && ok;
  ok = setErr('ct-topic', !topic ? 'Elige la ocasión o el motivo.' : '') && ok;
  ok = setErr('ct-msg', msg.length < 10 ? 'Cuéntanos un poco más (mínimo 10 caracteres).' : '') && ok;
  if (!ok) { const f = $('#contact-form .invalid input, #contact-form .invalid select, #contact-form .invalid textarea'); if (f) f.focus(); return; }
  const text = `Hola Momentos & Regalos, soy ${name}.\nOcasión: ${topic}\n\n${msg}`;
  $('#ct-preview').textContent = text;
  $('#ct-wa').href = waLink(text);
  $('#ct-confirm').hidden = false;
  toast('Mensaje listo. Tócalo para enviarlo por WhatsApp.');
}

/* ---------- INICIO ---------- */
function init() {
  $$('[data-wa]').forEach(a => { a.href = waLink(WA_TEXT[a.dataset.wa] || WA_TEXT.general); });
  if (CONFIG.instagram) $('#ig-link').href = CONFIG.instagram; else $('#ig-link').hidden = true;
  if (CONFIG.tiktok) $('#tt-link').href = CONFIG.tiktok; else $('#tt-link').hidden = true;
  if (!CONFIG.instagram && !CONFIG.tiktok) $('#ig-link').closest('.contact-line').hidden = true;
  $('#year').textContent = new Date().getFullYear();
  if (!['all', ...OCCASIONS.map(o => o.id)].includes(filters.occ)) filters.occ = 'all';

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-detail],[data-occ],[data-reset]');
    if (!t) return;
    if (t.dataset.detail) openDetail(t.dataset.detail);
    else if (t.dataset.occ) { filters.occ = t.dataset.occ; store.set('mr_occ', filters.occ); renderCatalog(); }
    else if ('reset' in t.dataset) { filters.occ = 'all'; filters.price = 'all'; $('#f-price').value = 'all'; renderCatalog(); }
  });
  $('#f-price').addEventListener('change', e => { filters.price = e.target.value; renderCatalog(); });
  $('#f-sort').addEventListener('change', e => { filters.sort = e.target.value; renderCatalog(); });

  $('#menu-btn').addEventListener('click', () => {
    const open = $('#main-nav').classList.toggle('open');
    $('#menu-btn').setAttribute('aria-expanded', open);
  });
  $$('#main-nav a').forEach(a => a.addEventListener('click', () => { $('#main-nav').classList.remove('open'); $('#menu-btn').setAttribute('aria-expanded', 'false'); }));

  $('#modal-close').addEventListener('click', closeDetail);
  $('#overlay').addEventListener('click', closeDetail);
  $('#modal').addEventListener('click', e => { if (e.target.id === 'modal') closeDetail(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && $('#modal').classList.contains('open')) closeDetail(); });

  $('#contact-form').addEventListener('submit', submitContact);
  ['ct-name', 'ct-topic', 'ct-msg'].forEach(id => $('#' + id).addEventListener('input', () => setErr(id, '')));
  $('#ct-copy').addEventListener('click', () => copyText($('#ct-preview').textContent, $('#ct-preview')));
  $('#copy-wa').addEventListener('click', () => copyText('935007861', $('#wa-display')));

  renderCatalog();
  renderDigital();
}
init();
