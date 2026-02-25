const START_DATE = '25.02.2026 00:00';
const FINISH_DATE = '25.03.2026 23:59';

import { hidePreloader, initRandomPresent, initDateTimer } from './helpers.js';

initRandomPresent();
initDateTimer(START_DATE, FINISH_DATE);

window.addEventListener('load', () => {
  setTimeout(() => {
    hidePreloader();
  }, 300);
});
