import './header.scss';

// совпадает с брейкпоинтом "lg" в _variables.scss
const MOBILE = window.matchMedia('(max-width: 1024px)');

export function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const burger = header.querySelector('.header__burger');
  const menu = header.querySelector('.header__menu');

  // текущая страница в меню: /about.html → "about", корень → "index"
  const page = location.pathname.split('/').pop().replace('.html', '') || 'index';
  header.querySelectorAll('.header__link').forEach((link) => {
    if (link.dataset.pages.split(' ').includes(page)) link.setAttribute('aria-current', 'page');
  });

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const setOpen = (open) => {
    header.classList.toggle('is-menu-open', open);
    document.documentElement.classList.toggle('is-locked', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  };

  burger.addEventListener('click', () => setOpen(!header.classList.contains('is-menu-open')));

  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('is-menu-open')) {
      setOpen(false);
      burger.focus();
    }
  });

  // повернули планшет / растянули окно до десктопа — меню закрывается
  MOBILE.addEventListener('change', (e) => {
    if (!e.matches) setOpen(false);
  });
}
