const START_DATE = '26.02.2026 09:11';
const FINISH_DATE = '26.02.2026 09:12';

import { hidePreloader, initRandomPresent, initDateTimer } from './helpers.js';

initRandomPresent();
initDateTimer(START_DATE, FINISH_DATE);

window.addEventListener('load', () => {
  setTimeout(() => {
    hidePreloader();
  }, 300);
});
