const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const year = document.querySelector('#year');
const statNumbers = document.querySelectorAll('[data-count]');
const lightbox = document.querySelector('#lightbox');
const lightboxImg = lightbox?.querySelector('img');
const lightboxClose = document.querySelector('.lightbox-close');
const contactForm = document.querySelector('#contactForm');
const backToTopLinks = document.querySelectorAll('.back-to-top');

if (year) year.textContent = new Date().getFullYear();

const getValue = (source, path) => path.split('.').reduce((value, key) => value?.[key], source);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

const observeRevealItems = (root = document) => {
  root.querySelectorAll('.reveal, .reveal-group > *').forEach((item) => {
    revealObserver.observe(item);
  });
};

observeRevealItems();

const fetchJson = async (path) => {
  try {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
};

const getImageSource = (asset) => {
  if (typeof asset === 'string') return asset.trim();
  if (asset && typeof asset.image === 'string') return asset.image.trim();
  return '';
};

const applyImage = (element, asset) => {
  if (!element) return;
  const source = getImageSource(asset);
  if (source) element.src = source;
  if (asset && typeof asset === 'object' && typeof asset.alt === 'string') {
    element.alt = asset.alt;
  }
};

const applyImageToAll = (selector, asset) => {
  document.querySelectorAll(selector).forEach((element) => applyImage(element, asset));
};

const applyBackground = (selector, asset) => {
  const source = getImageSource(asset);
  if (!source) return;
  const safeSource = source.replace(/"/g, '%22');
  document.querySelectorAll(selector).forEach((element) => {
    element.style.setProperty('--cms-background-image', `url("${safeSource}")`);
  });
};

const applyCaptionedImage = (figure, asset) => {
  if (!figure || !asset) return;
  applyImage(figure.querySelector('img'), asset);
  const caption = figure.querySelector('figcaption');
  if (caption && typeof asset.caption === 'string') caption.textContent = asset.caption;
};

const hydrateImages = (images) => {
  const logo = getValue(images, 'branding.logo');
  applyImageToAll('img[src*="assets/logo.png"]', logo);

  const logoSource = getImageSource(logo);
  if (logoSource) {
    document.querySelectorAll('link[rel~="icon"]').forEach((link) => {
      link.href = logoSource;
    });
    const socialPreview = document.querySelector('meta[property="og:image"]');
    if (socialPreview) socialPreview.content = new URL(logoSource, window.location.href).href;
  }

  applyImage(document.querySelector('.hero > .hero-image'), getValue(images, 'home.hero'));

  const homeCollage = document.querySelector('.about-section .image-collage');
  applyImage(homeCollage?.querySelector('.collage-main'), getValue(images, 'home.aboutCollage.main'));
  applyImage(homeCollage?.querySelector('.collage-tall'), getValue(images, 'home.aboutCollage.tall'));
  applyImage(homeCollage?.querySelector('.collage-small'), getValue(images, 'home.aboutCollage.small'));

  const childFigures = document.querySelectorAll('.children-collage > figure');
  const childAssets = [
    getValue(images, 'home.childrenCollage.featured'),
    getValue(images, 'home.childrenCollage.top'),
    getValue(images, 'home.childrenCollage.bottom'),
    getValue(images, 'home.childrenCollage.floating')
  ];
  childFigures.forEach((figure, index) => applyCaptionedImage(figure, childAssets[index]));

  applyBackground('.identity-card:not(.light)', getValue(images, 'home.missionBackground'));
  applyBackground('.identity-card.light', getValue(images, 'home.visionBackground'));

  const aboutCollage = document.querySelector('.about-intro .image-collage');
  applyImage(aboutCollage?.querySelector('.collage-main'), getValue(images, 'about.collage.main'));
  applyImage(aboutCollage?.querySelector('.collage-tall'), getValue(images, 'about.collage.tall'));
  applyImage(aboutCollage?.querySelector('.collage-small'), getValue(images, 'about.collage.small'));
  applyBackground('.vision-card', getValue(images, 'about.visionBackground'));
  applyBackground('.mission-card', getValue(images, 'about.missionBackground'));

  applyBackground('.subpage-hero:not(.donate-hero)', getValue(images, 'shared.subpageHero'));
  applyBackground('.donate-hero', getValue(images, 'donate.hero'));
  applyImage(document.querySelector('#in-person .giving-card-image'), getValue(images, 'donate.inPerson'));
  applyImage(document.querySelector('#mobile-money .giving-card-image'), getValue(images, 'donate.mobileMoney'));
  applyImage(document.querySelector('#bank .giving-card-image'), getValue(images, 'donate.bank'));

  const socialIcons = {
    instagram: 'img[src*="assets/social/instagram.jpg"]',
    email: 'img[src*="assets/social/email.jpg"]',
    maps: 'img[src*="assets/social/maps.jpg"]',
    tiktok: 'img[src*="assets/social/tiktok.jpg"]',
    whatsapp: 'img[src*="assets/social/whatsapp.jpg"]',
    phone: 'img[src*="assets/social/phone.jpg"]'
  };

  Object.entries(socialIcons).forEach(([name, selector]) => {
    applyImageToAll(selector, getValue(images, `socialIcons.${name}`));
  });
};

const createHighlight = (item) => {
  const figure = document.createElement('figure');
  if (item.layout === 'large') figure.classList.add('gallery-large');

  const image = document.createElement('img');
  image.src = getImageSource(item);
  image.alt = item.alt || '';
  image.loading = 'lazy';
  image.decoding = 'async';

  const caption = document.createElement('figcaption');
  caption.textContent = item.caption || '';

  figure.append(image, caption);
  return figure;
};

const createStory = (item) => {
  const figure = document.createElement('figure');
  figure.classList.add('story-card');
  if (item.layout === 'wide') figure.classList.add('story-wide');
  if (item.layout === 'tall') figure.classList.add('story-tall');

  const image = document.createElement('img');
  image.src = getImageSource(item);
  image.alt = item.alt || '';
  image.loading = 'lazy';
  image.decoding = 'async';

  const caption = document.createElement('figcaption');
  const title = document.createElement('strong');
  title.textContent = item.title || '';
  const details = document.createElement('span');
  details.textContent = item.caption || '';
  caption.append(title, details);

  figure.append(image, caption);
  return figure;
};

const renderGallery = (gallery) => {
  if (Array.isArray(gallery.highlights)) {
    document.querySelectorAll('.gallery-grid').forEach((container) => {
      const isHomePreview = Boolean(container.closest('#gallery'));
      const items = isHomePreview ? gallery.highlights.slice(0, 5) : gallery.highlights;
      container.replaceChildren(...items.filter((item) => getImageSource(item)).map(createHighlight));
      observeRevealItems(container.parentElement || container);
    });
  }

  if (Array.isArray(gallery.stories)) {
    document.querySelectorAll('.story-grid').forEach((container) => {
      const items = gallery.stories.filter((item) => getImageSource(item));
      container.replaceChildren(...items.map(createStory));
      observeRevealItems(container.parentElement || container);
    });
  }
};

const hydrateEditableContent = async () => {
  const [content, images, gallery] = await Promise.all([
    fetchJson('/content/site.json'),
    fetchJson('/content/images.json'),
    fetchJson('/content/gallery.json')
  ]);

  if (content) {
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
  }

  if (images) hydrateImages(images);
  if (gallery) renderGallery(gallery);
};

hydrateEditableContent();

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.toggle('open') || false;
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    navToggle?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

backToTopLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.replaceState(null, '', window.location.pathname + window.location.search);
  });
});

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

const openLightbox = (image) => {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = image.currentSrc || image.src;
  lightboxImg.alt = image.alt;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

document.addEventListener('click', (event) => {
  const image = event.target.closest?.('.gallery-grid img, .story-grid img, .children-collage img');
  if (image) openLightbox(image);
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
