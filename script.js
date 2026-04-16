const medicalPairs = [
  {
    id: "enxaqueca-sem-aura",
    topic: "ENXAQUECA SEM AURA",
    description: "DOR UNILATERAL, PULSATIL, COM NAUSEAS E FOTOFOBIA",
    treatment: {
      prompt: "Qual e a melhor conduta inicial para a crise aguda de enxaqueca sem aura, sem sinais de alarme?",
      options: [
        { text: "Usar AINE ou triptano, associado a antiemetico se necessario.", correct: true },
        { text: "Prescrever antibiotico de amplo espectro imediatamente.", correct: false },
        { text: "Iniciar nimodipina e providenciar tratamento neurocirurgico urgente.", correct: false },
        { text: "Realizar puncoes lombares seriadas como primeira medida.", correct: false }
      ]
    }
  },
  {
    id: "hemorragia-subaracnoide",
    topic: "HEMORRAGIA SUBARACNOIDE",
    description: "PIOR CEFALEIA DA VIDA, DE INICIO SUBITO (THUNDERCLAP)",
    treatment: {
      prompt: "Diante de hemorragia subaracnoide aneurismatica suspeita ou confirmada, qual conduta e mais apropriada?",
      options: [
        { text: "Observar em domicilio com analgesico simples.", correct: false },
        { text: "Iniciar nimodipina e providenciar tratamento neurocirurgico ou endovascular urgente.", correct: true },
        { text: "Tratar como sinusite e reavaliar em 7 dias.", correct: false },
        { text: "Prescrever sumatriptano subcutaneo como tratamento definitivo.", correct: false }
      ]
    }
  },
  {
    id: "cefaleia-em-salvas",
    topic: "CEFALEIA EM SALVAS",
    description: "DOR ORBITARIA UNILATERAL INTENSA + LACRIMEJAMENTO E CONGESTAO NASAL IPSILATERAL",
    treatment: {
      prompt: "Na crise de cefaleia em salvas, qual tratamento abortivo e classico?",
      options: [
        { text: "Oxigenio a alto fluxo por mascara nao reinalante.", correct: true },
        { text: "Amoxicilina por 10 dias.", correct: false },
        { text: "Suspender cafe imediatamente como unica conduta.", correct: false },
        { text: "Puncoes lombares seriadas de rotina.", correct: false }
      ]
    }
  },
  {
    id: "cefaleia-tensional",
    topic: "CEFALEIA TIPO TENSIONAL",
    description: "DOR EM PRESSAO BILATERAL, EM APERTO, SEM NAUSEAS",
    treatment: {
      prompt: "Qual abordagem costuma ser mais adequada para cefaleia tipo tensional episodica sem sinais de gravidade?",
      options: [
        { text: "Analgesico simples ou AINE, associado a medidas nao farmacologicas.", correct: true },
        { text: "Nimodipina intravenosa imediata.", correct: false },
        { text: "Antibiotico intravenoso empirico urgente.", correct: false },
        { text: "Trombolise venosa como primeira linha.", correct: false }
      ]
    }
  },
  {
    id: "arterite-celulas-gigantes",
    topic: "ARTERITE DE CELULAS GIGANTES",
    description: "IDOSO + CEFALEIA TEMPORAL + CLAUDICACAO MANDIBULAR",
    treatment: {
      prompt: "Na suspeita de arterite de celulas gigantes, qual conduta deve ser iniciada prontamente?",
      options: [
        { text: "Corticoterapia sistemica em alta dose para reduzir risco de perda visual.", correct: true },
        { text: "Apenas analgesico comum e observacao por 30 dias.", correct: false },
        { text: "Suspensao total de liquidos por 24 horas.", correct: false },
        { text: "Oxigenio alto fluxo como tratamento definitivo.", correct: false }
      ]
    }
  },
  {
    id: "meningite-bacteriana",
    topic: "MENINGITE BACTERIANA",
    description: "FEBRE + RIGIDEZ DE NUCA + REBAIXAMENTO DO NIVEL DE CONSCIENCIA",
    treatment: {
      prompt: "Qual e a melhor conduta inicial diante de meningite bacteriana suspeita?",
      options: [
        { text: "Antibioticoterapia empirica intravenosa imediata, com dexametasona quando indicado.", correct: true },
        { text: "Tratar apenas com triptano e alta hospitalar.", correct: false },
        { text: "Aguardar cultura por 48 horas antes de qualquer medicacao.", correct: false },
        { text: "Prescrever apenas repouso e hidratacao oral.", correct: false }
      ]
    }
  },
  {
    id: "hipertensao-intracraniana-idiopatica",
    topic: "HIPERTENSAO INTRACRANIANA IDIOPATICA",
    description: "MULHER JOVEM OBESA + CEFALEIA + PAPILEDEMA",
    treatment: {
      prompt: "Em hipertensao intracraniana idiopatica, qual medida faz parte do tratamento de primeira linha?",
      options: [
        { text: "Perda ponderal e acetazolamida, com seguimento oftalmologico.", correct: true },
        { text: "Antibiotico empirico de rotina.", correct: false },
        { text: "Nimodipina oral como tratamento principal.", correct: false },
        { text: "Suspender toda ingestao hidrica por varios dias.", correct: false }
      ]
    }
  },
  {
    id: "cefaleia-uso-excessivo-medicacao",
    topic: "CEFALEIA POR USO EXCESSIVO DE MEDICACAO",
    description: "CEFALEIA DIARIA EM PACIENTE QUE USA ANALGESICOS FREQUENTEMENTE (>=15 DIAS/MES)",
    treatment: {
      prompt: "Qual e a estrategia central no tratamento da cefaleia por uso excessivo de medicacao?",
      options: [
        { text: "Suspender ou reduzir a medicacao em excesso e reorganizar o plano preventivo.", correct: true },
        { text: "Aumentar a frequencia do analgesico usado todos os dias.", correct: false },
        { text: "Prescrever apenas antibiotico por 14 dias.", correct: false },
        { text: "Iniciar trombolitico por via venosa.", correct: false }
      ]
    }
  }
];

