(function () {
  // Lazy loading fallback class toggler for elements using data-src pattern (future images)
  const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
  lazyImgs.forEach((img) => {
    img.addEventListener('load', () => img.classList.add('is-loaded'));
  });
})();
