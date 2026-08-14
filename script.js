// ============================================
// STICKY NAVIGATION
// Meniul se micșorează când utilizatorul
// derulează pagina în jos
// ============================================

const nav = document.getElementById("siteNav");

if (nav) {

  window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

      nav.classList.add("scrolled");

    } else {

      nav.classList.remove("scrolled");

    }

  });

}
/* ============================================
   MENIU MOBIL
============================================ */

const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

if (menuToggle && siteNav) {

  /* ==========================================
     DESCHIDERE / ÎNCHIDERE MENIU
  ========================================== */

  menuToggle.addEventListener("click", function () {

    const isOpen =
      siteNav.classList.toggle("menu-open");

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen
    );

  });


  /* ==========================================
     SUBMENIU OBIECTIVE - TELEFON
  ========================================== */

  const submenuParent =
    siteNav.querySelector(".has-sub");

  if (submenuParent) {

    const parentLink =
      submenuParent.querySelector(".nav-link");

    parentLink.addEventListener(
      "click",
      function (event) {

        if (window.innerWidth <= 900) {

          /*
            Dacă submeniul NU este deschis,
            primul click îl deschide.
          */

          if (
            !submenuParent.classList.contains(
              "submenu-open"
            )
          ) {

            event.preventDefault();

            submenuParent.classList.add(
              "submenu-open"
            );

          }

          /*
            Dacă submeniul este deja deschis,
            al doilea click merge la
            obiective.html
          */

        }

      }
    );

  }


  /* ==========================================
     ÎNCHIDERE MENIU LA CLICK PE LINK
  ========================================== */

  const menuLinks =
    siteNav.querySelectorAll(
      ".nav-list a"
    );

  menuLinks.forEach(function (link) {

    link.addEventListener(
      "click",
      function () {

        if (window.innerWidth <= 900) {

          /*
            Dacă este un link din submeniu
            sau un link normal, închidem meniul.
          */

          if (
            !link.closest(".has-sub") ||
            link.closest(".submenu")
          ) {

            siteNav.classList.remove(
              "menu-open"
            );

            submenuParent?.classList.remove(
              "submenu-open"
            );

            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );

          }

        }

      }
    );

  });

}

// ============================================
// LIGHTBOX IMAGINI
// ============================================

const imageLightbox = document.createElement('div');
imageLightbox.className = 'image-lightbox';
imageLightbox.setAttribute('aria-hidden', 'true');
imageLightbox.innerHTML = `
  <div class="image-lightbox-overlay"></div>
  <div class="image-lightbox-content" role="dialog" aria-modal="true" aria-label="Vizualizare imagine">
    <button class="image-lightbox-close" type="button" aria-label="Închide imaginea">×</button>
    <button class="image-lightbox-nav image-lightbox-prev" type="button" aria-label="Imagineanterior">‹</button>
    <img class="image-lightbox-image" src="" alt="">
    <button class="image-lightbox-nav image-lightbox-next" type="button" aria-label="Următoarea imagine">›</button>
  </div>
`;

document.body.appendChild(imageLightbox);

const imageLightboxImage = imageLightbox.querySelector('.image-lightbox-image');
const imageLightboxClose = imageLightbox.querySelector('.image-lightbox-close');
const imageLightboxOverlay = imageLightbox.querySelector('.image-lightbox-overlay');
const imageLightboxPrev = imageLightbox.querySelector('.image-lightbox-prev');
const imageLightboxNext = imageLightbox.querySelector('.image-lightbox-next');

let lightboxImages = [];
let currentLightboxIndex = -1;

function shouldEnableLightbox(img) {
  if (!img) return false;

  if (
    img.closest('.tower-team-photo') ||
    img.closest('.team-photo') ||
    img.closest('.nav-brand') ||
    img.closest('.footer-logos') ||
    img.closest('.hero-logos')
  ) {
    return false;
  }

  return true;
}

function getLightboxGroup(img) {
  if (!img) return [];

  const container = img.closest('article, section, .objective-detail, .tower-item, .prevention-item, .awareness-item, .about-section, .imprint-section, .impact-content, .questionnaire-gallery, .social-media-grid, .sustainability-content, .participants-panel');

  if (!container) return [img];

  const group = Array.from(container.querySelectorAll('img')).filter(shouldEnableLightbox);
  return group.length ? group : [img];
}

function updateLightboxNavigation() {
  if (!imageLightboxPrev || !imageLightboxNext) return;

  if (lightboxImages.length <= 1) {
    imageLightboxPrev.classList.add('is-hidden');
    imageLightboxNext.classList.add('is-hidden');
    return;
  }

  imageLightboxPrev.classList.remove('is-hidden');
  imageLightboxNext.classList.remove('is-hidden');
}

function showLightboxImage(index) {
  if (!imageLightboxImage || !lightboxImages.length) return;

  currentLightboxIndex = (index + lightboxImages.length) % lightboxImages.length;
  const activeImage = lightboxImages[currentLightboxIndex];

  if (!activeImage) return;

  const src = activeImage.currentSrc || activeImage.src;
  const alt = activeImage.getAttribute('alt') || 'Imagine';

  imageLightboxImage.src = src;
  imageLightboxImage.alt = alt;
  updateLightboxNavigation();
}

function openImageLightbox(img) {
  if (!img || !imageLightboxImage) return;

  lightboxImages = getLightboxGroup(img);

  if (lightboxImages.length > 0) {
    currentLightboxIndex = lightboxImages.indexOf(img);

    if (currentLightboxIndex < 0) {
      currentLightboxIndex = 0;
    }
  } else {
    currentLightboxIndex = 0;
    lightboxImages = [img];
  }

  showLightboxImage(currentLightboxIndex);
  imageLightbox.classList.add('active');
  imageLightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeImageLightbox() {
  imageLightbox.classList.remove('active');
  imageLightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function switchLightboxImage(direction) {
  if (!lightboxImages.length) return;
  showLightboxImage(currentLightboxIndex + direction);
}

document.querySelectorAll('img').forEach((img) => {
  if (!shouldEnableLightbox(img)) return;

  img.style.cursor = 'zoom-in';
  img.addEventListener('click', (event) => {
    event.stopPropagation();
    openImageLightbox(img);
  });
});

if (imageLightboxClose) {
  imageLightboxClose.addEventListener('click', closeImageLightbox);
}

if (imageLightboxOverlay) {
  imageLightboxOverlay.addEventListener('click', closeImageLightbox);
}

if (imageLightboxPrev) {
  imageLightboxPrev.addEventListener('click', () => switchLightboxImage(-1));
}

if (imageLightboxNext) {
  imageLightboxNext.addEventListener('click', () => switchLightboxImage(1));
}

document.addEventListener('keydown', (event) => {
  if (!imageLightbox.classList.contains('active')) return;

  if (event.key === 'Escape') {
    closeImageLightbox();
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    switchLightboxImage(-1);
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    switchLightboxImage(1);
  }
});

  