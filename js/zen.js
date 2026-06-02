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

// Mood recommendations
const moodRecommendations = {
  stress: {
    sounds: ["lluvia", "bosque"],
    affirmation: "Soy capaz de manejar lo que viene.",
    tips: [
      "Respira profundamente 5 veces",
      "Escucha la lluvia o el bosque",
      "Medita por 5 minutos",
      "Estira tu cuerpo suavemente"
    ]
  },
  anxiety: {
    sounds: ["olas"],
    affirmation: "Estoy a salvo en este momento.",
    tips: [
      "Escucha el sonido relajante de las olas",
      "Practica respiracion profunda",
      "Repite una afirmacion positiva",
      "Medita por 10 minutos"
    ]
  },
  tired: {
    sounds: ["lluvia"],
    affirmation: "Mi cuerpo se relaja completamente.",
    tips: [
      "Descansa tus ojos",
      "Escucha lluvia suave",
      "Respira profundamente",
      "Toma agua y relájate"
    ]
  },
  calm: {
    sounds: ["bosque", "olas"],
    affirmation: "La calma es mi estado natural.",
    tips: [
      "Mantén esta sensacion de paz",
      "Disfruta del sonido elegido",
      "Reflexiona sobre tu bienestar",
      "Sigue con tu dia con calma"
    ]
  }
};

// ============================================
// DARK MODE SUPPORT
// ============================================

function initDarkModeZen() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  }
}

// ============================================
// LOCAL STORAGE
// ============================================

function savePreferences() {
  localStorage.setItem('zenTab', currentTab);
  localStorage.setItem('zenMood', currentMood || '');
  localStorage.setItem('zenVolume', currentVolume);
  localStorage.setItem('zenLastAffirmation', lastAffirmation);
}

function loadPreferences() {
  const savedTab = localStorage.getItem('zenTab');
  const savedMood = localStorage.getItem('zenMood');
  const savedVolume = localStorage.getItem('zenVolume');
  const savedAffirmation = localStorage.getItem('zenLastAffirmation');
  
  if (savedVolume) {
    currentVolume = parseInt(savedVolume);
    const volumeSlider = document.getElementById('volume-slider');
    if (volumeSlider) {
      volumeSlider.value = currentVolume;
      updateVolumeDisplay();
    }
  }
}

// ============================================
// TAB SWITCHING
// ============================================

let currentTab = "audio";
let currentMood = null;

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
  
  savePreferences();
}

// Check URL params for initial tab
function checkUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get("tab");
  if (tabParam && ["audio", "breathing", "mood", "timer", "affirmations"].includes(tabParam)) {
    switchTab(tabParam);
  }
}

// ============================================
// AUDIO / SOUNDS
// ============================================

let currentSound = null;
let currentVolume = 70;
let audioElement = null;
let lastAffirmation = '';

// Mock audio URLs - En producción, estos serían archivos reales
const audioUrls = {
  lluvia: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
  olas: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
  bosque: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA=='
};

function toggleSound(sound) {
  const buttons = ["lluvia", "olas", "bosque"];
  const statusEl = document.getElementById("sound-status");
  const audioControls = document.getElementById("audio-controls");
  
  buttons.forEach((btn) => {
    document.getElementById(`btn-${btn}`).classList.remove("active");
  });
  
  if (currentSound === sound) {
    currentSound = null;
    if (audioElement) {
      audioElement.pause();
      audioElement = null;
    }
    statusEl.textContent = "Selecciona un sonido para comenzar";
    audioControls.style.display = "none";
  } else {
    currentSound = sound;
    document.getElementById(`btn-${sound}`).classList.add("active");
    statusEl.textContent = `Reproduciendo: ${sound}`;
    audioControls.style.display = "block";
    
    // Play audio
    playAudio(sound);
  }
  
  savePreferences();
}

