const CONFIG = {
  //
  whatsappNumber: "989904438303",

  // گزینه‌های مرحله 1
  step1Options: [
    "فقط دیگه یادت نره، 😂",
    " اشکالی نداره کی میای 🏃",
    " باشه دفعه بعد حواست باشه 😐",
  ],

  // گزینه‌های مرحله 2
  step2Options: [
    "الان دقیق یادم نیست، بررسی می‌کنم 📝",
    " باشه، بررسی می‌کنم بهت خبر می‌دم 😂",
    " الان چک می‌کنم، بهت می‌گم 🤔",
  ],

  // گزینه‌های مرحله 3
  step3Options: [
    " باشه، بررسی می‌کنم ❤️",
    " باید ببینم شرایطت چطوره 🤔",
    " اول برو دفترچه‌تو درست کن، بعد درخواست بده! 😂",
  ],
};

/**
 * State Management
 * ذخیره‌سازی پاسخ‌های مدیر
 */
const selectedAnswers = {
  office: null,
  exams: null,
  grade: null,
};

let currentStep = 0;

/**
 * DOM Elements
 */
const progressHeader = document.getElementById("progressHeader");
const progressFill = document.getElementById("progressFill");
const stepDots = document.querySelectorAll(".step-dot");
const toastMessage = document.getElementById("toastMessage");

const step0 = document.getElementById("step0");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const step4 = document.getElementById("step4");

const btnStart = document.getElementById("btnStart");
const btnNext1 = document.getElementById("btnNext1");
const btnNext2 = document.getElementById("btnNext2");
const btnNext3 = document.getElementById("btnNext3");
const btnWhatsApp = document.getElementById("btnWhatsApp");

const optionsStep1 = document.getElementById("optionsStep1");
const optionsStep2 = document.getElementById("optionsStep2");
const optionsStep3 = document.getElementById("optionsStep3");

/**
 * Initialization
 */
document.addEventListener("DOMContentLoaded", () => {
  renderOptions(CONFIG.step1Options, optionsStep1, "office", btnNext1);
  renderOptions(CONFIG.step2Options, optionsStep2, "exams", btnNext2);
  renderOptions(CONFIG.step3Options, optionsStep3, "grade", btnNext3);

  attachEventListeners();
});

/**
 * Render Option Cards Dynamically
 */
function renderOptions(options, container, stateKey, nextButton) {
  container.innerHTML = "";
  options.forEach((optionText) => {
    const card = document.createElement("button");
    card.className = "option-card";
    card.innerText = optionText;

    card.addEventListener("click", () => {
      // Remove selection from siblings
      container
        .querySelectorAll(".option-card")
        .forEach((c) => c.classList.remove("selected"));

      // Highlight active selection
      card.classList.add("selected");

      // Save state
      selectedAnswers[stateKey] = optionText;

      // Enable Next Button
      nextButton.disabled = false;
    });

    container.appendChild(card);
  });
}

/**
 * Event Listeners
 */
function attachEventListeners() {
  btnStart.addEventListener("click", () => goToStep(1));
  btnNext1.addEventListener("click", () => handleNextStep(1));
  btnNext2.addEventListener("click", () => handleNextStep(2));
  btnNext3.addEventListener("click", () => handleNextStep(3));
  btnWhatsApp.addEventListener("click", sendWhatsAppMessage);
}

/**
 * Navigation Handler
 */
function handleNextStep(fromStep) {
  let keyToCheck = "";
  if (fromStep === 1) keyToCheck = "office";
  if (fromStep === 2) keyToCheck = "exams";
  if (fromStep === 3) keyToCheck = "grade";

  if (!selectedAnswers[keyToCheck]) {
    showToast("اول یکی از گزینه‌ها رو انتخاب کنید 😄");
    return;
  }

  goToStep(fromStep + 1);
}

/**
 * Step Transition Logic
 */
function goToStep(stepNumber) {
  // Hide current step
  const currentStepElement = document.getElementById(`step${currentStep}`);
  if (currentStepElement) {
    currentStepElement.classList.remove("active");
  }

  currentStep = stepNumber;
  const nextStepElement = document.getElementById(`step${currentStep}`);

  // Update Progress Indicator
  if (currentStep > 0 && currentStep <= 3) {
    progressHeader.classList.add("visible");
    updateProgressBar(currentStep);
  } else {
    progressHeader.classList.remove("visible");
  }

  // Prepare Step 4 Summary if reaching the end
  if (currentStep === 4) {
    populateSummary();
  }

  // Display next step with transition
  setTimeout(() => {
    if (nextStepElement) {
      nextStepElement.classList.add("active");
    }
  }, 150);
}

/**
 * Update Progress Bar UI
 */
function updateProgressBar(step) {
  const progressWidths = { 1: "33.33%", 2: "66.66%", 3: "100%" };
  progressFill.style.width = progressWidths[step];

  stepDots.forEach((dot, index) => {
    if (index + 1 <= step) {
      dot.classList.add("active");
      dot.innerText = "●";
    } else {
      dot.classList.remove("active");
      dot.innerText = "○";
    }
  });
}

/**
 * Show Custom Toast Message
 */
function showToast(message) {
  toastMessage.innerText = message;
  toastMessage.classList.add("show");
  setTimeout(() => {
    toastMessage.classList.remove("show");
  }, 2500);
}

/**
 * Populate Summary Data on Step 4
 */
function populateSummary() {
  document.getElementById("summaryOffice").innerText =
    selectedAnswers.office || "-";
  document.getElementById("summaryExams").innerText =
    selectedAnswers.exams || "-";
  document.getElementById("summaryGrade").innerText =
    selectedAnswers.grade || "-";
}

/**
 * WhatsApp Message Generator & Redirect
 */
function sendWhatsAppMessage() {
  if (!CONFIG.whatsappNumber || CONFIG.whatsappNumber === "989123456789") {
    showToast("لطفاً شماره واتساپ را در script.js تنظیم کنید");
    return;
  }

  const rawMessage = `پاسخ های مدیر
🎯 گزارش مأموریت ویژه

📕 دفترچه کارورزی:
«${selectedAnswers.office}»

📝 دو امتحان مرموز:
«${selectedAnswers.exams}»

🎯 درخواست نمره:
«${selectedAnswers.grade}»

ممنون که وقت گذاشتید 🙏❤️
اگر نکته، توضیح یا صحبتی هست که دوست دارید به من بگید:`;

  const encodedMessage = encodeURIComponent(rawMessage);
  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
}

/* -------------------------------
   لودینگ ورود به سایت
-------------------------------- */

const pageLoader = document.getElementById("pageLoader");

window.addEventListener("load", () => {
  setTimeout(() => {
    if (pageLoader) {
      pageLoader.classList.add("hide");
    }
  }, 500);
});
