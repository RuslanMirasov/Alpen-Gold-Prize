const validationRegEx = [
  {
    type: 'email',
    regex: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
    error: 'Некорректный Email',
  },
  {
    name: 'name',
    regex: /^[А-Яа-яЁё\-]+$/,
    error: 'Имя может содержать лишь буквы кириллицы&nbsp;и&nbsp;дефис',
  },
  {
    name: 'surname',
    regex: /^[А-Яа-яЁё\-]+$/,
    error: 'Фамилия может содержать лишь буквы кириллицы&nbsp;и&nbsp;дефис',
  },
  {
    name: 'middlename',
    regex: /^[А-Яа-яЁё\-]+$/,
    error: 'Отчество может содержать лишь буквы кириллицы&nbsp;и&nbsp;дефис',
  },
  // {
  //   type: 'tel',
  //   regex: /^\+7\s\d{3}\s\d{3}-\d{2}-\d{2}$/,
  //   error: 'Некорректный телефон',
  // },
  // {
  //   type: 'password',
  //   name: 'password',
  //   regex: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
  //   error: 'Некорректный пароль',
  // },
  // {
  //   name: 'password2',
  //   regex: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
  //   error: 'Некорректный пароль',
  // }
];

const validateInput = input => {
  if (!input.required) return;

  const validationError = error => {
    addErrorHTML(error, input);
    return false;
  };

  const { name, value, checked, type, placeholder } = input;

  if ((type === 'checkbox' || type === 'radio') && !checked) {
    return validationError(`${placeholder} не выбрано!`);
  }

  if (!value || value === '') {
    return validationError(`Поле "${placeholder || name}" не заполнено`);
  }

  const typeValidation = validationRegEx.find(v => v.type === type);

  if (typeValidation) {
    const regex = new RegExp(typeValidation.regex);

    if (!regex.test(value.trim())) {
      return validationError(typeValidation.error);
    }
  }

  const nameValidation = validationRegEx.find(v => v.name === name);

  if (nameValidation) {
    const regex = new RegExp(nameValidation.regex);

    if (!regex.test(value.trim())) {
      return validationError(nameValidation.error);
    }
  }

  input.classList.remove('invalid');
  return true;
};

const validateForm = form => {
  if (!form) return;
  let errorsCount = 0;

  const inputs = form.querySelectorAll('[required]');
  if (inputs.length === 0) return;

  inputs.forEach(input => {
    const isInputValid = validateInput(input);
    errorsCount = isInputValid ? errorsCount : errorsCount + 1;
  });

  return errorsCount <= 0;
};

const addErrorHTML = (error, input) => {
  if (!input || !error) return;

  input.classList.add('invalid');

  const form = input.closest('form');
  const errorEl = form?.querySelector('.inputError');

  if (!form || !errorEl) return;

  if (errorEl.classList.contains('active')) return;

  //errorEl.innerHTML = '';
  errorEl.innerHTML = error;
  errorEl.classList.add('active');
};

export const removeErrorHTML = input => {
  if (!input) return;

  const form = input.closest('form');
  const errorEl = form?.querySelector('.inputError');
  input.classList.remove('invalid');
  if (errorEl) {
    errorEl.classList.remove('active');
    //  setTimeout(() => {
    //    errorEl.innerHTML = '';
    //  }, 4000);
  }
};

const onRequiredInputFocus = e => {
  const input = e.target;
  removeErrorHTML(input);
};

const setSelectPlaceholderClass = input => {
  if (input.value === '') {
    input.classList.add('placeholder');
  } else {
    input.classList.remove('placeholder');
  }
};

document.addEventListener('focusin', e => {
  if (e.target.matches('[required]')) {
    onRequiredInputFocus(e);
  }

  if (e.target.nodeName === 'SELECT') {
    // e.target.classList.add('open');
    e.target.classList.remove('placeholder');
  }
});

document.addEventListener('click', e => {
  if (e.target.nodeName === 'SELECT') {
    e.target.classList.toggle('open');
  }
});

document.addEventListener('blur', e => {
  if (e.target.nodeName === 'SELECT') {
    e.target.classList.remove('open');
  }
});

document.addEventListener('change', e => {
  if (e.target.nodeName === 'SELECT') {
    setTimeout(() => {
      e.target.classList.remove('open');
    }, 0);
  }

  if (e.target.type === 'checkbox') {
    onRequiredInputFocus(e);
    //validateInput(e.target);
  }
});

document.addEventListener(
  'blur',
  e => {
    if (e.target.nodeName === 'SELECT') {
      e.target.classList.remove('open');
      setSelectPlaceholderClass(e.target);
    }
  },
  true
);

// SUBMIT MIDDLEWARE
document.addEventListener(
  'submit',
  function (event) {
    const form = event.target;
    if (form.tagName.toLowerCase() !== 'form') return;

    const isValid = validateForm(form);
    if (!isValid) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  },
  true
);
