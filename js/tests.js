// ============================================
// CALM-SPACE - TESTS PAGE SCRIPT
// ============================================

// ============================================
// TEST DATA
// ============================================

const testsData = {
  stress: {
    title: "Test de Estres",
    questions: [
      { key: "relajacion", text: "Me cuesta relajarme o 'desconectar la cabeza'." },
      { key: "tiempo", text: "Siento que tengo demasiadas cosas para hacer y poco tiempo." },
      { key: "cansancio", text: "Me siento cansado/a aunque haya dormido." },
      { key: "humor", text: "Me siento irritable o de mal humor sin saber bien por que." },
      { key: "concentracion", text: "Me cuesta concentrarme en lo que estoy haciendo." },
      { key: "tension", text: "Siento tension en el cuerpo (cuello, espalda, mandibula, etc.)." },
      { key: "preocupacion", text: "Me preocupo mucho por cosas que todavia no pasaron." },
      { key: "limite", text: "Siento que estoy 'al limite' o a punto de explotar." },
      { key: "dolor_cabeza", text: "Tengo dolores de cabeza frecuentes relacionados con la tension." },
      { key: "apetito", text: "He notado cambios en mi apetito (como comer más o menos)." },
      { key: "desconectar_trabajo", text: "Me cuesta desconectar del trabajo o de las responsabilidades al terminar el dia." },
    ],
  },
  anxiety: {
    title: "Test de Ansiedad",
    questions: [
      { key: "nervioso", text: "Me siento nervioso/a, ansioso/a o con los nervios de punta." },
      { key: "preocupacion_control", text: "No puedo dejar de preocuparme o no puedo controlar la preocupacion." },
      { key: "preocupacion_excesiva", text: "Me preocupo demasiado por diferentes cosas." },
      { key: "relajarse", text: "Tengo dificultad para relajarme." },
      { key: "inquietud", text: "Me siento tan inquieto/a que me cuesta quedarme quieto/a." },
      { key: "irritabilidad", text: "Me irrito o molesto con facilidad." },
      { key: "miedo", text: "Tengo miedo de que algo terrible pueda pasar." },
      { key: "palpitaciones", text: "Siento palpitaciones, sudoracion o malestar fisico cuando estoy ansioso/a." },
      { key: "evitar_situaciones", text: "Evito situaciones que me generan ansiedad." },
      { key: "ataque_panico", text: "He experimentado episodios intensos de miedo o 'ataques de panico'." },
    ],
  },
  adhd: {
    title: "Test de TDA/TDAH",
    questions: [
      { key: "terminar", text: "Me cuesta terminar los detalles finales de un proyecto." },
      { key: "organizar", text: "Tengo dificultad para poner las cosas en orden." },
      { key: "recordar", text: "Me cuesta recordar citas o compromisos." },
      { key: "evitar", text: "Evito o retraso empezar tareas que requieren mucho pensamiento." },
      { key: "inquieto", text: "Muevo las manos, pies, o me retuerzo cuando tengo que estar sentado/a." },
      { key: "activo", text: "Me siento demasiado activo/a, como si tuviera un motor." },
      { key: "errores", text: "Cometo errores por descuido en trabajos aburridos o dificiles." },
      { key: "atencion", text: "Me cuesta mantener la atencion en tareas repetitivas." },
      { key: "escuchar", text: "Me cuesta concentrarme cuando alguien me esta hablando directamente." },
      { key: "perder", text: "Pierdo o extravio cosas necesarias en casa o el trabajo." },
      { key: "distraer", text: "Me distraigo facilmente por ruidos o actividad alrededor." },
      { key: "levantarme", text: "Me levanto de mi asiento en situaciones donde deberia permanecer sentado/a." },
      { key: "esperar_turno", text: "Me cuesta esperar mi turno en conversaciones o en filas." },
      { key: "planificar", text: "Tengo dificultad para planificar pasos necesarios para tareas complejas." },
      { key: "finalizar_multitareas", text: "Comienzo muchas cosas a la vez y me cuesta finalizar varias." },
    ],
  },
};

const scaleOptions = [
  { label: "Nunca", value: 0 },
  { label: "Casi nunca", value: 1 },
  { label: "A veces", value: 2 },
  { label: "A menudo", value: 3 },
  { label: "Casi siempre", value: 4 },
];

// ============================================
// STATE
// ============================================

let currentTestType = null;
let currentQuestionIndex = 0;
let answers = [];

// ============================================
// TEST FLOW
// ============================================

