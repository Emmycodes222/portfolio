// chat.js
// Simple JavaScript for portfolio interactivity and mobile menu behavior.

const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav-links a');
const footerYear = document.querySelector('.footer-year');

function setFooterYear() {
  if (!footerYear) return;
  footerYear.textContent = new Date().getFullYear();
}

function closeMobileMenu() {
  if (!navToggle) return;
  navToggle.checked = false;
}

function initLinkBehavior() {
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });
}

function initNavigationHighlight() {
  const sections = document.querySelectorAll('section[id]');

  const observerOptions = {
    root: null,
    threshold: 0.3,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (!link) return;

      if (entry.isIntersecting) {
        navLinks.forEach((navItem) => navItem.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

function init() {
  setFooterYear();
  initLinkBehavior();
  initNavigationHighlight();
}

window.addEventListener('DOMContentLoaded', init);
