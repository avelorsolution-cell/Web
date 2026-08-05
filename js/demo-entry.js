(function () {
  'use strict';

  var copy = {
    en: {
      badge: 'New AI Website Tool',
      title: 'Try Your Demo Website with AVELOR AI',
      description: 'Tell us about your construction business and generate a personalised website concept in English or Arabic. Preview it on desktop and mobile before requesting a quotation.',
      button: 'Create My Demo Website',
      note: 'Free concept preview · No download required'
    },
    ar: {
      badge: 'أداة جديدة بالذكاء الاصطناعي',
      title: 'جرّب موقعك التجريبي مع AVELOR AI',
      description: 'أدخل تفاصيل نشاطك في مجال المقاولات لإنشاء تصور مخصص لموقعك باللغة العربية أو الإنجليزية، مع معاينة على الكمبيوتر والجوال قبل طلب عرض السعر.',
      button: 'إنشاء موقعي التجريبي',
      note: 'تصور تجريبي مجاني · دون حاجة للتنزيل'
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
