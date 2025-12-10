document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu');
  const logo = document.querySelector('.menu > img');
  const nav = document.querySelector('.menu nav') || document.querySelector('.nav') || document.querySelector('nav');
  const footer = document.querySelector('.footer');
  if (!menu || !logo || !nav || !footer) return;

  const gap = 241; // écart vertical original entre logo et nav
  const margin = 16; // marge entre nav et footer

  function setMenuPadding() {
    // mesurer la hauteur réelle du logo et appliquer padding-top pour recréer l'espace d'origine
    const logoRect = logo.getBoundingClientRect();
    const logoHeight = Math.round(logoRect.height);
    menu.style.paddingTop = `${logoHeight + gap}px`;
  }

  function adjustNav() {
    const footerTop = footer.getBoundingClientRect().top;
    const overlap = window.innerHeight - footerTop;
    if (overlap > 0) {
      nav.style.transform = `translateY(-${overlap + margin}px)`;
    } else {
      nav.style.transform = 'translateY(0)';
    }
  }

  // initialisation
  setMenuPadding();
  adjustNav();

  // mettre à jour au redimensionnement (logo peut changer de taille) et au scroll
  window.addEventListener('resize', () => {
    setMenuPadding();
    adjustNav();
  });
  window.addEventListener('scroll', adjustNav, { passive: true });
});