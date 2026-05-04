// ==================== ZEN SPACE - Nuevas Funcionalidades ====================

// PESTAÑAS (TABS)
function switchZenView(viewName) {
    // Ocultar todas las vistas
    document.querySelectorAll('.zen-view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Deseleccionar todos los botones
    document.querySelectorAll('.zen-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar la vista seleccionada
    document.getElementById(`zen-${viewName}`).classList.add('active');
    
    // Activar botón correspondiente
    event.target.classList.add('active');
}

// TEMPORIZADOR
let timerInterval = null;
let timerRunning = false;
let totalSeconds = 300; // 5 minutos por defecto
let remainingSeconds = 300;

function updateTimerDisplay() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    
    document.querySelector('.timer-minutes').textContent = 
        String(minutes).padStart(2, '0');
    document.querySelector('.timer-seconds').textContent = 
        String(seconds).padStart(2, '0');
}

function startTimer() {
    if (timerRunning) return;
    
    // Leer valores de los inputs
    const minutes = parseInt(document.getElementById('timerMinutes').value) || 5;
    const seconds = parseInt(document.getElementById('timerSeconds').value) || 0;
    
    if (!timerRunning) {
        totalSeconds = minutes * 60 + seconds;
        remainingSeconds = totalSeconds;
    }
    
    timerRunning = true;
    
    timerInterval = setInterval(() => {
        if (remainingSeconds > 0) {
            remainingSeconds--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            timerRunning = false;
            alert('¡Tu sesión de meditación ha terminado! Que sigas respirando profundo.');
        }
    }, 1000);
}

function pauseTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerRunning = false;
    }
}

function resetTimer() {
    pauseTimer();
    const minutes = parseInt(document.getElementById('timerMinutes').value) || 5;
    const seconds = parseInt(document.getElementById('timerSeconds').value) || 0;
    totalSeconds = minutes * 60 + seconds;
    remainingSeconds = totalSeconds;
    updateTimerDisplay();
}

// Actualizar display cuando cambien los inputs
document.addEventListener('DOMContentLoaded', () => {
    const minutesInput = document.getElementById('timerMinutes');
    const secondsInput = document.getElementById('timerSeconds');
    
    if (minutesInput && secondsInput) {
        minutesInput.addEventListener('change', resetTimer);
        secondsInput.addEventListener('change', resetTimer);
    }
});

// AFFIRMACIONES
const affirmations = [
    "Estoy en paz conmigo mismo.",
    "Mi mente está tranquila y enfocada.",
    "Merezco tiempo para descansar y relajarme.",
    "Cada respiración me calma más.",
    "Soy capaz de manejar lo que viene.",
    "Mi cuerpo se relaja completamente.",
    "Estoy presente en este momento.",
    "La calma es mi estado natural.",
    "Tengo todo lo que necesito en este momento.",
    "Mi corazón late con paz y serenidad.",
    "Elijo soltar lo que no puedo controlar.",
    "Soy más fuerte de lo que creo.",
    "Este es mi espacio seguro.",
    "Respiro con gratitud y calma.",
    "Mi mente es un lugar tranquilo.",
    "Merezco sentirme bien.",
    "Cada día es una nueva oportunidad.",
    "La paz viene desde adentro.",
    "Cuido mi salud mental con amor.",
    "Estoy exactamente donde necesito estar."
];

function getRandomAffirmation() {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    const affirmation = affirmations[randomIndex];
    
    document.getElementById('affirmationText').textContent = affirmation;
    document.getElementById('zenAffirmation').textContent = `"${affirmation}"`;
}

// CANVAS - Visualización interactiva (burbujas flotantes - Hojas verdes)
function initZenCanvas() {
    const canvas = document.getElementById('zen-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Ajustar canvas al tamaño de la ventana
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Dibujar fondo con gradiente verde oscuro
        const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGradient.addColorStop(0, 'rgba(13, 31, 31, 0.3)');
        bgGradient.addColorStop(0.5, 'rgba(13, 49, 13, 0.2)');
        bgGradient.addColorStop(1, 'rgba(15, 36, 16, 0.3)');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Crear burbujas que suben desde abajo
    const bubbles = [];
    const bubbleCount = 70;
    
    class Bubble {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 20; // Empiezan debajo
            this.radius = Math.random() * 20 + 10; // Burbujas más grandes
            this.speedX = (Math.random() - 0.5) * 1; // Movimiento lateral leve
            this.speedY = -(Math.random() * 0.5 + 0.3); // Suben
            this.opacity = Math.random() * 0.2 + 0.1;
            this.wobble = Math.random() * Math.PI * 2; // Para efecto de oscilación
            this.wobbleSpeed = Math.random() * 0.03 + 0.01;
            this.color = Math.random() > 0.5 ? '#4ade80' : '#22c55e'; // Verde claro u oscuro
        }
        
        update() {
            this.x += this.speedX + Math.sin(this.wobble) * 0.3; // Movimiento ondulante
            this.y += this.speedY;
            this.wobble += this.wobbleSpeed;
            
            // Si sube mucho, reiniciar desde abajo
            if (this.y < -this.radius * 2) {
                this.y = canvas.height + 20;
                this.x = Math.random() * canvas.width;
                this.opacity = Math.random() * 0.2 + 0.1;
                this.color = Math.random() > 0.5 ? '#4ade80' : '#22c55e';
            }
        }
        
        draw() {
            // Dibujar burbuja (hoja) con color verde
            ctx.fillStyle = `rgba(74, 222, 128, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Borde de la burbuja con verde más claro
            ctx.strokeStyle = `rgba(16, 185, 129, ${this.opacity * 0.7})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Brillo en la parte superior (verde más luminoso)
            const glowGradient = ctx.createLinearGradient(
                this.x - this.radius/2, 
                this.y - this.radius/2, 
                this.x + this.radius/2, 
                this.y + this.radius/2
            );
            glowGradient.addColorStop(0, `rgba(74, 222, 128, ${this.opacity * 0.4})`);
            glowGradient.addColorStop(1, `rgba(16, 185, 129, ${this.opacity * 0.2})`);
            ctx.fillStyle = glowGradient;
            ctx.beginPath();
            ctx.arc(this.x - this.radius/3, this.y - this.radius/3, this.radius/3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Inicializar burbujas
    for (let i = 0; i < bubbleCount; i++) {
        bubbles.push(new Bubble());
    }
    
    // Animación
    function animate() {
        // Limpiar y redibujar fondo
        const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGradient.addColorStop(0, 'rgba(13, 31, 31, 0.3)');
        bgGradient.addColorStop(0.5, 'rgba(13, 49, 13, 0.2)');
        bgGradient.addColorStop(1, 'rgba(15, 36, 16, 0.3)');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        bubbles.forEach(bubble => {
            bubble.update();
            bubble.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Inicializar canvas cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    initZenCanvas();
    getRandomAffirmation(); // Mostrar affirmación inicial
    updateTimerDisplay(); // Mostrar tiempo inicial del temporizador
});
