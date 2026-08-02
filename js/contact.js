(function () {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  const success = document.querySelector('.form-success');

  function setError(field, hasError) {
    const wrap = field.closest('.field');
    if (!wrap) return;
    wrap.classList.toggle('has-error', !!hasError);
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    if (!name.value.trim()) { setError(name, true); valid = false; }
    else setError(name, false);

    if (!validEmail(email.value.trim())) { setError(email, true); valid = false; }
    else setError(email, false);

    if (!message.value.trim()) { setError(message, true); valid = false; }
    else setError(message, false);

    if (!valid) return;

    form.style.display = 'none';
    if (success) success.classList.add('is-visible');
  });
})();
