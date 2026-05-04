// Navegación suave
// Navegación suave desde el botón del hero (con animación más lenta)
function scrollToSection(id) {
    const seccion = document.getElementById(id);
    if (seccion) {
        smoothScrollTo(seccion, 1200); // 1200 ms = 1.2s
    }
}

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const navbar = document.getElementById('navbar');
    if (window.scrollY > hero.offsetHeight - 80) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }
});
// Transición suave y lenta para los enlaces internos (NavBar y demás links con #)
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                smoothScrollTo(target, 1200); // podés subir o bajar este valor
            }
        }
    });
});


// Tips aleatorios
const tips = [
    "Hacé 5 respiraciones profundas ahora mismo",
    "Escribí 3 cosas por las que estás agradecido hoy",
    "Estirá tu cuerpo por 2 minutos",
    "Tomá un vaso de agua y prestale atención a cada sorbo",
    "Mirá por la ventana durante 1 minuto sin pensar en nada",
    "Escuchá tu canción favorita con los ojos cerrados",
    "Enviá un mensaje amable a alguien que querés",
    "Apagá las notificaciones por 30 minutos",
    "Hacé una lista de cosas que te hacen feliz",
    "Sonreí. Aunque sea forzado, tu cerebro responde positivo"
];

function generateRandomTip() {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    document.getElementById('randomTip').innerHTML =
        `<p class="random-tip-text">${randomTip}</p>`;
}

// Simulación de sonidos
let currentSound = null;

function toggleSound(sound) {
    const buttons = document.querySelectorAll('.sound-btn');
    buttons.forEach(btn => btn.classList.remove('playing'));

    // Parar todos los sonidos
    document.getElementById('audio-lluvia').pause();
    document.getElementById('audio-olas').pause();
    document.getElementById('audio-bosque').pause();
    document.getElementById('audio-lluvia').currentTime = 0;
    document.getElementById('audio-olas').currentTime = 0;
    document.getElementById('audio-bosque').currentTime = 0;

    if (sound === 'parar') {
        currentSound = null;
        return;
    }

    currentSound = sound;
    event.target.classList.add('playing');

    switch (sound) {
        case 'lluvia':
            document.getElementById('audio-lluvia').play();
            break;
        case 'olas':
            document.getElementById('audio-olas').play();
            break;
        case 'bosque':
            document.getElementById('audio-bosque').play();
            break;
    }
}

const stressQuestions = [
    {
        key: 'relajacion',
        text: 'Me cuesta relajarme o “desconectar la cabeza”.'
    },
    {
        key: 'tiempo',
        text: 'Siento que tengo demasiadas cosas para hacer y poco tiempo.'
    },
    {
        key: 'cansancio',
        text: 'Me siento cansado/a aunque haya dormido.'
    },
    {
        key: 'humor',
        text: 'Me siento irritable o de mal humor sin saber bien por qué.'
    },
    {
        key: 'concentracion',
        text: 'Me cuesta concentrarme en lo que estoy haciendo.'
    },
    {
        key: 'tension',
        text: 'Siento tensión en el cuerpo (cuello, espalda, mandíbula, etc.).'
    },
    {
        key: 'preocupacion',
        text: 'Me preocupo mucho por cosas que todavía no pasaron.'
    },
    {
        key: 'limite',
        text: 'Siento que estoy “al límite” o a punto de explotar.'
    }
];

const stressScaleOptions = [
    { label: 'Nunca', value: 0 },
    { label: 'Casi nunca', value: 1 },
    { label: 'A veces', value: 2 },
    { label: 'A menudo', value: 3 },
    { label: 'Casi siempre', value: 4 }
];

let stressCurrentIndex = 0;
let stressAnswers = new Array(stressQuestions.length).fill(null);

function renderStressQuestion() {
    const q = stressQuestions[stressCurrentIndex];
    const questionTextEl = document.getElementById('stressQuestionText');
    const optionsEl = document.getElementById('stressOptions');
    const stepTextEl = document.getElementById('stressStepText');
    const barFill = document.getElementById('stressBarFill');
    const prevBtn = document.getElementById('stressPrevBtn');
    const nextBtn = document.getElementById('stressNextBtn');

    questionTextEl.textContent = q.text;
    stepTextEl.textContent = `Pregunta ${stressCurrentIndex + 1} de ${stressQuestions.length}`;

    const progress = ((stressCurrentIndex) / (stressQuestions.length)) * 100;
    barFill.style.width = `${progress}%`;

    let html = '';
    stressScaleOptions.forEach(opt => {
        const id = `q${stressCurrentIndex}_${opt.value}`;
        const checked = stressAnswers[stressCurrentIndex] === opt.value ? 'checked' : '';
        html += `
      <label for="${id}">
        <input type="radio" id="${id}" name="stress_q" value="${opt.value}" ${checked}>
        ${opt.label}
      </label>
    `;
    });
    optionsEl.innerHTML = html;

    prevBtn.disabled = stressCurrentIndex === 0;
    nextBtn.textContent = (stressCurrentIndex === stressQuestions.length - 1)
        ? 'Ver resultado'
        : 'Siguiente';
}

function captureStressAnswer() {
    const selected = document.querySelector('input[name="stress_q"]:checked');
    if (!selected) {
        return null;
    }
    const value = parseInt(selected.value, 10);
    stressAnswers[stressCurrentIndex] = value;
    return value;
}

