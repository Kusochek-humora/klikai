import './feedback.scss';

// правила проверки: функция возвращает текст ошибки или пустую строку
const RULES = {
  name: (value) => {
    if (!value) return 'Укажите, как к вам обращаться';
    if (value.length < 2) return 'Слишком короткое имя';
    return '';
  },
  phone: (value) => {
    if (!value) return 'Укажите номер телефона';
    const digits = value.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) return 'Проверьте номер: в нём должно быть 10–15 цифр';
    return '';
  },
};

function validateField(input) {
  const rule = RULES[input.name];
  const message = rule ? rule(input.value.trim()) : '';
  const error = input.closest('.feedback__field').querySelector('.feedback__error');

  error.textContent = message;
  error.hidden = !message;

  if (message) {
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', error.id);
  } else {
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
  }

  return !message;
}

export function initFeedback() {
  // та же проверка работает в квизе на главной: его форма помечена data-feedback-form
  document.querySelectorAll('.feedback__form, [data-feedback-form]').forEach((form) => {
    const inputs = [...form.querySelectorAll('.feedback__input')];
    const success = form.querySelector('.feedback__success');

    inputs.forEach((input) => {
      // в телефоне — только цифры и привычные разделители
      if (input.name === 'phone') {
        input.addEventListener('input', () => {
          input.value = input.value.replace(/[^\d+\-() ]/g, '');
        });
      }

      // ошибка появляется после ухода с поля и пропадает, как только её исправили
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        success.hidden = true;
        if (input.hasAttribute('aria-invalid')) validateField(input);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const invalid = inputs.filter((input) => !validateField(input));
      if (invalid.length) {
        invalid[0].focus();
        return;
      }

      // TODO: отправка на сервер. Данные формы: new FormData(form)
      form.reset();
      success.hidden = false;
    });
  });
}
