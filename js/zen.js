// ============================================
// CALM-SPACE - ZEN PAGE SCRIPT
// ============================================

// Affirmations data
const affirmations = [
  "Estoy en paz conmigo mismo.",
  "Mi mente esta tranquila y enfocada.",
  "Merezco tiempo para descansar y relajarme.",
  "Cada respiracion me calma mas.",
  "Soy capaz de manejar lo que viene.",
  "Mi cuerpo se relaja completamente.",
  "Estoy presente en este momento.",
  "La calma es mi estado natural.",
  "Tengo todo lo que necesito en este momento.",
  "Mi corazon late con paz y serenidad.",
  "Elijo soltar lo que no puedo controlar.",
  "Soy mas fuerte de lo que creo.",
  "Este es mi espacio seguro.",
  "Respiro con gratitud y calma.",
  "Mi mente es un lugar tranquilo.",
  "Merezco sentirme bien.",
  "Cada dia es una nueva oportunidad.",
  "La paz viene desde adentro.",
  "Cuido mi salud mental con amor.",
  "Estoy exactamente donde necesito estar.",
];

// ============================================
// TAB SWITCHING
// ============================================

let currentTab = "audio";

function switchTab(tabId) {
  currentTab = tabId;
  
  // Update tab buttons
  document.querySelectorAll(".zen-tab").forEach((tab) => {
    tab.classList.remove("active");
    if (tab.dataset.tab === tabId) {
      tab.classList.add("active");
    }
  });
  
  // Update views
  document.querySelectorAll(".zen-view").forEach((view) => {
    view.classList.remove("active");
  });
  document.getElementById(`view-${tabId}`).classList.add("active");
}

// Check URL params for initial tab
function checkUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get("tab");
  if (tabParam && ["audio", "timer", "affirmations"].includes(tabParam)) {
    switchTab(tabParam);
  }
}

// ============================================
// AUDIO / SOUNDS
// ============================================

let currentSound = null;

function toggleSound(sound) {
  const buttons = ["lluvia", "olas", "bosque"];
  const statusEl = document.getElementById("sound-status");
  
  buttons.forEach((btn) => {
    document.getElementById(`btn-${btn}`).classList.remove("active");
  });
  
  if (currentSound === sound) {
    currentSound = null;
    statusEl.textContent = "Selecciona un sonido para comenzar";
  } else {
    currentSound = sound;
    document.getElementById(`btn-${sound}`).classList.add("active");
    statusEl.textContent = `Reproduciendo: ${sound}`;
  }
}

function stopSound() {
  const buttons = ["lluvia", "olas", "bosque"];
  buttons.forEach((btn) => {
    document.getElementById(`btn-${btn}`).classList.remove("active");
  });
  currentSound = null;
  document.getElementById("sound-status").textContent = "Selecciona un sonido para comenzar";
}

// ============================================
// TIMER
// ============================================

let timerInterval = null;
let remainingSeconds = 300;
let isTimerRunning = false;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateTimerDisplay() {
  document.getElementById("timer-display").textContent = formatTime(remainingSeconds);
}

function startTimer() {
  if (isTimerRunning) return;
  
  const minutes = parseInt(document.getElementById("timer-minutes").value) || 5;
  const seconds = parseInt(document.getElementById("timer-seconds").value) || 0;
  
  if (!isTimerRunning || remainingSeconds === 0) {
    remainingSeconds = minutes * 60 + seconds;
  }
  
  isTimerRunning = true;
  
  timerInterval = setInterval(() => {
    if (remainingSeconds > 0) {
      remainingSeconds--;
      updateTimerDisplay();
    } else {
      pauseTimer();
      alert("Tu sesion de meditacion ha terminado! Que sigas respirando profundo.");
    }
  }, 1000);
}

function pauseTimer() {
  isTimerRunning = false;
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function resetTimer() {
  pauseTimer();
  const minutes = parseInt(document.getElementById("timer-minutes").value) || 5;
  const seconds = parseInt(document.getElementById("timer-seconds").value) || 0;
  remainingSeconds = minutes * 60 + seconds;
  updateTimerDisplay();
}

// ============================================
// AFFIRMATIONS
// ============================================

function getRandomAffirmation() {
  const randomIndex = Math.floor(Math.random() * affirmations.length);
  const affirmation = affirmations[randomIndex];
  
  document.getElementById("affirmation-text").textContent = affirmation;
  document.getElementById("header-affirmation").textContent = `"${affirmation}"`;
}

// ============================================
// CANVAS ANIMATION
// ============================================

function initCanvas() {
  const canvas = document.getElementById("zen-canvas");
  const ctx = canvas.getContext("2d");
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  
  // Bubbles
  const bubbles = [];
  
  for (let i = 0; i < 70; i++) {
    bubbles.push({
      x: Math.random() * canvas.width,
      y: canvas.height + 20 + Math.random() * canvas.height,
      radius: Math.random() * 20 + 10,
      speedX: (Math.random() - 0.5) * 1,
      speedY: -(Math.random() * 0.5 + 0.3),
      opacity: Math.random() * 0.2 + 0.1,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.03 + 0.01,
    });
  }
  
  function animate() {
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGradient.addColorStop(0, "rgba(13, 31, 31, 0.3)");
    bgGradient.addColorStop(0.5, "rgba(13, 49, 13, 0.2)");
    bgGradient.addColorStop(1, "rgba(15, 36, 16, 0.3)");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    bubbles.forEach((bubble) => {
      bubble.x += bubble.speedX + Math.sin(bubble.wobble) * 0.3;
      bubble.y += bubble.speedY;
      bubble.wobble += bubble.wobbleSpeed;
      
      if (bubble.y < -bubble.radius * 2) {
        bubble.y = canvas.height + 20;
        bubble.x = Math.random() * canvas.width;
        bubble.opacity = Math.random() * 0.2 + 0.1;
      }
      
      ctx.fillStyle = `rgba(74, 222, 128, ${bubble.opacity})`;
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = `rgba(16, 185, 129, ${bubble.opacity * 0.7})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  checkUrlParams();
  initCanvas();
  updateTimerDisplay();
});
