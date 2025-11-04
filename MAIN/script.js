document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hbm');
  const navLinks = document.querySelector('nav ul');
  const closeBtn = document.querySelector('.close-btn');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
  });

  closeBtn.addEventListener('click', () => {
    navLinks.classList.remove('nav-active');
  });
});