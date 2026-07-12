const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const year = document.querySelector('#year');
const revealItems = document.querySelectorAll('.reveal, .reveal-group > *');
const statNumbers = document.querySelectorAll('[data-count]');
const lightbox = document.querySelector('#lightbox');
const lightboxImg = lightbox?.querySelector('img');
const lightboxClose = document.querySelector('.lightbox-close');
const contactForm = document.querySelector('#contactForm');

if (year) year.textContent = new Date().getFullYear();

const getValue = (source, path) => path.split('.').reduce((value, key) => value?.[key], source);

const hydrateEditableContent = async () => {
  try {
    const response = await fetch('content/site.json', { cache: 'no-store' });
    if (!response.ok) return;
    const content = await response.json();

    document.querySelectorAll('[data-content]').forEach((element) => {
      const value = getValue(content, element.dataset.content);
      if (typeof value === 'string' && value.trim()) element.textContent = value;
    });

    if (Array.isArray(content.programs)) {
      document.querySelectorAll('.program-card').forEach((card, index) => {
        const program = content.programs[index];
        if (!program) return;
        const title = card.querySelector('h3');
        const description = card.querySelector('p');
        if (program.title && title) title.textContent = program.title;
        if (program.description && description) description.textContent = program.description;
      });
    }
  } catch (error) {
    // Keep the static HTML fallback if the content file is unavailable.
  }
};

hydrateEditableContent();

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealItems.forEach((item) => revealObserver.observe(item));

const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value);

const animateCount = (element) => {
  const target = Number(element.dataset.count);
  const duration = 1200;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = formatNumber(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.45 });

statNumbers.forEach((number) => statObserver.observe(number));

const sectionNavItems = [...navItems].filter((link) => link.getAttribute('href')?.startsWith('#'));
const sections = [...document.querySelectorAll('main section[id]')];
if (sectionNavItems.length) {
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionNavItems.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach((section) => activeObserver.observe(section));
}

const openLightbox = (img) => {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

document.querySelectorAll('.gallery-grid img, .story-grid img, .children-collage img').forEach((img) => {
  img.addEventListener('click', () => openLightbox(img));
});

const closeLightbox = () => {
  if (!lightbox || !lightboxImg) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
  document.body.style.overflow = '';
};

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`Website inquiry: ${data.get('interest')}`);
  const body = encodeURIComponent(
    `Name: ${data.get('name')}\nContact: ${data.get('contact')}\nInterest: ${data.get('interest')}\n\nMessage:\n${data.get('message')}`
  );
  window.location.href = `mailto:info@wnhri.org?subject=${subject}&body=${body}`;
});