const boardElement = document.getElementById("gameBoard");
const template = document.getElementById("cardTemplate");
const movesElement = document.getElementById("moves");
const matchesElement = document.getElementById("matches");
const statusElement = document.getElementById("status");
const restartButton = document.getElementById("restartButton");
const victoryOverlay = document.getElementById("victoryOverlay");
const playAgainButton = document.getElementById("playAgainButton");
const quizOverlay = document.getElementById("quizOverlay");
const quizTitle = document.getElementById("quizTitle");
const quizPrompt = document.getElementById("quizPrompt");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let mismatchPending = false;
let activeQuiz = null;
let moves = 0;
let matches = 0;
let shuffleTimer = null;
let previewTimer = null;

const confettiColors = ["#0b8f8c", "#f3a75b", "#167c5c", "#ff6b6b", "#ffd166"];

function shuffle(items) {
  const clone = [...items];

  for (let index = clone.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[randomIndex]] = [clone[randomIndex], clone[index]];
  }

  return clone;
}

function buildCards() {
  const cards = medicalPairs.flatMap((pair) => [
    {
      pairId: pair.id,
      type: "Diagnostico",
      text: pair.topic
    },
    {
      pairId: pair.id,
      type: "Pista principal",
      text: pair.description
    }
  ]);

  return shuffle(cards);
}

function updateScoreboard() {
  movesElement.textContent = String(moves);
  matchesElement.textContent = String(matches);

  if (matches === medicalPairs.length) {
    statusElement.textContent = "Concluido";
    return;
  }

  if (activeQuiz) {
    statusElement.textContent = "Pergunta de tratamento";
    return;
  }

  if (lockBoard) {
    statusElement.textContent = "Memorize as cartas";
    return;
  }

  if (mismatchPending) {
    statusElement.textContent = "Nova tentativa";
    return;
  }

  statusElement.textContent = "Em andamento";
}

function hideVictoryOverlay() {
  victoryOverlay.classList.remove("is-visible");
  victoryOverlay.setAttribute("aria-hidden", "true");
}

function hideQuizOverlay() {
  quizOverlay.classList.remove("is-visible");
  quizOverlay.setAttribute("aria-hidden", "true");
  quizOptions.innerHTML = "";
  quizFeedback.textContent = "";
  quizFeedback.className = "quiz__feedback";
  activeQuiz = null;
}

function launchConfetti() {
  for (let index = 0; index < 28; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.backgroundColor = confettiColors[index % confettiColors.length];
    piece.style.setProperty("--duration", `${1900 + Math.random() * 1400}ms`);
    piece.style.transform = `translateY(0) rotate(${Math.random() * 180}deg)`;
    document.body.appendChild(piece);

    window.setTimeout(() => {
      piece.remove();
    }, 3600);
  }
}

function playShuffleAnimation() {
  boardElement.classList.remove("is-shuffling");

  if (shuffleTimer) {
    window.clearTimeout(shuffleTimer);
  }

  void boardElement.offsetWidth;
  boardElement.classList.add("is-shuffling");

  shuffleTimer = window.setTimeout(() => {
    boardElement.classList.remove("is-shuffling");
  }, 900);
}

function closeCard(card) {
  if (!card) {
    return;
  }

  card.classList.remove("is-flipped");
  card.setAttribute("aria-label", "Carta virada para baixo");
}

function openCard(card) {
  if (!card) {
    return;
  }

  card.classList.add("is-flipped");
  card.setAttribute("aria-label", `Carta revelada: ${card.dataset.text}`);
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  mismatchPending = false;
  updateScoreboard();
}

function finishGame() {
  statusElement.textContent = "Parabens!";
  victoryOverlay.classList.add("is-visible");
  victoryOverlay.setAttribute("aria-hidden", "false");
  launchConfetti();
}