function startTest(testType) {
  currentTestType = testType;
  currentQuestionIndex = 0;
  answers = new Array(testsData[testType].questions.length).fill(undefined);
  
  document.getElementById("test-selection").classList.add("hidden");
  document.getElementById("test-progress").classList.remove("hidden");
  document.getElementById("test-results").classList.add("hidden");
  
  // Set result background class
  const resultsEl = document.getElementById("test-results");
  resultsEl.className = `test-results hidden ${testType}`;
  
  renderQuestion();
}

function renderQuestion() {
  const test = testsData[currentTestType];
  const question = test.questions[currentQuestionIndex];
  const totalQuestions = test.questions.length;
  
  // Update progress
  document.getElementById("progress-label").textContent = `Pregunta ${currentQuestionIndex + 1} de ${totalQuestions}`;
  document.getElementById("progress-fill").style.width = `${(currentQuestionIndex / totalQuestions) * 100}%`;
  
  // Update question text
  document.getElementById("question-text").textContent = question.text;
  
  // Render options
  const optionsContainer = document.getElementById("test-options");
  optionsContainer.innerHTML = "";
  
  scaleOptions.forEach((option) => {
    const label = document.createElement("label");
    label.className = `test-option ${answers[currentQuestionIndex] === option.value ? "selected" : ""}`;
    label.innerHTML = `
      <input type="radio" name="answer" value="${option.value}" ${answers[currentQuestionIndex] === option.value ? "checked" : ""}>
      ${option.label}
    `;
    label.addEventListener("click", () => selectAnswer(option.value));
    optionsContainer.appendChild(label);
  });
  
  // Update navigation buttons
  document.getElementById("btn-prev").disabled = currentQuestionIndex === 0;
  document.getElementById("btn-next").textContent = currentQuestionIndex === totalQuestions - 1 ? "Ver resultado" : "Siguiente";
}

function selectAnswer(value) {
  answers[currentQuestionIndex] = value;
  renderQuestion();
}

