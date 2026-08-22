document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();

  const menuButton = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.innerHTML = open
        ? '<i data-lucide="x"></i>'
        : '<i data-lucide="menu"></i>';
      lucide.createIcons();
    });
  }

  document.querySelectorAll(".brand-logo").forEach(img => {
    img.addEventListener("error", () => {
      img.style.display = "none";
      const fallback = img.nextElementSibling;
      if (fallback) fallback.style.display = "block";
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});
