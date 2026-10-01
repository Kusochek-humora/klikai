import Swiper from 'swiper';
import 'swiper/css';

import './reviews.scss';

export function initReviews() {
  document.querySelectorAll('.reviews__slider').forEach((el) => {
    new Swiper(el, {
      slidesPerView: 'auto',
      spaceBetween: 20,
      grabCursor: true,
    });
  });
}
