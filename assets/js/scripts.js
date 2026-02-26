const START_DATE = '26.02.2026 09:11'; // Дата и время начала акции
const FINISH_DATE = '26.02.2026 09:12'; // Дата и время окончания акции
const PRESENTS_FORMAT = 'webp'; // Формат изображений подарков (мкмов)

import { hidePreloader, initRandomPresent, initDateTimer } from './helpers.js';

initRandomPresent(PRESENTS_FORMAT);
initDateTimer(START_DATE, FINISH_DATE);

window.addEventListener('load', () => {
  setTimeout(() => {
    hidePreloader();
  }, 300);
});
