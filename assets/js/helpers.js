export const hidePreloader = () => {
  const preloader = document.querySelector('.preloader');

  if (!preloader) return;

  preloader.classList.add('hidden');

  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 300);

  setTimeout(() => {
    preloader.remove();
  }, 1000);
};

export const initRandomPresent = () => {
  const btn = document.querySelector('[data-present]');

  if (!btn) return;

  const falderUrl = btn.getAttribute('href');
  const presentNumber = Math.floor(Math.random() * 5) + 1;
  const newHref = `${falderUrl}/${presentNumber}.webp`;

  btn.setAttribute('href', newHref);
};

export const initDateTimer = (start, finish) => {
  const body = document.body;

  const parseDate = str => {
    const [datePart, timePart] = str.split(' ');
    const [day, month, year] = datePart.split('.').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);

    return new Date(year, month - 1, day, hours, minutes, 0);
  };

  const startDate = parseDate(start);
  const finishDate = parseDate(finish);

  if (isNaN(startDate) || isNaN(finishDate)) {
    console.warn('Invalid date format');
    return;
  }

  const interval = setInterval(() => {
    const now = new Date();

    if (now < startDate) {
      return;
    }

    if (now >= startDate && now < finishDate) {
      if (body.dataset.state !== 'start') {
        body.dataset.state = 'start';
      }
      return;
    }

    if (now >= finishDate) {
      body.dataset.state = 'finish';
      clearInterval(interval);
    }
  }, 1000);
};
