import './quiz.scss';

export function initQuiz() {
  document.querySelectorAll('.quiz').forEach((quiz) => {
    const box = quiz.querySelector('.quiz__box');
    const steps = [...quiz.querySelectorAll('.quiz__step')];
    const marks = [...quiz.querySelectorAll('.quiz__progress span')];
    const next = quiz.querySelector('.quiz__next');
    const back = quiz.querySelector('.quiz__back');
    let current = 0;

    const show = (index) => {
      current = index;
      const last = current === steps.length - 1;

      steps.forEach((step, i) => (step.hidden = i !== current));
      marks.forEach((mark, i) => mark.classList.toggle('is-active', i <= current));
      box.classList.toggle('is-last', last);
      next.hidden = last;
      back.hidden = current === 0;

      // фокус — на первый элемент нового шага, чтобы с клавиатуры можно было сразу отвечать
      const focusable = steps[current].querySelector('input:checked, input');
      if (focusable && document.activeElement !== document.body) focusable.focus();
    };

    next.addEventListener('click', () => show(Math.min(current + 1, steps.length - 1)));
    back.addEventListener('click', () => show(Math.max(current - 1, 0)));

    // после успешной отправки (форму очищает feedback.js) возвращаемся к первому вопросу
    quiz.querySelector('form').addEventListener('reset', () => setTimeout(() => {
      steps.forEach((step) => {
        const first = step.querySelector('.quiz__radio');
        if (first) first.checked = true;
      });
    }));
  });
}
