(function () {
  const track = document.querySelector('.testimonial-track');
  if (!track) return;
  const cards = track.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.testimonial-dot');
  let index = 0;
  let timer;

  function show(i) {
    index = (i + cards.length) % cards.length;
    cards.forEach((card, n) => {
      card.style.display = n === index ? 'block' : 'none';
    });
    dots.forEach((dot, n) => dot.classList.toggle('is-active', n === index));
  }

  dots.forEach((dot, n) => {
    dot.addEventListener('click', () => {
      show(n);
      restart();
    });
  });

  function restart() {
    clearInterval(timer);
    timer = setInterval(() => show(index + 1), 6000);
  }

  show(0);
  restart();
})();
