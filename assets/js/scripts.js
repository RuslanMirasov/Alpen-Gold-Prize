const START_DATE = '26.02.2026 09:11';
const FINISH_DATE = '26.02.2026 09:12';
const PRESENTS_FORMAT = 'webp';

import { hidePreloader, initRandomPresent, initDateTimer } from './helpers.js';

initRandomPresent(PRESENTS_FORMAT);
initDateTimer(START_DATE, FINISH_DATE);

window.addEventListener('load', () => {
  setTimeout(() => {
    hidePreloader();
  }, 300);
});
