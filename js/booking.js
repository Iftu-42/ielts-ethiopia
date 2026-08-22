const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz8TYPxOx19yqyIUlPTtXhbINdS-v8ZZBxrrzrYpBnUpS8CxGiW_30W2M3V_yMZvyrD/exec";
const bookingPackages = {
  starter: { service: "one-on-one", name: "Starter", price: "1,999 ETB" },
  focused: { service: "one-on-one", name: "Focused", price: "3,999 ETB" },
  complete: { service: "one-on-one", name: "Complete", price: "5,999 ETB" },
  evaluation: { service: "mock", name: "IELTS Evaluation Package", price: "500 ETB" },
  report: { service: "mock", name: "IELTS Report Package", price: "600 ETB" },
  premium: { service: "mock", name: "IELTS Premium Coaching Package", price: "800 ETB" },
  listening: { service: "skill", name: "Listening Package", price: "200 ETB" },
  reading: { service: "skill", name: "Reading Package", price: "200 ETB" },
  writing: { service: "skill", name: "Writing Package", price: "300 ETB" },
  speaking: { service: "skill", name: "Speaking Package", price: "300 ETB" },
  consultation: { service: "consultation", name: "15-Minute Consultation", price: "100 ETB" }
};

const serviceNames = {
  "one-on-one": "1-on-1 Coaching",
  mock: "Mock & Evaluation",
  skill: "Individual Skill Test",
  consultation: "15-Minute Consultation"
};

