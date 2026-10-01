import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

import './results.scss';

// совпадает с брейкпоинтом "lg" в _variables.scss
const MOBILE = window.matchMedia('(max-width: 1024px)');

export function initResults() {
  document.querySelectorAll('.results').forEach((section) => {
    const el = section.querySelector('.results__slider');
    let swiper = null;

    // слайдер нужен только на мобильных: на десктопе карточки стоят столбиком
    const update = () => {
      if (MOBILE.matches && !swiper) {
        swiper = new Swiper(el, {
          modules: [Navigation],
          slidesPerView: 1,
          spaceBetween: 10,
          autoHeight: false,
          navigation: {
            prevEl: section.querySelector('.results__arrow--prev'),
            nextEl: section.querySelector('.results__arrow--next'),
          },
        });
      } else if (!MOBILE.matches && swiper) {
        swiper.destroy(true, true);
        swiper = null;
      }
    };

    MOBILE.addEventListener('change', update);
    update();
  });
}