function playAudio(sound) {
  if (audioElement) {
    audioElement.pause();
  }
  
  // En una aplicación real, aquí cargarías archivos de audio reales
  audioElement = new Audio(audioUrls[sound] || '');
  audioElement.loop = true;
  audioElement.volume = currentVolume / 100;
  audioElement.play().catch(() => {
    // Fallback si el audio no se puede reproducir
    console.log(`Sonido ${sound} en reproducción (simulado)`);
  });
}

function stopSound() {
  const buttons = ["lluvia", "olas", "bosque"];
  buttons.forEach((btn) => {
    document.getElementById(`btn-${btn}`).classList.remove("active");
  });
  
  if (audioElement) {
    audioElement.pause();
    audioElement = null;
  }
  
  currentSound = null;
  document.getElementById("sound-status").textContent = "Selecciona un sonido para comenzar";
  document.getElementById("audio-controls").style.display = "none";
}

// Audio controls
function updateVolumeDisplay() {
  const volumeSlider = document.getElementById('volume-slider');
  const volumeValue = document.getElementById('volume-value');
  
  if (volumeSlider) {
    currentVolume = parseInt(volumeSlider.value);
    volumeValue.textContent = currentVolume + '%';
    
    if (audioElement) {
      audioElement.volume = currentVolume / 100;
    }
    
    savePreferences();
  }
}

// ============================================
// BREATHING EXERCISE
// ============================================

let isBreathing = false;
const breathingPhases = [
  { text: "Inhala", duration: 4000 },
  { text: "Retén", duration: 4000 },
  { text: "Exhala", duration: 4000 },
  { text: "Espera", duration: 2000 }
];
let currentPhaseIndex = 0;

function toggleBreathing() {
  isBreathing = !isBreathing;
  const btn = document.querySelector('#view-breathing .zen-btn');
  const btnText = document.getElementById('breathing-btn-text');
  
  if (isBreathing) {
    btnText.textContent = 'Detener';
    startBreathingCycle();
  } else {
    btnText.textContent = 'Iniciar';
    currentPhaseIndex = 0;
  }
}

function startBreathingCycle() {
  if (!isBreathing) return;
  
  const phase = breathingPhases[currentPhaseIndex];
  const breathingText = document.getElementById('breathing-text');
  breathingText.textContent = phase.text;
  
  currentPhaseIndex = (currentPhaseIndex + 1) % breathingPhases.length;
  setTimeout(startBreathingCycle, phase.duration);
}

// ============================================
// MOOD SELECTOR & RECOMMENDATIONS
// ============================================

function setMood(mood) {
  currentMood = mood;
  
  // Update button states
  document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.classList.remove('selected');
  });
  event.target.classList.add('selected');
  
  // Show recommendations
  showRecommendations(mood);
  
  // Auto-set affirmation
  const recommendedAffirmation = moodRecommendations[mood].affirmation;
  document.getElementById('affirmation-text').textContent = recommendedAffirmation;
  document.getElementById('header-affirmation').textContent = `"${recommendedAffirmation}"`;
  lastAffirmation = recommendedAffirmation;
  
  savePreferences();
}

function showRecommendations(mood) {
  const recommendations = moodRecommendations[mood];
  const recommendationsList = document.getElementById('recommendations-list');
  
  recommendationsList.innerHTML = '';
  recommendations.tips.forEach(tip => {
    const li = document.createElement('li');
    li.textContent = tip;
    recommendationsList.appendChild(li);
  });
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
  lastAffirmation = affirmation;
  
  document.getElementById("affirmation-text").textContent = affirmation;
  document.getElementById("header-affirmation").textContent = `"${affirmation}"`;
  
  savePreferences();
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
  initDarkModeZen();
  checkUrlParams();
  initCanvas();
  updateTimerDisplay();
  loadPreferences();
  
  // Volume control
  const volumeSlider = document.getElementById('volume-slider');
  if (volumeSlider) {
    volumeSlider.addEventListener('input', updateVolumeDisplay);
  }
});
