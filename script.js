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
// ============================================
// VIDEO MODAL - EVENIMENT CREATIV
// ============================================

const openCreativeVideo =
  document.getElementById('openCreativeVideo');

const closeCreativeVideo =
  document.getElementById('closeCreativeVideo');

const creativeVideoModal =
  document.getElementById('creativeVideoModal');

const creativeVideo =
  document.getElementById('creativeVideo');

const videoModalOverlay =
  document.querySelector('.video-modal-overlay');


// DESCHIDE VIDEO

if (openCreativeVideo) {

  openCreativeVideo.addEventListener('click', () => {

    creativeVideoModal.classList.add('active');

    creativeVideoModal.setAttribute(
      'aria-hidden',
      'false'
    );

    document.body.style.overflow = 'hidden';

    creativeVideo.play();

  });

}


// ÎNCHIDE VIDEO

function closeCreativeVideoModal() {

  creativeVideoModal.classList.remove('active');

  creativeVideoModal.setAttribute(
    'aria-hidden',
    'true'
  );

  document.body.style.overflow = '';

  creativeVideo.pause();

  creativeVideo.currentTime = 0;

}


if (closeCreativeVideo) {

  closeCreativeVideo.addEventListener(
    'click',
    closeCreativeVideoModal
  );

}


if (videoModalOverlay) {

  videoModalOverlay.addEventListener(
    'click',
    closeCreativeVideoModal
  );

}


// ÎNCHIDE CU ESC

document.addEventListener(
  'keydown',
  (event) => {

    if (
      event.key === 'Escape' &&
      creativeVideoModal.classList.contains('active')
    ) {

      closeCreativeVideoModal();

    }

  }
);
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

  