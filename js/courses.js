const packages = {
  starter: {
    category: "1-ON-1 COACHING",
    title: "Starter",
    price: "1,999 ETB",
    description: "A focused starting package for students who want personalized guidance, assessment and practical preparation.",
    features: [
      "Personalized assessment",
      "4 one-on-one sessions",
      "1 full mock test",
      "Performance analysis",
      "Personalized recommendations"
    ],
    note: "Sessions and mock test are scheduled through the booking process."
  },
  focused: {
    category: "1-ON-1 COACHING",
    title: "Focused",
    price: "3,999 ETB",
    description: "A structured preparation package for students who want more practice, individual feedback and progress tracking.",
    features: [
      "Personalized study plan",
      "8 one-on-one sessions",
      "2 full mock tests",
      "Individual feedback",
      "Four-skill preparation",
      "Progress tracking"
    ],
    note: "Recommended for students who want a balanced and structured preparation period."
  },
  complete: {
    category: "1-ON-1 COACHING",
    title: "Complete",
    price: "5,999 ETB",
    description: "Complete personalized IELTS preparation from assessment through final readiness.",
    features: [
      "Complete personalized IELTS preparation",
      "12 one-on-one sessions",
      "3 full mock tests",
      "Writing feedback",
      "Speaking practice",
      "Listening & Reading strategies",
      "Progress tracking",
      "Final readiness assessment"
    ],
    note: "This package includes the broadest level of personalized preparation."
  },
  evaluation: {
    category: "MOCK & EVALUATION",
    title: "IELTS Evaluation Package",
    price: "600 ETB",
    description: "A practical IELTS-style evaluation designed to identify your performance across the four skills.",
    features: [
      "Individual Listening score",
      "Individual Reading score",
      "Writing evaluation and feedback",
      "One-to-one Speaking test",
      "Speaking feedback"
    ],
    note: "Available Friday, Saturday and Sunday. Results are delivered within 24 hours."
  },
  report: {
    category: "MOCK & EVALUATION",
    title: "IELTS Report Package",
    price: "700 ETB",
    description: "Receive an IELTS-style performance report with individual bands and an estimated overall IELTS band.",
    features: [
      "IELTS-style result report",
      "Listening band score",
      "Reading band score",
      "Writing band score",
      "Speaking band score",
      "Overall estimated IELTS band score",
      "Strengths and areas for improvement"
    ],
    note: "Available Friday, Saturday and Sunday. Results are delivered within 24 hours."
  },
  premium: {
    category: "MOCK & EVALUATION",
    title: "IELTS Premium Coaching Package",
    price: "800 ETB",
    description: "A complete evaluation plus a short coaching session to help you understand your mistakes and plan your next steps.",
    features: [
      "Everything in IELTS Report Package",
      "15-minute one-to-one consultation",
      "Detailed discussion about your mistakes",
      "Personalized improvement plan",
      "IELTS preparation guidance"
    ],
    note: "Available Friday, Saturday and Sunday. Results are delivered within 24 hours."
  },
  listening: {
    category: "INDIVIDUAL SKILL TEST",
    title: "Listening Package",
    price: "250 ETB",
    description: "A full IELTS-style Listening test for students who want to assess this skill independently.",
    features: [
      "Full IELTS-style Listening test",
      "4 sections",
      "40 questions",
      "Individual score",
      "Performance feedback",
      "Estimated band score"
    ],
    note: "The estimated band is for preparation purposes and is not an official IELTS result."
  },
  reading: {
    category: "INDIVIDUAL SKILL TEST",
    title: "Reading Package",
    price: "250 ETB",
    description: "A full IELTS-style Reading test with individual performance feedback.",
    features: [
      "Full IELTS-style Reading test",
      "3 sections",
      "40 questions",
      "Individual score",
      "Performance feedback",
      "Estimated band score"
    ],
    note: "The estimated band is for preparation purposes and is not an official IELTS result."
  },
  writing: {
    category: "INDIVIDUAL SKILL TEST",
    title: "Writing Package",
    price: "300 ETB",
    description: "Get detailed evaluation of both IELTS Writing tasks with feedback you can act on.",
    features: [
      "IELTS-style Writing test",
      "Task 1",
      "Task 2",
      "Detailed evaluation",
      "Individual feedback",
      "Estimated band score",
      "Strengths and areas for improvement"
    ],
    note: "The estimated band is for preparation purposes and is not an official IELTS result."
  },
  speaking: {
    category: "INDIVIDUAL SKILL TEST",
    title: "Speaking Package",
    price: "300 ETB",
    description: "A complete IELTS-style Speaking test covering all three parts with detailed feedback.",
    features: [
      "Full IELTS-style Speaking test",
      "Part 1 — Introduction & Interview",
      "Part 2 — Individual Long Turn",
      "Part 3 — Discussion",
      "Speaking evaluation",
      "Detailed feedback",
      "Estimated band score",
      "Strengths and areas for improvement"
    ],
    note: "The estimated band is for preparation purposes and is not an official IELTS result."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("packageModal");
  if (!modal) return;

  const title = document.getElementById("modalTitle");
  const category = document.getElementById("modalCategory");
  const price = document.getElementById("modalPrice");
  const description = document.getElementById("modalDescription");
  const features = document.getElementById("modalFeatures");
  const note = document.getElementById("modalNote");
  const book = document.getElementById("modalBook");
  const closeButton = modal.querySelector(".modal-close");

  function openModal(key) {
    const data = packages[key];
    if (!data) return;

    category.textContent = data.category;
    title.textContent = data.title;
    price.textContent = data.price;
    description.textContent = data.description;
    features.innerHTML = data.features.map(item => `<li>${item}</li>`).join("");
    note.textContent = data.note;
    book.href = `booking.html?package=${encodeURIComponent(key)}`;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".details-btn").forEach(button => {
    button.addEventListener("click", () => openModal(button.dataset.package));
  });

  closeButton.addEventListener("click", closeModal);
  modal.addEventListener("click", event => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();
  });
});
