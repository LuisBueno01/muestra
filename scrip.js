// Scroll reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el));

// Plano switcher — 3 deptos + penthouse
const planos = {
  'depto1': {
    img: 'img/frenteizquierda.png',
    title: 'Depto 1 · Frente Izquierda',
    sub: '80 – 90 m² aprox. · Planta tipo',
    rooms: [
      ['1','Sala / Comedor Amplio','~22 m²'],
      ['2','Cocina Abierta','~10 m²'],
      ['3','Área de Lavado','~3 m²'],
      ['4','Recámara Principal c/ Clóset','~15 m²'],
      ['5','Baño Principal','~5 m²'],
      ['6','Recámara Secundaria','~12 m²'],
      ['7','Baño Secundario','~4 m²'],
      ['8','Balcón Frontal','~6 m²']
    ]
  },
  'depto2': {
    img: 'img/frentederecha.png',
    title: 'Depto 2 · Frente Derecha',
    sub: '80 – 90 m² aprox. · Planta tipo',
    rooms: [
      ['1','Sala / Comedor Amplio','~22 m²'],
      ['2','Cocina Abierta','~10 m²'],
      ['3','Área de Lavado','~3 m²'],
      ['4','Recámara Principal c/ Clóset','~15 m²'],
      ['5','Baño Principal','~5 m²'],
      ['6','Recámara Secundaria','~12 m²'],
      ['7','Baño Secundario','~4 m²'],
      ['8','Balcón Frontal','~6 m²']
    ]
  },
  'depto3': {
    img: 'img/centro.png',
    title: 'Depto 3 · Parte Trasera',
    sub: '75 – 85 m² aprox. · Planta tipo',
    rooms: [
      ['1','Sala / Comedor','~20 m²'],
      ['2','Cocina Abierta','~10 m²'],
      ['3','Área de Lavado','~3 m²'],
      ['4','Recámara Principal c/ Clóset','~14 m²'],
      ['5','Baño Principal','~5 m²'],
      ['6','Recámara Secundaria','~10 m²'],
      ['7','Baño Secundario','~4 m²'],
      ['8','Patio / Área de Servicio','~5 m²']
    ]
  },
  'penthouse': {
    img: 'img/penhause.jpg',
    title: 'Penthouse · Nivel 6',
    sub: '120 m² · 2 unidades exclusivas',
    rooms: [
      ['1','Sala / Comedor Premium','~30 m²'],
      ['2','Cocina Abierta Equipada','~12 m²'],
      ['3','Área de Lavado','~4 m²'],
      ['4','Recámara Principal c/ Walk-in Clóset','~20 m²'],
      ['5','Baño Principal Suite','~7 m²'],
      ['6','Recámara Secundaria','~14 m²'],
      ['7','Baño Secundario','~5 m²'],
      ['8','Terraza Privada','~25 m²']
    ]
  }
};

function showPlano(key, btn) {
  document.querySelectorAll('.planos-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const p = planos[key];
  const img = document.getElementById('plano-img');
  const title = document.getElementById('plano-title');
  const sub = document.getElementById('plano-sub');
  const list = document.getElementById('rooms-list');
  // Fade transition
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = p.img;
    img.style.opacity = '1';
  }, 200);
  img.style.transition = 'opacity 0.2s';
  title.textContent = p.title;
  if (sub) sub.textContent = p.sub;
  list.innerHTML = p.rooms.map(r =>
    `<div class="room-row">
      <div class="room-num">${r[0]}</div>
      <div class="room-name">${r[1]}</div>
      <div class="room-size">${r[2]}</div>
    </div>`
  ).join('');
}

// Form — envío por WhatsApp
function submitForm(e) {
  e.preventDefault();
  const form = e.target;

  const nombre   = form.querySelector('input[placeholder="Tu nombre completo"]').value.trim();
  const telefono = form.querySelector('input[type="tel"]').value.trim();
  const correo   = form.querySelector('input[type="email"]').value.trim();
  const unidad   = form.querySelectorAll('select')[0].value;
  const objetivo = form.querySelectorAll('select')[1].value;
  const mensaje  = form.querySelector('textarea').value.trim();

  if (!nombre || !telefono) {
    alert('Por favor ingresa tu nombre y teléfono.');
    return false;
  }

  const texto =
    `🏗️ *Edificio Abril 31 — Nueva Solicitud*\n\n` +
    `👤 *Nombre:* ${nombre}\n` +
    `📞 *Teléfono:* ${telefono}\n` +
    `✉️ *Correo:* ${correo || '—'}\n` +
    `🏠 *Unidad:* ${unidad}\n` +
    `🎯 *Objetivo:* ${objetivo}\n` +
    `💬 *Mensaje:* ${mensaje || '—'}`;

  const url = `https://wa.me/522291011390?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');

  // Feedback visual
  const btn = form.querySelector('.fsub');
  btn.textContent = '✓ Redirigiendo a WhatsApp…';
  btn.style.background = '#25D366';
  setTimeout(() => {
    btn.textContent = 'Enviar Solicitud';
    btn.style.background = '';
  }, 3000);

  return false;
}
