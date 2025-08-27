// ===== Countdown Timer para Promoción =====
function startCountdown() {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);

  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = endDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");

    if (distance < 0) {
      clearInterval(timer);
      document.querySelector(".promo-banner").style.display = "none";
    }
  }, 1000);
}

// ===== Speed Test Simulation =====
let isTestRunning = false;

function simulateSpeedTest() {
  if (isTestRunning) return;

  isTestRunning = true;
  const button = document.getElementById("startTest");
  const status = document.getElementById("testStatus");
  const gaugeFill = document.getElementById("gaugeFill");
  const speedValue = document.getElementById("speedValue");
  const downloadEl = document.getElementById("downloadSpeed");
  const uploadEl = document.getElementById("uploadSpeed");
  const pingEl = document.getElementById("pingValue");

  button.disabled = true;
  button.innerHTML = '<i class="bi bi-arrow-clockwise"></i> Probando...';

  // Reset values
  downloadEl.textContent = "0.0";
  uploadEl.textContent = "0.0";
  pingEl.textContent = "...";

  let currentSpeed = 0;
  const targetDownload = Math.random() * 80 + 20; 
  const targetUpload = targetDownload * 0.3; 
  const targetPing = Math.random() * 30 + 10; 

  // Simulate test phases
  const phases = [
    "Conectando...",
    "Probando descarga...",
    "Probando subida...",
    "Probando latencia...",
    "Finalizando...",
  ];
  let phaseIndex = 0;

  const phaseInterval = setInterval(() => {
    if (phaseIndex < phases.length) {
      status.textContent = phases[phaseIndex];
      phaseIndex++;
    }
  }, 800);

  // Animate gauge
  const speedInterval = setInterval(() => {
    currentSpeed += Math.random() * 5;
    if (currentSpeed >= targetDownload) {
      currentSpeed = targetDownload;
      clearInterval(speedInterval);
      clearInterval(phaseInterval);

      downloadEl.textContent = targetDownload.toFixed(1) + " Mbps";
      uploadEl.textContent = targetUpload.toFixed(1) + " Mbps";
      pingEl.textContent = targetPing.toFixed(0) + " ms";
      status.innerHTML = `<span class="text-success"><i class="bi bi-check-circle"></i> Test completado</span>`;

      button.disabled = false;
      button.innerHTML =
        '<i class="bi bi-arrow-clockwise"></i> Probar de nuevo';
      isTestRunning = false;
    }

    const rotation = (currentSpeed / 100) * 180 - 90;
    gaugeFill.style.transform = `rotate(${rotation}deg)`;
    speedValue.textContent = currentSpeed.toFixed(0) + " Mbps";
  }, 100);
}

document
  .getElementById("startTest")
  .addEventListener("click", simulateSpeedTest);

// ===== Coverage Check =====
document.getElementById("checkCoverageForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const resultDiv = document.getElementById("coverageResult");

  // Simulate checking
  setTimeout(() => {
    resultDiv.classList.remove("d-none");
    resultDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 1000);
});

// ===== Lazy Loading Images =====
const lazyImages = document.querySelectorAll(".lazy-image");
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.addEventListener("load", () => {
        img.classList.add("loaded");
      });
      if (img.complete) img.classList.add("loaded");
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach((img) => {
  imageObserver.observe(img);
});

// ===== Smooth scroll para links internos =====
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, "", id);
      }
    }
  });
});

// ===== Reel de noticias =====
const reel = document.getElementById("newsReel");
const prevBtn = document.getElementById("newsPrev");
const nextBtn = document.getElementById("newsNext");

const getScrollAmount = () => {
  const child = reel.querySelector(".news-card");
  return child ? child.getBoundingClientRect().width + 24 : 350;
};

prevBtn.addEventListener("click", () =>
  reel.scrollBy({ left: -getScrollAmount(), behavior: "smooth" })
);
nextBtn.addEventListener("click", () =>
  reel.scrollBy({ left: getScrollAmount(), behavior: "smooth" })
);

// Permite usar flechas del teclado cuando el reel tiene foco
reel.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") prevBtn.click();
  if (e.key === "ArrowRight") nextBtn.click();
});

// ===== Validación de formulario =====
(() => {
  const form = document.querySelector("#contacto form");
  const ok = document.getElementById("formOk");
  form.addEventListener(
    "submit",
    (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        ok.classList.remove("d-none");
        form.reset();
      }
      form.classList.add("was-validated");
    },
    false
  );
})();

// ===== Animaciones al hacer scroll =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observar elementos que necesitan animación
document
  .querySelectorAll(".service-card, .team-card, .news-card, .testimonial-card")
  .forEach((el) => {
    el.classList.add("fade-in-up");
    observer.observe(el);
  });

// ===== Efecto de typing para el hero =====
const heroTitle = document.querySelector(".hero-section h1");
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = "";
  let i = 0;

  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  };

  setTimeout(typeWriter, 500);
}

// ===== Contador animado para estadísticas =====
function animateCounter(element, target) {
  const increment = target / 50;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent =
        target + (element.textContent.includes("%") ? "%" : "+");
      clearInterval(timer);
    } else {
      element.textContent =
        Math.ceil(current) + (element.textContent.includes("%") ? "%" : "+");
    }
  }, 40);
}

// Iniciar contadores cuando sean visibles
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      const text = entry.target.textContent;
      const number = parseInt(text);
      if (number) {
        entry.target.dataset.animated = "true";
        animateCounter(entry.target, number);
      }
    }
  });
});

document.querySelectorAll("#contacto .fw-bold").forEach((el) => {
  if (el.textContent.match(/\d+/)) {
    statsObserver.observe(el);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  startCountdown();
});
