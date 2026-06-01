// ============================================
// CALM-SPACE - MAIN SCRIPT
// ============================================

// Random tips data
const randomTips = [
  "Hace 5 respiraciones profundas ahora mismo",
  "Escribi 3 cosas por las que estas agradecido hoy",
  "Estira tu cuerpo por 2 minutos",
  "Toma un vaso de agua y prestale atencion a cada sorbo",
  "Mira por la ventana durante 1 minuto sin pensar en nada",
  "Escucha tu cancion favorita con los ojos cerrados",
  "Envia un mensaje amable a alguien que queres",
  "Apaga las notificaciones por 30 minutos",
  "Hace una lista de cosas que te hacen feliz",
  "Sonrei. Aunque sea forzado, tu cerebro responde positivo",
];

// ============================================
// NAVBAR
// ============================================

const navbar = document.getElementById("navbar");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileNav = document.getElementById("mobile-nav");
const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");
let isMobileMenuOpen = false;

// Show/hide navbar on scroll
function handleScroll() {
  const heroHeight = window.innerHeight * 0.8;
  if (window.scrollY > heroHeight - 80) {
    navbar.classList.add("visible");
  } else {
    navbar.classList.remove("visible");
  }
}

window.addEventListener("scroll", handleScroll);

// Mobile menu toggle
mobileMenuBtn.addEventListener("click", function () {
  isMobileMenuOpen = !isMobileMenuOpen;
  
  if (isMobileMenuOpen) {
    mobileNav.classList.add("open");
    menuIcon.classList.add("hidden");
    closeIcon.classList.remove("hidden");
  } else {
    mobileNav.classList.remove("open");
    menuIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  }
});

function closeMobileMenu() {
  isMobileMenuOpen = false;
  mobileNav.classList.remove("open");
  menuIcon.classList.remove("hidden");
  closeIcon.classList.add("hidden");
}

// Mobile zen dropdown
let isMobileZenOpen = false;

function toggleMobileZenDropdown() {
  isMobileZenOpen = !isMobileZenOpen;
  const dropdown = document.getElementById("mobile-zen-dropdown");
  const chevron = document.getElementById("mobile-zen-chevron");
  
  if (isMobileZenOpen) {
    dropdown.classList.add("open");
    chevron.style.transform = "rotate(180deg)";
  } else {
    dropdown.classList.remove("open");
    chevron.style.transform = "rotate(0deg)";
  }
}

// ============================================
// RANDOM TIP GENERATOR
// ============================================

function generateRandomTip() {
  const randomIndex = Math.floor(Math.random() * randomTips.length);
  const tipText = document.getElementById("random-tip-text");
  tipText.textContent = randomTips[randomIndex];
}
