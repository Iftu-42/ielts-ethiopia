document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const id = `MSG-${Date.now()}`;
    localStorage.setItem(`ielts_contact_${id}`, JSON.stringify({
      id,
      createdAt: new Date().toISOString(),
      ...data
    }));
    document.getElementById("contactStatus").textContent =
      "Your message has been recorded. The live Google Sheets connection will be enabled when the backend is connected.";
    form.reset();
  });
});
