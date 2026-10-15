const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
function setMenu(open) {
  if (!menuToggle || !navLinks) return;
  navLinks.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
  document.addEventListener('click', event => {
    if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) setMenu(false);
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 650) setMenu(false); });
}
const filterButtons = document.querySelectorAll('.filter');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  filterButtons.forEach(b => {
    const active = b === button;
    b.classList.toggle('active', active);
    b.setAttribute('aria-pressed', String(active));
  });
  projectCards.forEach(card => {
    card.hidden = selected !== 'all' && !card.dataset.category.split(' ').includes(selected);
  });
  const planned = document.querySelector('.planned-heading');
  if (planned) planned.hidden = selected !== 'all';
}));
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
