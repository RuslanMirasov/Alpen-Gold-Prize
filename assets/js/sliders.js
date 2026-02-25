import { registerNamedSwiper } from './goToSlide.js';

const sliders = document.querySelectorAll('[data-slider]');
const toBool = value => value === 'true';

export const initSliders = () => {
  if (sliders.length > 0) {
    sliders.forEach(sliderWrapper => {
      const swiper = sliderWrapper.querySelector('.swiper');
      const {
        effect = 'slide',
        speed = '600',
        spaceBetween = '0,0,0',
        slidesPerView = '1,1,1',
        enabled = 'true,true,true',
        slidesPerGroup = '1,1,1',
        centered = false,
        loop = false,
        initialSlide = '0,0,0',
        direction = 'horizontal',
        allowTouchMove = 'true',
        autoHeight = false,
        autoplay = null,
      } = sliderWrapper.dataset;

      const arrowPrev = sliderWrapper.querySelector('[data-arrow-prev]');
      const arrowNext = sliderWrapper.querySelector('[data-arrow-next]');
      const pagination = sliderWrapper.querySelector('[data-pagination]');

      const options = {
        allowTouchMove: toBool(allowTouchMove),
        effect: effect === '3d' ? 'coverflow' : effect,
        autoHeight,
        speed,
        loop,
        centeredSlides: centered,
        centeredSlidesBounds: centered,
        direction,
        breakpoints: {
          0: {
            enabled: toBool(enabled.split(',')[2]),
            slidesPerView: Number(slidesPerView.split(',')[2]),
            slidesPerGroup: Number(slidesPerGroup.split(',')[2]),
            spaceBetween: Number(spaceBetween.split(',')[2]),
            initialSlide: Number(initialSlide.split(',')[2]),
          },
          768: {
            enabled: toBool(enabled.split(',')[1]),
            slidesPerView: Number(slidesPerView.split(',')[1]),
            slidesPerGroup: Number(slidesPerGroup.split(',')[1]),
            spaceBetween: Number(spaceBetween.split(',')[1]),
            initialSlide: Number(initialSlide.split(',')[1]),
          },
          1280: {
            enabled: toBool(enabled.split(',')[0]),
            slidesPerView: Number(slidesPerView.split(',')[0]),
            slidesPerGroup: Number(slidesPerGroup.split(',')[0]),
            spaceBetween: Number(spaceBetween.split(',')[0]),
            initialSlide: Number(initialSlide.split(',')[0]),
          },
        },
      };

      if (arrowPrev && arrowNext) {
        options.navigation = {
          prevEl: arrowPrev,
          nextEl: arrowNext,
        };
      }

      if (pagination) {
        options.pagination = {
          el: pagination,
          clickable: true,
          dynamicBullets: true,
        };
      }

      if (autoplay) {
        options.autoplay = {
          delay: autoplay,
          disableOnInteraction: false,
        };
      }

      if (effect === 'coverflow') {
        options.coverflowEffect = {
          rotate: 0,
          depth: 0,
          scale: 1,
          stretch: 16,
          slideShadows: false,
        };
      }

      if (effect === '3d') {
        options.watchSlidesProgress = true;
        options.watchSlidesVisibility = true;
        options.coverflowEffect = {
          rotate: 0,
          scale: 1,
          depth: 0,
          stretch: 0,
          slideShadows: false,
        };
      }

      const instance = new Swiper(swiper, options);

      const rawKey = sliderWrapper.getAttribute('data-slider');
      const key = rawKey && rawKey.trim();
      if (key) {
        registerNamedSwiper(key, instance);
      }
    });
  }
};
