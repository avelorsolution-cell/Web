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

  function buildMailBody(fields) {
    const lines = [
      `Name: ${fields.name}`,
      fields.company ? `Company: ${fields.company}` : null,
      `Email: ${fields.email}`,
      fields.phone ? `Phone / WhatsApp: ${fields.phone}` : null,
      fields.service ? `Service: ${fields.service}` : null,
      fields.budget ? `Estimated Budget: ${fields.budget}` : null,
      fields.timeline ? `Preferred Timeline: ${fields.timeline}` : null,
      fields.language ? `Preferred Language: ${fields.language}` : null,
      '',
      'Project Description:',
      fields.message
    ].filter(Boolean);
    return lines.join('\n');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');
    const consent = form.querySelector('#consent');

    if (!name.value.trim()) { setError(name, true); valid = false; }
    else setError(name, false);

    if (!validEmail(email.value.trim())) { setError(email, true); valid = false; }
    else setError(email, false);

    if (!message.value.trim()) { setError(message, true); valid = false; }
    else setError(message, false);

    if (consent && !consent.checked) { setError(consent, true); valid = false; }
    else if (consent) setError(consent, false);

    if (!valid) return;

    const company = form.querySelector('#company');
    const phone = form.querySelector('#phone');
    const service = form.querySelector('#service');
    const budget = form.querySelector('#budget');
    const timeline = form.querySelector('#timeline');
    const language = form.querySelector('#language');

    const fields = {
      name: name.value.trim(),
      company: company ? company.value.trim() : '',
      email: email.value.trim(),
      phone: phone ? phone.value.trim() : '',
      service: service ? service.value : '',
      budget: budget ? budget.value.trim() : '',
      timeline: timeline ? timeline.value.trim() : '',
      language: language ? language.value : '',
      message: message.value.trim()
    };

    const subject = encodeURIComponent(`New project enquiry — ${fields.name}`);
    const body = encodeURIComponent(buildMailBody(fields));
    const mailtoLink = `mailto:info@avelorsolutions.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    form.style.display = 'none';
    if (success) success.classList.add('is-visible');
  });
})();
