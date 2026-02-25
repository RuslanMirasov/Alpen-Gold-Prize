export const throttle = (func, limit) => {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

export const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export const fixHeaderOnScroll = () => {
  const header = document.querySelector('.header');
  if (!header) return;

  let isFixed = false;

  const onScroll = () => {
    const shouldBeFixed = window.scrollY > 0;

    if (shouldBeFixed !== isFixed) {
      header.classList.toggle('fix', shouldBeFixed);
      isFixed = shouldBeFixed;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
};

export const initNavigationMenu = () => {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.navigation ');
  const menuLinks = document.querySelectorAll('.menu__link');

  const toggleMenu = () => {
    burger.classList.toggle('open');
    menu.classList.toggle('open');
  };

  if (burger) burger.addEventListener('click', toggleMenu);
  menuLinks.forEach(link => link.addEventListener('click', toggleMenu));
};

export const applyIsMobilClass = () => {
  const check = () => {
    const isIOS = /Mac|iPhone|iPad|iPod/.test(navigator.platform) || /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
    const isTouchDevice = matchMedia('(hover: none)').matches && matchMedia('(pointer: coarse)').matches;
    const isSmallScreen = window.innerWidth < 1280;
    const shouldApply = isIOS || (isTouchDevice && isSmallScreen);

    document.body.classList.toggle('is-mobil', shouldApply);
  };

  check();

  window.addEventListener('resize', check);
  window.addEventListener('orientationchange', check);
};

export const initCopyClipboard = () => {
  const elements = document.querySelectorAll('[data-copy-clipbord]');

  if (!elements.length) return;

  elements.forEach(el => {
    el.addEventListener('click', async () => {
      const text = el.innerText.trim();
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        showCopyNotification();
      } catch (err) {
        console.warn('Ошибка копирования:', err);
      }
    });
  });
};

function showCopyNotification() {
  const notification = document.createElement('div');
  notification.textContent = 'Скопировано в буфер обмена';
  notification.classList.add('notify');

  document.body.appendChild(notification);

  requestAnimationFrame(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translate(-50%, 0%)';
  });

  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translate(-50%, 150%)';

    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 2000);
}
