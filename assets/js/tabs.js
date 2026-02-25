const ANIMATION_DELAY = 200;

/* --------------------------------------------------
   ЕДИНАЯ ФУНКЦИЯ СМЕНЫ / УСТАНОВКИ ТАБА
-------------------------------------------------- */
const setTab = (tabs, number, { animate = true } = {}) => {
  const tabsName = tabs.getAttribute('data-tabs');
  const STORAGE_KEY = tabsName ? `tabs:${tabsName}` : null;

  const targetButtons = tabs.querySelectorAll(`[data-tab-link="${number}"]`);
  const targetTabs = tabs.querySelectorAll(`[data-tab="${number}"]`);

  if (!targetTabs.length) return;

  const allButtons = tabs.querySelectorAll('[data-tab-link]');
  const activeTabs = tabs.querySelectorAll('[data-tab].active');

  // сохраняем состояние
  if (STORAGE_KEY) {
    sessionStorage.setItem(STORAGE_KEY, number);
  }

  /* кнопки */
  allButtons.forEach(btn => btn.classList.remove('active'));
  targetButtons.forEach(btn => btn.classList.add('active'));

  /* табы */
  if (!animate) {
    activeTabs.forEach(tab => tab.classList.remove('active'));
    targetTabs.forEach(tab => {
      tab.classList.add('active');
      tab.style.opacity = '1';
    });
    return;
  }

  activeTabs.forEach(tab => {
    tab.style.opacity = '0';
  });

  setTimeout(() => {
    activeTabs.forEach(tab => tab.classList.remove('active'));
    targetTabs.forEach(tab => tab.classList.add('active'));
  }, ANIMATION_DELAY);

  setTimeout(() => {
    targetTabs.forEach(tab => {
      tab.style.opacity = '1';
    });
  }, ANIMATION_DELAY);
};

/* --------------------------------------------------
   INIT STATE (ТОЛЬКО ИНИТ)
-------------------------------------------------- */
const initTabsState = tabsList => {
  tabsList.forEach(tabs => {
    const tabsName = tabs.getAttribute('data-tabs');
    const STORAGE_KEY = tabsName ? `tabs:${tabsName}` : null;

    let number = '1';

    if (STORAGE_KEY) {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) number = saved;
    }

    // если таба нет — fallback на 1
    if (!tabs.querySelector(`[data-tab="${number}"]`)) {
      number = '1';
    }

    setTab(tabs, number, { animate: false });
  });
};

/* --------------------------------------------------
   PUBLIC API
-------------------------------------------------- */
export const changeTab = (groupName, tabNumber) => {
  const tabs = document.querySelector(`[data-tabs="${groupName}"]`);
  if (!tabs) return;

  setTab(tabs, String(tabNumber));
};

/* --------------------------------------------------
   MAIN INIT
-------------------------------------------------- */
export const initTabs = () => {
  const tabsList = document.querySelectorAll('[data-tabs]');
  if (!tabsList.length) return;

  // INIT
  initTabsState(tabsList);
  window.addEventListener('pageshow', () => {
    initTabsState(tabsList);
  });

  tabsList.forEach(tabs => {
    let isAnimating = false;

    tabs.addEventListener('click', e => {
      if (isAnimating) return;

      const btn = e.target.closest('[data-tab-link]');
      if (!btn || !tabs.contains(btn)) return;

      const number = btn.dataset.tabLink;

      const activeButton = tabs.querySelector('[data-tab-link].active');
      if (activeButton?.dataset.tabLink === number) return;

      isAnimating = true;
      setTab(tabs, number);

      setTimeout(() => {
        isAnimating = false;
      }, ANIMATION_DELAY + 10);
    });
  });
};
