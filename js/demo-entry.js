(function () {
  'use strict';

  var copy = {
    en: {
      badge: 'AVELOR AI Website Builder',
      title: 'Try Your Demo Website with AVELOR AI',
      description: 'Tell us about your business, choose from 21 distinct website styles, and generate a personalised concept in English or Arabic. Preview it on desktop and mobile before requesting a quotation.',
      button: 'Create My Demo Website',
      note: '21 template styles · English & Arabic · Free concept preview',
      heroLink: 'Try Your Demo Website with AVELOR AI',
      footerLink: 'Try AVELOR AI Demo'
    },
    ar: {
      badge: 'منشئ مواقع AVELOR AI',
      title: 'جرّب موقعك التجريبي مع AVELOR AI',
      description: 'أخبرنا عن نشاطك واختر من 21 نمطًا مختلفًا للمواقع لإنشاء تصور مخصص بالعربية أو الإنجليزية، مع معاينة على الكمبيوتر والجوال قبل طلب عرض السعر.',
      button: 'إنشاء موقعي التجريبي',
      note: '21 نمطًا للمواقع · العربية والإنجليزية · معاينة مجانية',
      heroLink: 'جرّب موقعك التجريبي مع AVELOR AI',
      footerLink: 'جرّب AVELOR AI'
    }
  };

  function currentLanguage() {
    return localStorage.getItem('avelor-lang') === 'ar' ? 'ar' : 'en';
  }

  function apply() {
    var lang = currentLanguage();
    document.querySelectorAll('[data-demo-entry-key]').forEach(function (element) {
      var key = element.getAttribute('data-demo-entry-key');
      if (copy[lang][key]) element.textContent = copy[lang][key];
    });
  }

  function init() {
    apply();
    document.querySelectorAll('.lang-toggle').forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        window.setTimeout(apply, 0);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
