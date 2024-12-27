const section = document.querySelector('.covers');
const items = section.querySelectorAll('.covers-item');
section.addEventListener('click', handleClick);

// start and stop animation by click
function handleClick() {
  items.forEach(item => {
    !item.classList.contains('start')
      ? item.classList.add('start')
      : item.classList.remove('start');
  });
}

function createObserver() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      const section = entry.target;

      if (entry.isIntersecting) {
        items.forEach(item => {
          item.classList.add('start');
        });
      } else {
        items.forEach(item => {
          item.classList.remove('start');
        });
      }
    });
  }, options);

  observer.observe(section);
}

document.addEventListener('DOMContentLoaded', createObserver);