function nextQuestion() {
  if (answers[currentQuestionIndex] === undefined) {
    alert("Elegi una opcion para continuar.");
    return;
  }
  
  const totalQuestions = testsData[currentTestType].questions.length;
  
  if (currentQuestionIndex < totalQuestions - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    showResults();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
}

function resetTest() {
  currentTestType = null;
  currentQuestionIndex = 0;
  answers = [];
  
  document.getElementById("test-selection").classList.remove("hidden");
  document.getElementById("test-progress").classList.add("hidden");
  document.getElementById("test-results").classList.add("hidden");
}

// ============================================
// RESULTS
// ============================================

function showResults() {
  const test = testsData[currentTestType];
  const totalScore = answers.reduce((acc, val) => acc + (val || 0), 0);
  const maxScore = test.questions.length * 4;
  
  const result = getResult(currentTestType, totalScore, answers, test.questions);
  
  // Update results display
  document.getElementById("results-title").textContent = result.title;
  document.getElementById("results-score").textContent = `Tu puntaje: ${totalScore} de ${maxScore}`;
  document.getElementById("results-description").textContent = result.text;
  
  // Render tips
  const tipsContainer = document.getElementById("results-tips");
  tipsContainer.innerHTML = "";
  result.tips.forEach((tip) => {
    const tipEl = document.createElement("div");
    tipEl.className = "test-tip";
    tipEl.innerHTML = `
      <h4 class="test-tip-title">${tip.title}</h4>
      <p class="test-tip-text">${tip.text}</p>
    `;
    tipsContainer.appendChild(tipEl);
  });
  
  // Show results
  document.getElementById("test-progress").classList.add("hidden");
  const resultsEl = document.getElementById("test-results");
  resultsEl.className = `test-results ${currentTestType}`;
  resultsEl.classList.remove("hidden");
}

function getResult(testType, score, answers, questions) {
  const getVal = (key) => {
    const idx = questions.findIndex((q) => q.key === key);
    return answers[idx] || 0;
  };
  
  let title = "";
  let text = "";
  const tips = [];
  
  if (testType === "stress") {
    if (score <= 8) {
      title = "Nivel de estres bajo";
      text = "Parece que, en general, estas manejando bien el estres. Igual vale la pena seguir cuidando tus momentos de pausa.";
    } else if (score <= 20) {
      title = "Nivel de estres moderado";
      text = "El estres esta presente en tu dia a dia. Pequenos cambios y pausas conscientes pueden ayudarte a sentirte mejor.";
    } else {
      title = "Nivel de estres alto";
      text = "Tu nivel de estres parece elevado. No tenes que manejar todo solo: pedir ayuda y hacer cambios es una buena idea.";
    }
    
    if (getVal("cansancio") >= 3 || getVal("relajacion") >= 3) {
      tips.push({
        title: "Sueno y descanso",
        text: "Proba fijar una hora aproximada para irte a dormir, bajar pantallas 30 minutos antes y hacer 3 minutos de respiracion profunda.",
      });
    }
    if (getVal("tension") >= 3) {
      tips.push({
        title: "Tension en el cuerpo",
        text: "Suma micro-pausas de estiramiento cada 60-90 minutos, o una mini caminata de 5 minutos.",
      });
    }
    if (getVal("preocupacion") >= 3 || getVal("limite") >= 3) {
      tips.push({
        title: "Preocupaciones",
        text: "Escribi lo que te preocupa y diferencia que podes hacer hoy y que no depende de vos.",
      });
    }
    if (getVal("tiempo") >= 3 || getVal("concentracion") >= 3) {
      tips.push({
        title: "Organizacion y foco",
        text: "Elegi solo 1-2 prioridades por franja del dia y hace pausas cortas cada 25-30 minutos.",
      });
    }
  } else if (testType === "anxiety") {
    if (score <= 4) {
      title = "Ansiedad minima";
      text = "Tus niveles de ansiedad parecen bajos. Es importante mantener habitos saludables para preservar este bienestar.";
    } else if (score <= 9) {
      title = "Ansiedad leve";
      text = "Experimentas algo de ansiedad. Tecnicas de relajacion y mindfulness pueden ser muy utiles.";
    } else if (score <= 14) {
      title = "Ansiedad moderada";
      text = "La ansiedad esta afectando tu dia a dia. Considera implementar cambios y, si persiste, consultar con un profesional.";
    } else {
      title = "Ansiedad severa";
      text = "Tus niveles de ansiedad son altos. Te recomendamos hablar con un profesional de salud mental.";
    }
    
    if (getVal("nervioso") >= 3 || getVal("inquietud") >= 3) {
      tips.push({
        title: "Tecnica de respiracion 4-7-8",
        text: "Inhala 4 segundos, sostene 7 segundos, exhala 8 segundos. Repeti 3-4 veces cuando sientas ansiedad.",
      });
    }
    if (getVal("preocupacion_control") >= 3 || getVal("preocupacion_excesiva") >= 3) {
      tips.push({
        title: "Diario de preocupaciones",
        text: "Dedica 15 minutos al dia a escribir tus preocupaciones. Fuera de ese tiempo, intenta postergarlas.",
      });
    }
    if (getVal("miedo") >= 3) {
      tips.push({
        title: "Grounding (anclaje)",
        text: "Cuando sientas miedo, nombra 5 cosas que ves, 4 que tocas, 3 que escuchas, 2 que oles y 1 que probas.",
      });
    }
  } else if (testType === "adhd") {
    if (score <= 16) {
      title = "Indicadores bajos";
      text = "Tus respuestas no sugieren senales significativas de TDA/TDAH. Igualmente, si tenes dudas, consulta con un profesional.";
    } else if (score <= 28) {
      title = "Indicadores moderados";
      text = "Algunas de tus respuestas sugieren dificultades de atencion o hiperactividad. Una evaluacion profesional podria ser util.";
    } else {
      title = "Indicadores elevados";
      text = "Varias respuestas indican posibles senales de TDA/TDAH. Te recomendamos una evaluacion con un especialista.";
    }
    
    if (getVal("organizar") >= 3 || getVal("perder") >= 3) {
      tips.push({
        title: "Sistemas de organizacion",
        text: "Usa listas, calendarios y lugares fijos para objetos importantes. La rutina ayuda mucho.",
      });
    }
    if (getVal("atencion") >= 3 || getVal("distraer") >= 3) {
      tips.push({
        title: "Ambiente sin distracciones",
        text: "Trabaja en espacios silenciosos, usa auriculares con ruido blanco y bloquea notificaciones.",
      });
    }
    if (getVal("inquieto") >= 3 || getVal("activo") >= 3) {
      tips.push({
        title: "Movimiento programado",
        text: "Incorpora pausas activas cada 30-45 minutos. El ejercicio regular ayuda a canalizar la energia.",
      });
    }
    if (getVal("evitar") >= 3 || getVal("terminar") >= 3) {
      tips.push({
        title: "Tecnica Pomodoro",
        text: "Trabaja en bloques de 25 minutos con descansos de 5. Dividi tareas grandes en pasos pequenos.",
      });
    }
  }
  
  if (tips.length === 0) {
    tips.push({
      title: "Mantene el equilibrio",
      text: "Segui sumando momentos que te hagan bien: movimiento suave, conexion con gente que queres.",
    });
  }
  
  return { title, text, tips };
}
