document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("js");

  const header = document.querySelector(".site-header");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const navItems = [...document.querySelectorAll(".nav-link")];
  const sections = [...document.querySelectorAll("main section[id]")];
  const year = document.getElementById("footer-year");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (year) year.textContent = new Date().getFullYear();

  const closeMenu = () => {
    if (!menuToggle || !navLinks) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navLinks.classList.remove("is-open");
  };

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
      navLinks.classList.toggle("is-open", !isOpen);
    });

    navItems.forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        menuToggle.focus();
      }
    });
    document.addEventListener("click", (event) => {
      if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 680) closeMenu();
    });
  }

  let scrollQueued = false;
  const updateScrollState = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);

    const marker = window.innerHeight * 0.34;
    const activeSection = [...sections].reverse().find((section) => (
      section.getBoundingClientRect().top <= marker
      && navItems.some((link) => link.getAttribute("href") === `#${section.id}`)
    )) || sections[0];

    const activeId = activeSection ? activeSection.id : "home";
    navItems.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${activeId}`;
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
      link.classList.toggle("active", isActive);
    });
    scrollQueued = false;
  };

  window.addEventListener("scroll", () => {
    if (!scrollQueued) {
      scrollQueued = true;
      window.requestAnimationFrame(updateScrollState);
    }
  }, { passive: true });
  updateScrollState();

  const revealItems = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    if (!reduceMotion) document.querySelector(".skills")?.classList.add("motion-active");
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

  revealItems.forEach((item) => revealObserver.observe(item));

  const skillsSection = document.querySelector(".skills");
  if (skillsSection) {
    const skillsMotionObserver = new IntersectionObserver(([entry]) => {
      skillsSection.classList.toggle("motion-active", entry.isIntersecting);
    }, { threshold: 0.12 });
    skillsMotionObserver.observe(skillsSection);
  }
});
