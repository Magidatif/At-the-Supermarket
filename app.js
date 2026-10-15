/**
 * Egyptian Arabic Learning App - "At the Supermarket (في السوبر ماركت)"
 * Application Controller & Audio Engine
 */

document.addEventListener("DOMContentLoaded", () => {
  // App State
  const state = {
    currentDialogueIndex: -1,
    isPlayingAll: false,
    playbackSpeed: 1.0,
    showEnglish: true,
    showPhonetic: true,
    activeView: "dialogue-view",

    // Quiz state
    quizCurrentQuestion: 0,
    quizScore: 0,
    quizAnswered: false
  };

  // DOM Elements
  const audioEngine = document.getElementById("audio-engine");
  const dialogueStream = document.getElementById("dialogue-stream");
  const btnPlayAll = document.getElementById("btn-play-all");
  const playAllIcon = document.getElementById("play-all-icon");
  const playAllText = document.getElementById("play-all-text");
  const btnPrevLine = document.getElementById("btn-prev-line");
  const btnNextLine = document.getElementById("btn-next-line");
  const btnStop = document.getElementById("btn-stop");
  const progressBar = document.getElementById("dialogue-progress-bar");
  const progressText = document.getElementById("dialogue-progress-text");

  // Speed Toggle
  const toggleSpeed = document.getElementById("toggle-speed");
  const speedLabel = document.getElementById("speed-label");

  // Web Audio Context for UI chimes & POS effects
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  function playChime(type = "success") {
    try {
      const ctx = getAudioContext();
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "success") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.15); // G5
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === "pos") {
        // POS terminal beep
        osc.type = "triangle";
        osc.frequency.setValueAtTime(1400, ctx.currentTime);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === "error") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch (e) {
      console.warn("Audio Context chime not supported or muted:", e);
    }
  }

  /* ==========================================================================
     1. NAVIGATION SYSTEM
     ========================================================================== */
  const navTabs = document.querySelectorAll(".nav-tab");
  const viewSections = document.querySelectorAll(".view-section");

  navTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetView = tab.getAttribute("data-view");
      switchView(targetView);
    });
  });

  function switchView(viewId) {
    state.activeView = viewId;
    navTabs.forEach((t) => {
      t.classList.toggle("active", t.getAttribute("data-view") === viewId);
    });
    viewSections.forEach((s) => {
      s.classList.toggle("active", s.id === viewId);
    });

    // If leaving dialogue view while playing, stop auto-play
    if (viewId !== "dialogue-view" && state.isPlayingAll) {
      stopDialoguePlayback();
    }
  }

  /* ==========================================================================
     2. GLOBAL SETTINGS & TOGGLES
     ========================================================================== */
  const speeds = [1.0, 0.8, 1.2];
  let currentSpeedIdx = 0;
  toggleSpeed.addEventListener("click", () => {
    currentSpeedIdx = (currentSpeedIdx + 1) % speeds.length;
    state.playbackSpeed = speeds[currentSpeedIdx];
    audioEngine.playbackRate = state.playbackSpeed;
    speedLabel.textContent = `السرعة: ${state.playbackSpeed}x`;
    if (state.playbackSpeed === 0.8) {
      toggleSpeed.classList.add("active");
    } else {
      toggleSpeed.classList.remove("active");
    }
  });

  /* ==========================================================================
     3. DIALOGUE FEED RENDER & PLAYBACK
     ========================================================================== */
  function renderDialogue() {
    dialogueStream.innerHTML = "";
    DIALOGUE_DATA.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = `dialogue-bubble-row ${item.role}`;
      row.id = `bubble-${item.id}`;
      row.dataset.index = index;

      row.innerHTML = `
        <div class="character-avatar" title="${item.speakerNameAr}">
          ${item.avatar}
        </div>
        <div class="bubble-content">
          <div class="bubble-header">
            <span class="speaker-badge">${item.speakerNameAr}</span>
            <button class="bubble-audio-btn" title="استمع للسطر" data-index="${index}">
              ▶
            </button>
          </div>
          <div class="text-arabic">${item.arabic}</div>
          <div class="text-phonetic">${item.phonetic}</div>
          <div class="text-english">${item.english}</div>
          ${item.note ? `<div class="cultural-note-pill"><span>💡</span> ${item.note}</div>` : ""}
        </div>
      `;

      // Click anywhere on the bubble to play its audio
      row.querySelector(".bubble-content").addEventListener("click", (e) => {
        if (state.isPlayingAll) {
          stopDialoguePlayback();
        }
        playDialogueLine(index);
      });

      dialogueStream.appendChild(row);
    });
  }

  function playDialogueLine(index, onFinished = null) {
    if (index < 0 || index >= DIALOGUE_DATA.length) return;

    state.currentDialogueIndex = index;
    updateProgressUI();

    // Highlight current bubble
    document.querySelectorAll(".dialogue-bubble-row").forEach((el, i) => {
      if (i === index) {
        el.classList.add("playing");
        const btn = el.querySelector(".bubble-audio-btn");
        if (btn) btn.textContent = "🔊";
        // Smooth scroll bubble into viewport
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        el.classList.remove("playing");
        const btn = el.querySelector(".bubble-audio-btn");
        if (btn) btn.textContent = "▶";
      }
    });

    const item = DIALOGUE_DATA[index];
    audioEngine.src = item.audio;
    audioEngine.playbackRate = state.playbackSpeed;

    audioEngine.onended = () => {
      const currentEl = document.getElementById(`bubble-${item.id}`);
      if (currentEl) {
        currentEl.classList.remove("playing");
        const btn = currentEl.querySelector(".bubble-audio-btn");
        if (btn) btn.textContent = "▶";
      }

      if (onFinished) {
        onFinished();
      } else if (state.isPlayingAll) {
        // Auto advance to next line with realistic natural pause (750ms)
        setTimeout(() => {
          if (!state.isPlayingAll) return;
          if (state.currentDialogueIndex + 1 < DIALOGUE_DATA.length) {
            playDialogueLine(state.currentDialogueIndex + 1, onFinished);
          } else {
            // Dialogue completed!
            stopDialoguePlayback();
            celebrate("dialogue");
          }
        }, 750);
      }
    };

    audioEngine.play().catch((err) => {
      console.warn("Audio playback error:", err);
    });
  }

  function startDialogueAutoPlay() {
    state.isPlayingAll = true;
    playAllIcon.textContent = "⏸";
    playAllText.textContent = "إيقاف مؤقت";
    btnPlayAll.style.background = "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)";

    const startIndex = state.currentDialogueIndex >= 0 && state.currentDialogueIndex < DIALOGUE_DATA.length - 1
      ? state.currentDialogueIndex + 1
      : 0;

    playDialogueLine(startIndex);
  }

  function stopDialoguePlayback() {
    state.isPlayingAll = false;
    audioEngine.pause();
    playAllIcon.textContent = "▶";
    playAllText.textContent = "تشغيل المحادثة كاملة";
    btnPlayAll.style.background = "";

    document.querySelectorAll(".dialogue-bubble-row").forEach((el) => {
      el.classList.remove("playing");
      const btn = el.querySelector(".bubble-audio-btn");
      if (btn) btn.textContent = "▶";
    });
  }

  btnPlayAll.addEventListener("click", () => {
    if (state.isPlayingAll) {
      stopDialoguePlayback();
    } else {
      startDialogueAutoPlay();
    }
  });

  btnStop.addEventListener("click", () => {
    stopDialoguePlayback();
  });

  btnNextLine.addEventListener("click", () => {
    stopDialoguePlayback();
    const nextIdx = Math.min(state.currentDialogueIndex + 1, DIALOGUE_DATA.length - 1);
    playDialogueLine(nextIdx);
  });

  btnPrevLine.addEventListener("click", () => {
    stopDialoguePlayback();
    const prevIdx = Math.max(state.currentDialogueIndex - 1, 0);
    playDialogueLine(prevIdx);
  });

  function updateProgressUI() {
    const total = DIALOGUE_DATA.length;
    const current = state.currentDialogueIndex + 1;
    const pct = Math.round((current / total) * 100);
    progressBar.style.width = `${pct}%`;
    progressText.textContent = `${current} / ${total}`;
  }

  /* ==========================================================================
     4. QUIZ CHALLENGE
     ========================================================================== */
  const quizProgressIndicator = document.getElementById("quiz-progress-indicator");
  const quizQuestionTitle = document.getElementById("quiz-question-title");
  const quizQuestionSub = document.getElementById("quiz-question-sub");
  const quizOptionsContainer = document.getElementById("quiz-options-container");
  const quizFeedback = document.getElementById("quiz-feedback");
  const btnQuizNext = document.getElementById("btn-quiz-next");
  const quizQuestionBox = document.getElementById("quiz-question-box");
  const quizSummaryBox = document.getElementById("quiz-summary-box");
  const quizFinalScore = document.getElementById("quiz-final-score");
  const btnRestartQuiz = document.getElementById("btn-restart-quiz");

  function renderQuizQuestion() {
    state.quizAnswered = false;
    btnQuizNext.style.display = "none";
    quizFeedback.className = "quiz-feedback-box";
    quizFeedback.innerHTML = "";

    const q = QUIZ_DATA[state.quizCurrentQuestion];
    quizProgressIndicator.textContent = `السؤال ${state.quizCurrentQuestion + 1} من ${QUIZ_DATA.length}`;
    quizQuestionTitle.textContent = q.question;
    quizQuestionSub.textContent = q.questionEn;

    quizOptionsContainer.innerHTML = "";
    q.options.forEach((optText, idx) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option-btn";
      btn.textContent = optText;
      btn.addEventListener("click", () => handleQuizAnswer(idx, btn));
      quizOptionsContainer.appendChild(btn);
    });
  }

  function handleQuizAnswer(selectedIndex, selectedBtn) {
    if (state.quizAnswered) return;
    state.quizAnswered = true;

    const q = QUIZ_DATA[state.quizCurrentQuestion];
    const isCorrect = selectedIndex === q.correctIndex;
    const optionButtons = quizOptionsContainer.querySelectorAll(".quiz-option-btn");

    if (isCorrect) {
      state.quizScore++;
      selectedBtn.classList.add("correct");
      quizFeedback.classList.add("active", "correct");
      quizFeedback.innerHTML = `<strong>إجابة صحيحة! 🎉</strong> ${q.explanation}`;
      playChime("success");
    } else {
      selectedBtn.classList.add("wrong");
      optionButtons[q.correctIndex].classList.add("correct");
      quizFeedback.classList.add("active", "wrong");
      quizFeedback.innerHTML = `<strong>إجابة خاطئة!</strong> ${q.explanation}`;
      playChime("error");
    }

    btnQuizNext.style.display = "block";
  }

  btnQuizNext.addEventListener("click", () => {
    state.quizCurrentQuestion++;
    if (state.quizCurrentQuestion < QUIZ_DATA.length) {
      renderQuizQuestion();
    } else {
      showQuizSummary();
    }
  });

  function showQuizSummary() {
    quizQuestionBox.style.display = "none";
    btnQuizNext.style.display = "none";
    quizSummaryBox.style.display = "block";
    quizProgressIndicator.textContent = "النتيجة النهائية 🏆";

    quizFinalScore.textContent = `درجتك: ${state.quizScore} من ${QUIZ_DATA.length}`;
    celebrate("quiz");
  }

  btnRestartQuiz.addEventListener("click", () => {
    state.quizCurrentQuestion = 0;
    state.quizScore = 0;
    quizQuestionBox.style.display = "block";
    quizSummaryBox.style.display = "none";
    renderQuizQuestion();
  });

  /* ==========================================================================
     8. CELEBRATION CONFETTI
     ========================================================================== */
  function celebrate(type = "default") {
    if (typeof confetti === "function") {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }

  // Initialize Application
  renderDialogue();
  renderQuizQuestion();
  updateProgressUI();
});
