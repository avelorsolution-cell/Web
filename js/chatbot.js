(function () {
  'use strict';

  const WORKER_URL = 'https://avelor-ai-agent.avelorsolution.workers.dev/chat';
  const MAX_HISTORY_ITEMS = 8;
  const MAX_MESSAGE_LENGTH = 1200;

  const copy = {
    en: {
      launcher: 'AI Chat',
      title: 'AVELOR AI Assistant',
      status: 'Online · AI-powered',
      close: 'Close chat',
      clear: 'Clear conversation',
      welcome: "Hello! I’m AVELOR’s AI assistant. I can explain our services and help prepare your project enquiry. How may I help you?",
      quickLabel: 'Popular options',
      placeholder: 'Type your message…',
      send: 'Send message',
      privacy: 'AI-generated replies. Do not share passwords, payment details or sensitive information.',
      privacyLink: 'Privacy Policy',
      error: 'The AI assistant is temporarily unavailable. Please contact AVELOR through WhatsApp or email.',
      tooLong: 'Please shorten your message to 1,200 characters.',
      human: 'You can speak directly with AVELOR through WhatsApp or email.',
      whatsapp: 'WhatsApp',
      email: 'Email',
      cleared: 'The conversation has been cleared.',
      quick: [
        ['Web Design', 'I need help with web design.'],
        ['Website Maintenance', 'I need help with website maintenance.'],
        ['Graphic Design', 'I need help with graphic design.'],
        ['3D Visualization', 'I need help with 3D visualization.'],
        ['Branding', 'I need help with branding.'],
        ['Digital Marketing', 'I need help with digital marketing.'],
        ['Request a Quote', 'I would like to request a quotation.'],
        ['Speak to a Human', '__human__']
      ]
    },
    ar: {
      launcher: 'المساعد الذكي',
      title: 'مساعد AVELOR الذكي',
      status: 'متصل · مدعوم بالذكاء الاصطناعي',
      close: 'إغلاق المحادثة',
      clear: 'مسح المحادثة',
      welcome: 'مرحباً! أنا المساعد الذكي لـ AVELOR Creative Solutions. يمكنني شرح خدماتنا والمساعدة في تجهيز طلب مشروعك. كيف يمكنني مساعدتك؟',
      quickLabel: 'خيارات شائعة',
      placeholder: 'اكتب رسالتك…',
      send: 'إرسال الرسالة',
      privacy: 'الردود مولّدة بالذكاء الاصطناعي. لا تشارك كلمات المرور أو بيانات الدفع أو المعلومات الحساسة.',
      privacyLink: 'سياسة الخصوصية',
      error: 'المساعد الذكي غير متاح مؤقتاً. يرجى التواصل مع AVELOR عبر واتساب أو البريد الإلكتروني.',
      tooLong: 'يرجى تقصير رسالتك إلى 1200 حرف.',
      human: 'يمكنك التواصل مباشرة مع AVELOR عبر واتساب أو البريد الإلكتروني.',
      whatsapp: 'واتساب',
      email: 'البريد الإلكتروني',
      cleared: 'تم مسح المحادثة.',
      quick: [
        ['تصميم المواقع', 'أحتاج إلى مساعدة في تصميم موقع إلكتروني.'],
        ['صيانة المواقع', 'أحتاج إلى مساعدة في صيانة موقع إلكتروني.'],
        ['التصميم الجرافيكي', 'أحتاج إلى مساعدة في التصميم الجرافيكي.'],
        ['التصور ثلاثي الأبعاد', 'أحتاج إلى مساعدة في التصور ثلاثي الأبعاد.'],
        ['الهوية التجارية', 'أحتاج إلى مساعدة في تصميم الهوية التجارية.'],
        ['التسويق الرقمي', 'أحتاج إلى مساعدة في التسويق الرقمي.'],
        ['طلب عرض سعر', 'أرغب في طلب عرض سعر.'],
        ['التحدث مع شخص', '__human__']
      ]
    }
  };

  let conversation = [];
  let isSending = false;
  let welcomeRow = null;

  function currentLanguage() {
    const stored = localStorage.getItem('avelor-lang');
    if (stored === 'ar' || stored === 'en') return stored;
    return document.documentElement.lang === 'ar' ? 'ar' : 'en';
  }

  function icon(name) {
    const icons = {
      chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 5.5h16v11H9l-5 3v-14Z"/><path d="M8 10h8M8 13h5"/></svg>',
      close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
      trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/></svg>',
      send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m4 4 16 8-16 8 3-8-3-8Z"/><path d="M7 12h13"/></svg>',
      whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.9-1.3A10 10 0 1 0 12 2Zm5.4 14.2c-.2.6-1.3 1.2-1.9 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.2-.2-1.2-1.6-1.2-3.1s.8-2.2 1.1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .5 0 .7.6.3.6.9 2.1 1 2.3.1.2.2.4 0 .6-.1.2-.4.5-.6.8-.2.2-.4.4-.2.8.2.4 1 1.6 2.1 2.6 1.4 1.3 2.6 1.7 3 1.9.4.2.6.1.8-.1.2-.2.9-1 1.1-1.4.2-.4.5-.3.8-.2l2.2 1.1c.3.2.5.2.6.4.1.2.1.9-.1 1.5Z"/></svg>',
      mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 5h16v14H4z"/><path d="m4 6 8 7 8-7"/></svg>'
    };
    return icons[name] || '';
  }

  function createWidget() {
    const root = document.createElement('div');
    root.className = 'avelor-chat';
    root.setAttribute('data-avelor-chat', '');

    root.innerHTML = `
      <section class="avelor-chat-panel" role="dialog" aria-modal="false" aria-labelledby="avelor-chat-title" aria-hidden="true">
        <header class="avelor-chat-header">
          <div class="avelor-chat-mark" aria-hidden="true">A</div>
          <div class="avelor-chat-heading">
            <strong id="avelor-chat-title"></strong>
            <span class="avelor-chat-status"></span>
          </div>
          <div class="avelor-chat-header-actions">
            <button type="button" class="avelor-chat-icon-btn" data-chat-clear>${icon('trash')}</button>
            <button type="button" class="avelor-chat-icon-btn" data-chat-close>${icon('close')}</button>
          </div>
        </header>
        <div class="avelor-chat-messages" data-chat-messages aria-live="polite"></div>
        <div class="avelor-chat-quick-wrap">
          <span class="avelor-chat-quick-label"></span>
          <div class="avelor-chat-quick" data-chat-quick></div>
        </div>
        <div class="avelor-chat-composer">
          <form class="avelor-chat-form" data-chat-form>
            <textarea class="avelor-chat-input" data-chat-input rows="1" maxlength="${MAX_MESSAGE_LENGTH}"></textarea>
            <button type="submit" class="avelor-chat-send" data-chat-send>${icon('send')}</button>
          </form>
          <p class="avelor-chat-note"><span data-chat-note></span> <a href="privacy.html" data-chat-privacy></a></p>
        </div>
      </section>
      <button type="button" class="avelor-chat-launcher" data-chat-launcher aria-expanded="false">
        <span class="avelor-chat-launcher-icon">${icon('chat')}</span>
        <span class="avelor-chat-launcher-label"></span>
        <span class="avelor-chat-launcher-dot" aria-hidden="true"></span>
      </button>`;

    document.body.appendChild(root);
    return root;
  }

  function addMessage(root, role, text, options) {
    const messages = root.querySelector('[data-chat-messages]');
    const row = document.createElement('div');
    row.className = `avelor-chat-message-row is-${role}`;

    const bubble = document.createElement('div');
    bubble.className = 'avelor-chat-bubble';
    bubble.textContent = text;
    row.appendChild(bubble);

    if (options && options.contactActions) {
      const actions = buildContactActions();
      bubble.appendChild(actions);
    }

    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
    return row;
  }

  function addTyping(root) {
    const messages = root.querySelector('[data-chat-messages]');
    const row = document.createElement('div');
    row.className = 'avelor-chat-message-row is-assistant';
    row.setAttribute('data-chat-typing', '');
    row.innerHTML = '<div class="avelor-chat-bubble"><span class="avelor-chat-typing"><span></span><span></span><span></span></span></div>';
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
    return row;
  }

  function buildContactActions() {
    const lang = currentLanguage();
    const t = copy[lang];
    const wrap = document.createElement('span');
    wrap.className = 'avelor-chat-contact-actions';

    const whatsapp = document.createElement('a');
    whatsapp.className = 'avelor-chat-contact-link';
    whatsapp.href = lang === 'ar'
      ? 'https://wa.me/97433976563?text=' + encodeURIComponent('مرحباً AVELOR، أود التحدث مع شخص بخصوص مشروع.')
      : 'https://wa.me/97433976563?text=' + encodeURIComponent('Hello AVELOR, I would like to speak with someone about a project.');
    whatsapp.target = '_blank';
    whatsapp.rel = 'noopener';
    whatsapp.innerHTML = `${icon('whatsapp')}<span>${t.whatsapp}</span>`;

    const email = document.createElement('a');
    email.className = 'avelor-chat-contact-link';
    email.href = 'mailto:info@avelorsolutions.com';
    email.innerHTML = `${icon('mail')}<span>${t.email}</span>`;

    wrap.append(whatsapp, email);
    return wrap;
  }

  function renderQuickReplies(root) {
    const lang = currentLanguage();
    const quick = root.querySelector('[data-chat-quick]');
    quick.innerHTML = '';

    copy[lang].quick.forEach(([label, value]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'avelor-chat-chip';
      button.textContent = label;
      button.addEventListener('click', function () {
        if (value === '__human__') {
          addMessage(root, 'user', label);
          addMessage(root, 'assistant', copy[currentLanguage()].human, { contactActions: true });
          return;
        }
        sendMessage(root, value);
      });
      quick.appendChild(button);
    });
  }

  function updateLanguage(root) {
    const lang = currentLanguage();
    const t = copy[lang];

    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    root.querySelector('.avelor-chat-launcher-label').textContent = t.launcher;
    root.querySelector('#avelor-chat-title').textContent = t.title;
    root.querySelector('.avelor-chat-status').textContent = t.status;
    root.querySelector('.avelor-chat-quick-label').textContent = t.quickLabel;
    root.querySelector('[data-chat-input]').placeholder = t.placeholder;
    root.querySelector('[data-chat-note]').textContent = t.privacy;
    root.querySelector('[data-chat-privacy]').textContent = t.privacyLink;
    root.querySelector('[data-chat-launcher]').setAttribute('aria-label', t.launcher);
    root.querySelector('[data-chat-close]').setAttribute('aria-label', t.close);
    root.querySelector('[data-chat-clear]').setAttribute('aria-label', t.clear);
    root.querySelector('[data-chat-send]').setAttribute('aria-label', t.send);
    renderQuickReplies(root);

    if (welcomeRow && conversation.length === 0) {
      welcomeRow.querySelector('.avelor-chat-bubble').textContent = t.welcome;
    }
  }

  function setOpen(root, shouldOpen) {
    root.classList.toggle('is-open', shouldOpen);
    root.querySelector('.avelor-chat-panel').setAttribute('aria-hidden', shouldOpen ? 'false' : 'true');
    root.querySelector('[data-chat-launcher]').setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    if (shouldOpen) {
      window.setTimeout(() => root.querySelector('[data-chat-input]').focus(), 120);
    }
  }

  function autoResize(input) {
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, 112)}px`;
  }

  async function sendMessage(root, rawMessage) {
    if (isSending) return;

    const input = root.querySelector('[data-chat-input]');
    const sendButton = root.querySelector('[data-chat-send]');
    const message = String(rawMessage || input.value || '').trim();
    if (!message) return;

    if (message.length > MAX_MESSAGE_LENGTH) {
      addMessage(root, 'assistant', copy[currentLanguage()].tooLong);
      return;
    }

    const requestHistory = conversation.slice(-MAX_HISTORY_ITEMS);
    addMessage(root, 'user', message);
    conversation.push({ role: 'user', content: message });

    input.value = '';
    autoResize(input);
    isSending = true;
    sendButton.disabled = true;
    const typing = addTyping(root);

    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 30000);

      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          history: requestHistory
        }),
        signal: controller.signal
      });

      window.clearTimeout(timeout);
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success || typeof data.reply !== 'string') {
        throw new Error(data.error || 'AI request failed');
      }

      typing.remove();
      addMessage(root, 'assistant', data.reply);
      conversation.push({ role: 'assistant', content: data.reply });
      conversation = conversation.slice(-MAX_HISTORY_ITEMS);
    } catch (error) {
      console.error('AVELOR chatbot error:', error);
      typing.remove();
      addMessage(root, 'assistant', copy[currentLanguage()].error, { contactActions: true });
    } finally {
      isSending = false;
      sendButton.disabled = false;
      input.focus();
    }
  }

  function initialise() {
    if (document.querySelector('[data-avelor-chat]')) return;

    const root = createWidget();
    const launcher = root.querySelector('[data-chat-launcher]');
    const close = root.querySelector('[data-chat-close]');
    const clear = root.querySelector('[data-chat-clear]');
    const form = root.querySelector('[data-chat-form]');
    const input = root.querySelector('[data-chat-input]');

    welcomeRow = addMessage(root, 'assistant', copy[currentLanguage()].welcome);
    updateLanguage(root);

    launcher.addEventListener('click', function () {
      setOpen(root, !root.classList.contains('is-open'));
    });

    close.addEventListener('click', function () {
      setOpen(root, false);
    });

    clear.addEventListener('click', function () {
      conversation = [];
      root.querySelector('[data-chat-messages]').innerHTML = '';
      welcomeRow = addMessage(root, 'assistant', copy[currentLanguage()].welcome);
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      sendMessage(root, input.value);
    });

    input.addEventListener('input', function () {
      autoResize(input);
    });

    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        form.requestSubmit();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && root.classList.contains('is-open')) {
        setOpen(root, false);
      }
    });

    const observer = new MutationObserver(function (mutations) {
      if (mutations.some((item) => item.attributeName === 'lang' || item.attributeName === 'dir')) {
        updateLanguage(root);
      }
    });
    observer.observe(document.documentElement, { attributes: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise);
  } else {
    initialise();
  }
})();
