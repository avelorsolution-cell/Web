(function () {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  const success = document.querySelector('.form-success');

  function setError(field, message) {
    const wrap = field.closest('.field');
    if (!wrap) return;
    const msg = wrap.querySelector('.error-msg');
    if (message) {
      wrap.classList.add('has-error');
      if (msg) msg.textContent = message;
    } else {
      wrap.classList.remove('has-error');
    }
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

    if (!name.value.trim()) { setError(name, 'Please enter your name.'); valid = false; }
    else setError(name, '');

    if (!validEmail(email.value.trim())) { setError(email, 'Please enter a valid email.'); valid = false; }
    else setError(email, '');

    if (!message.value.trim()) { setError(message, 'Tell us a little about your project.'); valid = false; }
    else setError(message, '');

    if (!valid) return;

    form.style.display = 'none';
    if (success) success.classList.add('is-visible');
  });
})();
