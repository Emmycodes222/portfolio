
document.addEventListener("DOMContentLoaded", () => {

    //  1. FOOTER YEAR
  const yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();


    //  2. CURSOR GLOW  (follows the mouse on desktop)
  const cursorGlow = document.getElementById("cursorGlow");

  if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top  = `${e.clientY}px`;
    });
  }
    //  3. STICKY HEADER — add/remove "scrolled" class
  const header = document.getElementById("header");

  function toggleHeaderStyle() {
    header.classList.toggle("scrolled", window.scrollY > 30);
  }

  window.addEventListener("scroll", toggleHeaderStyle, { passive: true });
  toggleHeaderStyle(); // run once on load

    //  4. ACTIVE NAV LINK — highlight the current section in the navbar
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

    //  5. CLOSE MOBILE MENU ON LINK CLICK
  const navToggle = document.getElementById("nav-toggle");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navToggle) navToggle.checked = false;
    });
  });

    //  6. SCROLL REVEAL — fade elements in as they enter the viewport
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