document.addEventListener("DOMContentLoaded", () => {

  // 1. Auto-update footer year
  const yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Sticky header background swap on scroll
  const header = document.getElementById("header");

  function toggleHeaderStyle() {
    header.classList.toggle("scrolled", window.scrollY > 30);
  }

  window.addEventListener("scroll", toggleHeaderStyle, { passive: true });
  toggleHeaderStyle(); // run once on load

  // 3. Highlight the nav link matching the section in view
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  function setActiveLink() {
    const scrollMid = window.scrollY + window.innerHeight / 2;
    let currentId = "";

    sections.forEach((section) => {
      if (section.offsetTop <= scrollMid) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentId}`;
      link.classList.toggle("active", isActive);
    });
  }

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  // 4. Close the mobile menu whenever a nav link is clicked
  const navToggle = document.getElementById("nav-toggle");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navToggle) navToggle.checked = false;
    });
  });

  // 5. Scroll reveal — fade elements in as they enter the viewport
  const revealEls = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

});