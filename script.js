/* ============================================================
   PÁGINA OMAR — JavaScript (ES6+)
   - Menú móvil
   - Animaciones reveal al hacer scroll
   - Validación del formulario de contacto
   - Modal de éxito
   ============================================================ */

'use strict';

/* ---------- Referencias de elementos ---------- */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');

const contactForm = document.getElementById('contactForm');
const errorNombre = document.getElementById('errorNombre');
const errorWhatsapp = document.getElementById('errorWhatsapp');
const errorMensaje = document.getElementById('errorMensaje');

const successModal = document.getElementById('successModal');
const modalClose = document.getElementById('modalClose');

/* ---------- Menú móvil ---------- */
function closeMenu() {
  navMenu.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Abrir menú');
}

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

navMenu.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

/* ---------- Scroll: navbar + animaciones reveal ---------- */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

const navbarObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      navbar.classList.toggle('scrolled', entry.isIntersecting);
    });
  },
  { threshold: 0.1 }
);
navbarObserver.observe(navbar);

/* ---------- Validación del formulario ---------- */
function setError(input, errorElement, isValid, message) {
  if (!isValid) {
    errorElement.textContent = message;
  } else {
    errorElement.textContent = '';
  }
}

function validateForm() {
  let valid = true;

  const nombre = document.getElementById('nombre');
  const nombreValido = nombre.value.trim().length >= 3;
  setError(nombre, errorNombre, nombreValido, 'Por favor, escribe tu nombre (mín. 3 caracteres).');
  if (!nombreValido) valid = false;

  const whatsapp = document.getElementById('whatsapp');
  const whatsappValido = /^[0-9+\-\s()]{8,}$/.test(whatsapp.value.trim());
  setError(whatsapp, errorWhatsapp, whatsappValido, 'Por favor, escribe un número válido de WhatsApp.');
  if (!whatsappValido) valid = false;

  const mensaje = document.getElementById('mensaje');
  const mensajeValido = mensaje.value.trim().length >= 10;
  setError(mensaje, errorMensaje, mensajeValido, 'Por favor, escribe un mensaje (mín. 10 caracteres).');
  if (!mensajeValido) valid = false;

  return valid;
}

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  // Simulación del envío de la cita
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando…';

  setTimeout(() => {
    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar Mensaje';
    successModal.classList.add('active');
    successModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }, 900);
});

function closeModal() {
  successModal.classList.remove('active');
  successModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

successModal.addEventListener('click', (event) => {
  if (event.target === successModal) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

/* ---------- Cierre del menú al redimensionar a escritorio ---------- */
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    closeMenu();
  }
});