const servicePackages = {
  "one-on-one": ["starter", "focused", "complete"],
  mock: ["evaluation", "report", "premium"],
  skill: ["listening", "reading", "writing", "speaking"],
  consultation: ["consultation"]
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  if (!form) return;

  let currentStep = 1;
  let selectedService = "";
  let selectedPackage = "";

  const packageSelector = document.getElementById("packageSelector");
  const nextButtons = document.querySelectorAll(".next-step");
  const prevButtons = document.querySelectorAll(".prev-step");
  const mockNote = document.getElementById("mockScheduleNote");

  const summaryEmpty = document.getElementById("summaryEmpty");
  const summaryContent = document.getElementById("summaryContent");
  const summaryService = document.getElementById("summaryService");
  const summaryPackage = document.getElementById("summaryPackage");
  const summaryPrice = document.getElementById("summaryPrice");

  const urlParams = new URLSearchParams(window.location.search);
  const initialPackage = urlParams.get("package");
  const initialService = urlParams.get("service");

  function setStep(step) {
    currentStep = step;
    document.querySelectorAll("[data-step-panel]").forEach(panel => {
      panel.classList.toggle("active", Number(panel.dataset.stepPanel) === step);
    });
    document.querySelectorAll(".step").forEach(el => {
      el.classList.toggle("active", Number(el.dataset.step) <= step);
    });
    window.scrollTo({ top: 220, behavior: "smooth" });
    if (window.lucide) lucide.createIcons();
  }

  function renderPackages(service) {
    const keys = servicePackages[service] || [];
    if (!keys.length) {
      packageSelector.classList.add("hidden");
      return;
    }

    if (service === "consultation") {
      selectedPackage = "consultation";
      packageSelector.innerHTML = `
        <div class="package-select-title">Selected service</div>
        <div class="package-option-grid">
          <button type="button" class="package-option selected" data-package="consultation">
            <strong>15-Minute Consultation</strong><span>100 ETB</span>
          </button>
        </div>`;
      packageSelector.classList.remove("hidden");
      updateSummary();
      return;
    }

    packageSelector.innerHTML = `
      <div class="package-select-title">Choose a package</div>
      <div class="package-option-grid">
        ${keys.map(key => `
          <button type="button" class="package-option ${key === selectedPackage ? "selected" : ""}" data-package="${key}">
            <strong>${bookingPackages[key].name}</strong>
            <span>${bookingPackages[key].price}</span>
          </button>
        `).join("")}
      </div>`;

    packageSelector.classList.remove("hidden");

    packageSelector.querySelectorAll(".package-option").forEach(button => {
      button.addEventListener("click", () => {
        selectedPackage = button.dataset.package;
        packageSelector.querySelectorAll(".package-option").forEach(item => item.classList.remove("selected"));
        button.classList.add("selected");
        updateSummary();
        updateContinueState();
      });
    });

    if (window.lucide) lucide.createIcons();
  }

  function updateContinueState() {
    const button = document.querySelector('[data-step-panel="1"] .next-step');
    button.disabled = !selectedService || !selectedPackage;
  }

  function updateSummary() {
    if (!selectedPackage) {
      summaryEmpty.classList.remove("hidden");
      summaryContent.classList.add("hidden");
      return;
    }

    const selected = bookingPackages[selectedPackage];
    summaryEmpty.classList.add("hidden");
    summaryContent.classList.remove("hidden");
    summaryService.textContent = serviceNames[selected.service];
    summaryPackage.textContent = selected.name;
    summaryPrice.textContent = selected.price;
  }

  function configureAgreement() {
    const isMock = selectedService === "mock";
    mockNote.classList.toggle("hidden", !isMock);
  }

  document.querySelectorAll(".service-choice").forEach(button => {
    button.addEventListener("click", () => {
      selectedService = button.dataset.service;
      selectedPackage = "";
      document.querySelectorAll(".service-choice").forEach(item => item.classList.remove("selected"));
      button.classList.add("selected");
      renderPackages(selectedService);
      updateSummary();
      updateContinueState();
    });
  });

  nextButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (currentStep === 1 && (!selectedService || !selectedPackage)) return;
      if (currentStep === 2) {
        const stepTwo = document.querySelector('[data-step-panel="2"]');
        const fields = stepTwo.querySelectorAll("input[required]");
        if (![...fields].every(field => field.reportValidity())) return;
      }
      if (currentStep < 3) {
        if (currentStep === 2) configureAgreement();
        setStep(currentStep + 1);
      }
    });
  });

  prevButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (currentStep > 1) setStep(currentStep - 1);
    });
  });

  // Step 3 is agreement-only. Dates and times are assigned manually after the request.

  form.addEventListener("submit", async event => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const status = document.getElementById("bookingStatus");
    status.textContent = "Submitting your booking...";

    const data = Object.fromEntries(new FormData(form).entries());
    const bookingId = `IE-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;

    const booking = {
      bookingId,
      createdAt: new Date().toISOString(),
      service: selectedService,
      package: selectedPackage,
      packageName: bookingPackages[selectedPackage].name,
      price: bookingPackages[selectedPackage].price,
      ...data,
      status: "NEW"
    };

   try {
  const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(booking)
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Booking submission failed.");
  }

} catch (error) {
  console.error("Booking submission error:", error);
  status.textContent = "We couldn't submit your booking. Please try again.";
  return;
}
    localStorage.setItem(`ielts_booking_${bookingId}`, JSON.stringify(booking));

    document.getElementById("bookingId").textContent = bookingId;
    form.classList.add("hidden");
    document.querySelector(".stepper").classList.add("hidden");
    document.getElementById("bookingSuccess").classList.remove("hidden");
    document.getElementById("bookingStatus").textContent = "";
    if (window.lucide) lucide.createIcons();
  });

  // Support links coming from package details or direct consultation CTA.
  if (initialPackage && bookingPackages[initialPackage]) {
    selectedPackage = initialPackage;
    selectedService = bookingPackages[initialPackage].service;

    document.querySelectorAll(".service-choice").forEach(item => {
      item.classList.toggle("selected", item.dataset.service === selectedService);
    });

    renderPackages(selectedService);
    updateSummary();
    updateContinueState();

    const option = packageSelector.querySelector(`[data-package="${initialPackage}"]`);
    if (option) option.classList.add("selected");
  } else if (initialService && serviceNames[initialService]) {
    selectedService = initialService;
    document.querySelectorAll(".service-choice").forEach(item => {
      item.classList.toggle("selected", item.dataset.service === selectedService);
    });
    renderPackages(selectedService);
    updateSummary();
    updateContinueState();
  }

  if (window.lucide) lucide.createIcons();
});
