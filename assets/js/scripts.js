import { hidePreloader, initRandomPresent, initDateTimer } from './helpers.js';

const START_DATE = '01.03.2026 00:00'; // Дата и время начала акции
const FINISH_DATE = '01.05.2050 23:59'; // Дата и время окончания акции
const PRESENTS_FORMAT = 'jpg'; // Формат изображений подарков (мкмов)

initRandomPresent(PRESENTS_FORMAT);
initDateTimer(START_DATE, FINISH_DATE);

window.addEventListener('load', () => {
  setTimeout(() => {
    hidePreloader();
  }, 300);
});