function nextStressQuestion() {
    const val = captureStressAnswer();
    if (val === null) {
        alert('Elegí una opción para continuar.');
        return;
    }

    if (stressCurrentIndex < stressQuestions.length - 1) {
        stressCurrentIndex++;
        renderStressQuestion();
    } else {
        showStressResult();
    }
}

function prevStressQuestion() {
    if (stressCurrentIndex > 0) {
        stressCurrentIndex--;
        renderStressQuestion();
    }
}

function showStressResult() {
    const total = stressAnswers.reduce((acc, v) => acc + v, 0);
    const max = stressQuestions.length * 4;
    const resultBox = document.getElementById('stressResult');
    const titleEl = resultBox.querySelector('.result-title');
    const scoreEl = resultBox.querySelector('.result-score');
    const textEl = resultBox.querySelector('.result-text');
    const tipsEl = document.getElementById('stressTips');

    let title = '';
    let text = '';

    if (total <= 8) {
        title = 'Nivel de estrés bajo';
        text = 'Parece que, en general, estás manejando bien el estrés. Igual vale la pena seguir cuidando tus momentos de pausa.';
    } else if (total <= 20) {
        title = 'Nivel de estrés moderado';
        text = 'El estrés está presente en tu día a día. Pequeños cambios y pausas conscientes pueden ayudarte a sentirte mejor.';
    } else {
        title = 'Nivel de estrés alto';
        text = 'Tu nivel de estrés parece elevado. No tenés que manejar todo solo: pedir ayuda y hacer cambios es una buena idea.';
    }

    titleEl.textContent = title;
    scoreEl.textContent = `Tu puntaje: ${total} de ${max}`;
    textEl.textContent = text;

    // Consejos personalizados según respuestas altas (3 o 4)
    const tips = [];

    const getVal = key => {
        const idx = stressQuestions.findIndex(q => q.key === key);
        return stressAnswers[idx];
    };

    if (getVal('cansancio') >= 3 || getVal('relajacion') >= 3) {
        tips.push({
            title: 'Sueño y descanso',
            text: 'Probá fijar una hora aproximada para irte a dormir, bajar pantallas 30 minutos antes y hacer 3 minutos de respiración profunda antes de acostarte.'
        });
    }

    if (getVal('tension') >= 3) {
        tips.push({
            title: 'Tensión en el cuerpo',
            text: 'Sumá micro-pausas de estiramiento (cuello, hombros, espalda) cada 60–90 minutos, o una mini caminata de 5 minutos.'
        });
    }

    if (getVal('preocupacion') >= 3 || getVal('limite') >= 3) {
        tips.push({
            title: 'Preocupaciones y sensación de “límite”',
            text: 'Escribí en una hoja lo que te preocupa y diferenciá qué podés hacer hoy y qué no depende de vos. Compartirlo con alguien de confianza también ayuda.'
        });
    }

    if (getVal('tiempo') >= 3 || getVal('concentracion') >= 3) {
        tips.push({
            title: 'Organización y foco',
            text: 'Elegí solo 1–2 prioridades por franja del día, quitá notificaciones mientras estudiás y hacé pausas cortas cada 25–30 minutos.'
        });
    }

    if (getVal('humor') >= 3 && tips.length === 0) {
        tips.push({
            title: 'Estados de ánimo',
            text: 'Registrar cómo te sentís a lo largo del día (por ejemplo en notas del celu) puede ayudarte a detectar qué cosas te cargan y qué cosas te alivian.'
        });
    }

    // Si no hay ningún tip específico, sumá uno general
    if (tips.length === 0) {
        tips.push({
            title: 'Cuidar el equilibrio',
            text: 'Seguí sumando momentos que te hagan bien: movimiento suave, conexión con gente que querés y espacios sin pantallas.'
        });
    }

    tipsEl.innerHTML = tips.map(t => `
    <div class="stress-tip-card">
      <h4>${t.title}</h4>
      <p>${t.text}</p>
    </div>
  `).join('');

    resultBox.style.display = 'block';
    document.getElementById('stressWizard').scrollIntoView({ behavior: 'smooth' });
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const wizard = document.getElementById('stressWizard');
    if (wizard) {
        renderStressQuestion();
    }
});

// Scroll suave personalizado con duración controlada
function smoothScrollTo(targetElement, duration = 1000) {
    const start = window.pageYOffset;
    const targetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const distance = targetTop - start;
    const startTime = performance.now();

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function animation(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutQuad(progress);

        window.scrollTo(0, start + distance * ease);

        if (elapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

function toggleNav() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('open');
}

// Dropdown menu - toggle en mobile
document.addEventListener('DOMContentLoaded', () => {
    const navDropdowns = document.querySelectorAll('.nav-dropdown-toggle');
    
    navDropdowns.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            // En desktop, el navegador maneja el hover
            // En mobile, necesitamos toggle manual
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = toggle.closest('.nav-dropdown');
                dropdown.classList.toggle('open');
            }
        });
    });
});

// Cerrar menú al hacer click en un enlace del nav (en mobile)
document.querySelectorAll('#mainNav a').forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.getElementById('mainNav');
        nav.classList.remove('open');
        // Cerrar también todos los dropdowns
        document.querySelectorAll('.nav-dropdown').forEach(dd => {
            dd.classList.remove('open');
        });
    });
});