function markAsMatched() {
  firstCard.classList.add("is-matched");
  secondCard.classList.add("is-matched");
  firstCard.setAttribute("aria-label", "Carta finalizada");
  secondCard.setAttribute("aria-label", "Carta finalizada");
  firstCard.disabled = true;
  secondCard.disabled = true;
  matches += 1;

  resetTurn();

  if (matches === medicalPairs.length) {
    finishGame();
  }
}

function returnPairToBoard() {
  closeCard(firstCard);
  closeCard(secondCard);
  hideQuizOverlay();
  resetTurn();
}

function finalizeQuizMatch() {
  hideQuizOverlay();
  markAsMatched();
}

function handleQuizAnswer(button, option) {
  if (!activeQuiz) {
    return;
  }

  if (option.correct) {
    button.classList.add("is-correct");
    quizFeedback.textContent = "Resposta correta. Par concluido.";
    quizFeedback.classList.add("is-correct");

    quizOptions.querySelectorAll(".quiz__option").forEach((quizButton) => {
      quizButton.disabled = true;
    });

    window.setTimeout(() => {
      finalizeQuizMatch();
    }, 850);
    return;
  }

  button.classList.add("is-wrong");
  quizOptions.querySelectorAll(".quiz__option").forEach((quizButton) => {
    quizButton.disabled = true;
  });
  quizFeedback.textContent = "Resposta incorreta. As cartas voltarao ao tabuleiro para nova oportunidade.";
  quizFeedback.classList.remove("is-correct");
  quizFeedback.classList.add("is-wrong");

  window.setTimeout(() => {
    returnPairToBoard();
  }, 1100);
}

function openTreatmentQuiz(pairId) {
  const pair = medicalPairs.find((item) => item.id === pairId);

  if (!pair) {
    markAsMatched();
    return;
  }

  activeQuiz = pair;
  lockBoard = true;
  quizTitle.textContent = pair.topic;
  quizPrompt.textContent = pair.treatment.prompt;
  quizOptions.innerHTML = "";
  quizFeedback.textContent = "";
  quizFeedback.className = "quiz__feedback";

  const shuffledOptions = shuffle(pair.treatment.options);
  shuffledOptions.forEach((option) => {
    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.className = "quiz__option";
    optionButton.textContent = option.text;
    optionButton.addEventListener("click", () => handleQuizAnswer(optionButton, option));
    quizOptions.appendChild(optionButton);
  });

  quizOverlay.classList.add("is-visible");
  quizOverlay.setAttribute("aria-hidden", "false");
  updateScoreboard();
}

function checkForMatch() {
  if (!firstCard || !secondCard) {
    return;
  }

  const isMatch = firstCard.dataset.pairId === secondCard.dataset.pairId;

  if (isMatch) {
    openTreatmentQuiz(firstCard.dataset.pairId);
    return;
  }

  mismatchPending = true;
  updateScoreboard();
}

function revealCard(card) {
  if (lockBoard || card.classList.contains("is-matched")) {
    return;
  }

  if (mismatchPending) {
    if (card === firstCard || card === secondCard) {
      return;
    }

    closeCard(firstCard);
    closeCard(secondCard);
    firstCard = null;
    secondCard = null;
    mismatchPending = false;
  }

  if (card === firstCard) {
    return;
  }

  openCard(card);

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  moves += 1;
  updateScoreboard();
  checkForMatch();
}

function createCardElement(cardData) {
  const fragment = template.content.cloneNode(true);
  const button = fragment.querySelector(".card");
  const badgeElement = fragment.querySelector(".card__badge");
  const typeElement = fragment.querySelector(".card__type");
  const textElement = fragment.querySelector(".card__text");

  button.dataset.pairId = cardData.pairId;
  button.dataset.text = cardData.text;
  badgeElement.textContent = String(cardData.position);
  typeElement.textContent = cardData.type;
  textElement.textContent = cardData.text;
  button.addEventListener("click", () => revealCard(button));

  return fragment;
}

function startInitialPreview() {
  const allCards = boardElement.querySelectorAll(".card");

  lockBoard = true;
  allCards.forEach((card) => {
    openCard(card);
  });
  updateScoreboard();

  if (previewTimer) {
    window.clearTimeout(previewTimer);
  }

  previewTimer = window.setTimeout(() => {
    allCards.forEach((card) => {
      if (!card.classList.contains("is-matched")) {
        closeCard(card);
      }
    });

    lockBoard = false;
    updateScoreboard();
  }, 5000);
}

function startGame() {
  hideVictoryOverlay();
  hideQuizOverlay();

  if (previewTimer) {
    window.clearTimeout(previewTimer);
  }

  if (shuffleTimer) {
    window.clearTimeout(shuffleTimer);
  }

  boardElement.innerHTML = "";
  firstCard = null;
  secondCard = null;
  activeQuiz = null;
  lockBoard = false;
  mismatchPending = false;
  moves = 0;
  matches = 0;

  const cards = buildCards();
  cards.forEach((card, index) => {
    card.position = index + 1;
    boardElement.appendChild(createCardElement(card));
  });

  playShuffleAnimation();
  startInitialPreview();
}

restartButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", startGame);

startGame();
