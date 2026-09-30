/**
 * SkinSense — AI-Powered Personalized Skincare Platform
 * Interactive Client-Side Application Script
 * Features: Live Camera Face Scan, Beauty Hydration Map, AM/PM Switcher, Quiz Flow
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initNavigation();
  initHeroRoutineToggle();
  initWaterTracker();
  initAuthModals();
  initMeowCompanion();
});

/* ==========================================================================
   Navigation & Mobile Menu
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('header');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const menuOpenIcon = document.getElementById('menuOpenIcon');
  const menuCloseIcon = document.getElementById('menuCloseIcon');
  const navLinks = document.querySelectorAll('.nav-link, .drawer-link');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 6px 25px rgba(78, 48, 122, 0.08)';
      header.style.background = 'rgba(248, 245, 253, 0.98)';
    } else {
      header.style.boxShadow = 'none';
      header.style.background = 'rgba(248, 245, 253, 0.92)';
    }

    highlightActiveNavLink();
  });

  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile drawer when clicking any link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });
}

function toggleMobileMenu() {
  const mobileDrawer = document.getElementById('mobileDrawer');
  const menuOpenIcon = document.getElementById('menuOpenIcon');
  const menuCloseIcon = document.getElementById('menuCloseIcon');
  
  const isActive = mobileDrawer.classList.toggle('active');
  if (isActive) {
    menuOpenIcon.classList.add('hidden');
    menuCloseIcon.classList.remove('hidden');
  } else {
    menuOpenIcon.classList.remove('hidden');
    menuCloseIcon.classList.add('hidden');
  }
}

function highlightActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   Hero Routine AM/PM Switcher
   ========================================================================== */
const heroRoutines = {
  am: [
    {
      step: '01',
      title: 'Ceramide Gel Hydrating Cleanser',
      desc: 'Preserves acid mantle · pH 5.5 balance',
      tag: 'Gentle',
      isHero: false
    },
    {
      step: '02',
      title: '10% Niacinamide + Zinc Serum',
      desc: 'Pore refinement · Sebum regulation',
      tag: 'Active',
      isHero: true
    },
    {
      step: '03',
      title: 'Squalane Peptide Light Barrier Cream',
      desc: 'Trans-epidermal water loss shield',
      tag: 'Barrier',
      isHero: false
    }
  ],
  pm: [
    {
      step: '01',
      title: 'Gentle Lipid Cleansing Oil',
      desc: 'Dissolves pollution & SPF without friction',
      tag: 'Cleanse',
      isHero: false
    },
    {
      step: '02',
      title: 'Encapsulated Retinal 0.05% Complex',
      desc: 'Cellular renewal & overnight collagen induction',
      tag: 'Regen',
      isHero: true
    },
    {
      step: '03',
      title: 'Bio-Identical Ceramide Recovery Balm',
      desc: 'Deep overnight lipid restoration matrix',
      tag: 'Repair',
      isHero: false
    }
  ]
};

function toggleRoutineTime(time) {
  const amBtn = document.getElementById('amTabBtn');
  const pmBtn = document.getElementById('pmTabBtn');
  const container = document.getElementById('routineStepsContainer');

  if (time === 'am') {
    amBtn.classList.add('active');
    pmBtn.classList.remove('active');
  } else {
    pmBtn.classList.add('active');
    amBtn.classList.remove('active');
  }

  const steps = heroRoutines[time];
  container.innerHTML = steps.map(item => `
    <div class="routine-step-item">
      <span class="step-num">${item.step}</span>
      <div class="step-desc">
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </div>
      <span class="tag-pill ${item.isHero ? 'active-pill' : ''}">${item.tag}</span>
    </div>
  `).join('');
}

function initHeroRoutineToggle() {
  // AM is default
}

/* ==========================================================================
   Beauty Hydration Map & Interactive Water Tracker
   ========================================================================== */
let waterIntake = [true, true, true, true, false, false, false, false];

function initWaterTracker() {
  renderWaterTracker();
}

function renderWaterTracker() {
  const count = waterIntake.filter(Boolean).length;
  const percent = Math.round((count / 8) * 100);

  const countText = document.getElementById('waterCountText');
  const percentText = document.getElementById('waterPercentText');
  const progressBar = document.getElementById('waterProgressBar');
  const tipEl = document.getElementById('hydrationTip');

  if (countText) countText.textContent = `${count} of 8 glasses`;
  if (percentText) percentText.textContent = `${percent}% Plump`;
  if (progressBar) progressBar.style.width = `${percent}%`;

  const buttons = document.querySelectorAll('.glass-btn');
  buttons.forEach((btn, idx) => {
    if (waterIntake[idx]) {
      btn.classList.add('filled');
    } else {
      btn.classList.remove('filled');
    }
  });

  if (tipEl) {
    let tip = '';
    if (count <= 2) {
      tip = `💧 <strong>Morning Flush:</strong> Starting your day with 1-2 glasses wakes up microcirculation and flushes nocturnal toxins.`;
    } else if (count <= 5) {
      tip = `✨ <strong>Mid-Day Boost:</strong> Great pace! Steady hydration prevents dehydration creases and supports skin elasticity.`;
    } else if (count < 8) {
      tip = `🌸 <strong>Almost Full Dewiness:</strong> Just a couple more glasses to lock in moisture before nighttime barrier repair!`;
    } else {
      tip = `🎉 <strong>100% Hydration Achieved!</strong> Outstanding work! Your skin cells are fully plumped and radiant today.`;
    }
    tipEl.querySelector('span').innerHTML = tip;
  }
}

function toggleWaterGlass(index) {
  // If clicking on a glass, fill up to that glass or toggle it
  if (waterIntake[index] && (index === 7 || !waterIntake[index + 1])) {
    waterIntake[index] = false;
  } else {
    for (let i = 0; i <= index; i++) {
      waterIntake[i] = true;
    }
  }
  renderWaterTracker();
}

function resetWaterTracker() {
  waterIntake = [false, false, false, false, false, false, false, false];
  renderWaterTracker();
}

/* ==========================================================================
   Live Camera Face Scanner (Webcam HTML5)
   ========================================================================== */
let cameraStream = null;

async function openCameraModal() {
  const modal = document.getElementById('cameraModal');
  const video = document.getElementById('cameraVideo');
  const scannerOverlay = document.getElementById('scannerOverlay');
  const capturedWrapper = document.getElementById('capturedPreviewWrapper');
  const liveControls = document.getElementById('cameraLiveControls');
  const capturedControls = document.getElementById('cameraCapturedControls');
  const analyzingOverlay = document.getElementById('cameraAnalyzingOverlay');

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Reset states
  if (scannerOverlay) scannerOverlay.classList.remove('hidden');
  if (capturedWrapper) capturedWrapper.classList.add('hidden');
  if (liveControls) liveControls.classList.remove('hidden');
  if (capturedControls) capturedControls.classList.add('hidden');
  if (analyzingOverlay) analyzingOverlay.classList.add('hidden');

  // Request camera stream
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      cameraStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false
      });
      if (video) {
        video.srcObject = cameraStream;
        await video.play();
      }
    } catch (err) {
      console.warn('Camera access denied or unavailable:', err);
      showCameraFallbackNotice();
    }
  } else {
    showCameraFallbackNotice();
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function showCameraFallbackNotice() {
  const statusPill = document.querySelector('.scanner-status-pill');
  if (statusPill) {
    statusPill.innerHTML = '📷 Camera blocked or simulated &middot; Use Upload button';
  }
}

function closeCameraModal() {
  const modal = document.getElementById('cameraModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Stop camera tracks to release camera hardware
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
  }
}

function captureUserPhoto() {
  const video = document.getElementById('cameraVideo');
  const canvas = document.getElementById('cameraCanvas');
  const capturedImg = document.getElementById('capturedPhotoImg');
  const capturedWrapper = document.getElementById('capturedPreviewWrapper');
  const scannerOverlay = document.getElementById('scannerOverlay');
  const liveControls = document.getElementById('cameraLiveControls');
  const capturedControls = document.getElementById('cameraCapturedControls');

  if (!canvas) return;

  const width = video.videoWidth || 640;
  const height = video.videoHeight || 480;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  // Mirror canvas image horizontally to match webcam mirror
  ctx.translate(width, 0);
  ctx.scale(-1, 1);

  if (video.srcObject && video.readyState >= 2) {
    ctx.drawImage(video, 0, 0, width, height);
    capturedImg.src = canvas.toDataURL('image/png');
  } else {
    // Elegant fallback avatar if camera was not available
    capturedImg.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=640&q=80';
  }

  // Switch UI view to captured state
  scannerOverlay.classList.add('hidden');
  capturedWrapper.classList.remove('hidden');
  liveControls.classList.add('hidden');
  capturedControls.classList.remove('hidden');

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function retakeUserPhoto() {
  const capturedWrapper = document.getElementById('capturedPreviewWrapper');
  const scannerOverlay = document.getElementById('scannerOverlay');
  const liveControls = document.getElementById('cameraLiveControls');
  const capturedControls = document.getElementById('cameraCapturedControls');

  capturedWrapper.classList.add('hidden');
  scannerOverlay.classList.remove('hidden');
  liveControls.classList.remove('hidden');
  capturedControls.classList.add('hidden');
}

function triggerFileInputFallback() {
  const input = document.getElementById('cameraFallbackFileInput');
  if (input) input.click();
}

function handleFallbackPhotoUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const capturedImg = document.getElementById('capturedPhotoImg');
      const capturedWrapper = document.getElementById('capturedPreviewWrapper');
      const scannerOverlay = document.getElementById('scannerOverlay');
      const liveControls = document.getElementById('cameraLiveControls');
      const capturedControls = document.getElementById('cameraCapturedControls');

      capturedImg.src = e.target.result;
      scannerOverlay.classList.add('hidden');
      capturedWrapper.classList.remove('hidden');
      liveControls.classList.add('hidden');
      capturedControls.classList.remove('hidden');

      if (window.lucide) window.lucide.createIcons();
    };
    reader.readAsDataURL(file);
  }
}

function confirmCapturedPhotoAndProceed() {
  const analyzingOverlay = document.getElementById('cameraAnalyzingOverlay');
  if (analyzingOverlay) analyzingOverlay.classList.remove('hidden');

  setTimeout(() => {
    closeCameraModal();
    // Open assessment result view tailored to facial scan
    openAssessmentModal();
    showQuizResults('Face Scan Diagnostic Complete (Hydration: 88%, Barrier: 93%)');
  }, 1600);
}

/* ==========================================================================
   Skin Assessment Quiz Flow (Minimal & Fast)
   ========================================================================== */
const quizState = {
  currentStep: 1,
  skinType: '',
  skinTypeLabel: '',
  concern: '',
  concernLabel: '',
  environment: '',
  environmentLabel: ''
};

function openAssessmentModal() {
  const modal = document.getElementById('assessmentModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    goToQuizStep(quizState.currentStep || 1);
  }
}

function closeAssessmentModal() {
  const modal = document.getElementById('assessmentModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function goToQuizStep(stepNumber) {
  quizState.currentStep = stepNumber;
  const progress = document.getElementById('quizProgress');
  const stepCount = document.getElementById('quizStepCount');
  const categoryLabel = document.getElementById('quizCategoryLabel');
  const quizHeader = document.getElementById('quizHeader');

  for (let i = 1; i <= 4; i++) {
    const stepEl = document.getElementById(`quizStep${i}`);
    if (stepEl) stepEl.classList.remove('active');
  }
  const resultEl = document.getElementById('quizResultStep');
  if (resultEl) resultEl.classList.remove('active');

  if (stepNumber <= 3) {
    quizHeader.style.display = 'block';
    const activeStepEl = document.getElementById(`quizStep${stepNumber}`);
    if (activeStepEl) activeStepEl.classList.add('active');

    const percent = stepNumber === 1 ? 33 : stepNumber === 2 ? 66 : 100;
    if (progress) progress.style.width = `${percent}%`;
    if (stepCount) stepCount.textContent = `Step ${stepNumber} of 3`;

    const labels = {
      1: 'Skin Identification',
      2: 'Core Focus & Goals',
      3: 'Daily Environment'
    };
    if (categoryLabel) categoryLabel.textContent = labels[stepNumber];
  } else if (stepNumber === 4) {
    quizHeader.style.display = 'none';
    const step4 = document.getElementById('quizStep4');
    if (step4) step4.classList.add('active');

    const statusText = document.getElementById('processingStatusText');
    setTimeout(() => {
      if (statusText) statusText.textContent = 'Balancing pH & active percentages...';
    }, 900);

    setTimeout(() => {
      showQuizResults();
    }, 1800);
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function selectQuizOption(step, label, shortVal) {
  if (step === 1) {
    quizState.skinType = shortVal;
    quizState.skinTypeLabel = label;
    goToQuizStep(2);
  } else if (step === 2) {
    quizState.concern = shortVal;
    quizState.concernLabel = label;
    goToQuizStep(3);
  } else if (step === 3) {
    quizState.environment = shortVal;
    quizState.environmentLabel = label;
    goToQuizStep(4);
  }
}

function showQuizResults(customSummary) {
  const quizHeader = document.getElementById('quizHeader');
  if (quizHeader) quizHeader.style.display = 'none';

  for (let i = 1; i <= 4; i++) {
    const s = document.getElementById(`quizStep${i}`);
    if (s) s.classList.remove('active');
  }

  const resultEl = document.getElementById('quizResultStep');
  if (resultEl) resultEl.classList.add('active');

  const summaryText = document.getElementById('resultSummaryText');
  const heroComplex = document.getElementById('resultHeroComplex');

  const sType = quizState.skinType || 'Combination';
  const cTarget = quizState.concern || 'Barrier Repair';
  const env = quizState.environment || 'Urban';

  if (summaryText) {
    if (customSummary) {
      summaryText.innerHTML = `<strong>${customSummary}</strong> &middot; Calibrated with high epidermal moisture retention and lipid seal.`;
    } else {
      summaryText.innerHTML = `Formulated specifically for <strong>${sType} skin</strong> targeting <strong>${cTarget}</strong> within a <strong>${env}</strong> climate.`;
    }
  }

  if (heroComplex) {
    if (cTarget.includes('Acne')) {
      heroComplex.textContent = 'Azelaic Acid 10% + Zinc PCA';
    } else if (cTarget.includes('Radiance')) {
      heroComplex.textContent = 'Ascorbyl Glucoside + Alpha Arbutin';
    } else if (cTarget.includes('Hydration')) {
      heroComplex.textContent = 'Multi-Molecular HA + Panthenol B5';
    } else {
      heroComplex.textContent = 'Ceramides NP/AP/EOP + Centella';
    }
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function resetAssessment() {
  goToQuizStep(1);
}

function saveRoutineAction() {
  closeAssessmentModal();
  openLoginModal('Save your assessment & unlock daily routine reminders');
}

/* ==========================================================================
   Auth / Login Modal (Minimal UI)
   ========================================================================== */
function initAuthModals() {
  const loginBtn = document.getElementById('loginBtn');
  const mobileLoginBtn = document.getElementById('mobileLoginBtn');

  if (loginBtn) {
    loginBtn.addEventListener('click', () => openLoginModal());
  }

  if (mobileLoginBtn) {
    mobileLoginBtn.addEventListener('click', () => {
      toggleMobileMenu();
      openLoginModal();
    });
  }

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeAssessmentModal();
        closeCameraModal();
        closeLoginModal();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAssessmentModal();
      closeCameraModal();
      closeLoginModal();
    }
  });
}

function openLoginModal(customSubtitle) {
  const modal = document.getElementById('loginModal');
  const sub = document.getElementById('authSubtitle');
  if (customSubtitle && sub) {
    sub.textContent = customSubtitle;
  }
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function switchAuthTab(type) {
  const loginTabBtn = document.getElementById('loginTabBtn');
  const signupTabBtn = document.getElementById('signupTabBtn');
  const nameFieldGroup = document.getElementById('nameFieldGroup');
  const authTitle = document.getElementById('authTitle');
  const authSubmitBtn = document.getElementById('authSubmitBtn');
  const forgotLink = document.getElementById('forgotPasswordLink');

  if (type === 'signup') {
    signupTabBtn.classList.add('active');
    loginTabBtn.classList.remove('active');
    nameFieldGroup.style.display = 'flex';
    authTitle.textContent = 'Create your SkinSense Account';
    authSubmitBtn.querySelector('span').textContent = 'Create Account';
    forgotLink.style.display = 'none';
  } else {
    loginTabBtn.classList.add('active');
    signupTabBtn.classList.remove('active');
    nameFieldGroup.style.display = 'none';
    authTitle.textContent = 'Welcome back to SkinSense';
    authSubmitBtn.querySelector('span').textContent = 'Log In';
    forgotLink.style.display = 'block';
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function handleAuthSubmit(event) {
  event.preventDefault();
  const toast = document.getElementById('authStatusToast');
  const submitBtn = document.getElementById('authSubmitBtn');

  submitBtn.disabled = true;
  submitBtn.querySelector('span').textContent = 'Authenticating...';

  setTimeout(() => {
    toast.classList.remove('hidden');
    submitBtn.disabled = false;
    submitBtn.querySelector('span').textContent = 'Success!';

    setTimeout(() => {
      closeLoginModal();
      toast.classList.add('hidden');
      submitBtn.querySelector('span').textContent = 'Log In';
    }, 1200);
  }, 700);
}

/* ==========================================================================
   Cute AI Meow Sticker Mascot & Speech Cloud Logic
   ========================================================================== */
function initMeowCompanion() {
  const meow = document.getElementById('meowCompanion');
  const catBody = document.getElementById('meowCatBody');
  const speechCloud = document.getElementById('meowSpeechCloud');
  const speechText = document.getElementById('meowSpeechText');
  const eyesOpen = document.getElementById('catEyesOpen');
  const eyesHappy = document.getElementById('catEyesHappy');
  const heart = document.getElementById('meowHeart');

  if (!meow || !speechCloud) return;

  const meowQuotes = [
    "Meow! Remember to hydrate your skin barrier today! 💧✨",
    "Purrr~ Drink some water for that dewy natural glow! 🌸",
    "Sniff sniff... checking your moisture score! ฅ^•ﻌ•^ฅ",
    "Don't forget daily SPF, even when indoors! ☀️🐾",
    "Ceramides protect your skin like a cozy warm blanket! 🧴💖",
    "Click me for good skin vibes and purrs! ( ^ ᵕ ^ )",
    "I'm keeping an eye on your 8 water glasses! 💧🐾",
    "Healthy skin is a marathon, not a sprint! Purrr~ 🌸",
    "You look glowing and purr-fect today! 💖✨"
  ];

  let currentX = window.innerWidth - 100;
  let currentY = window.innerHeight - 110;
  let targetX = currentX;
  let targetY = currentY;
  let isFollowingMouse = false;
  let followTimer = null;
  let speechTimer = null;
  let mouseX = currentX;
  let mouseY = currentY;
  let isMoving = false;
  let facingRight = false;

  // Set initial position
  meow.style.left = `${currentX}px`;
  meow.style.top = `${currentY}px`;
  meow.style.right = 'auto';
  meow.style.bottom = 'auto';

  // Function to show thought cloud
  function speak(text, duration = 4500) {
    if (speechText) speechText.textContent = text;
    speechCloud.classList.add('visible');

    if (speechTimer) clearTimeout(speechTimer);
    speechTimer = setTimeout(() => {
      speechCloud.classList.remove('visible');
    }, duration);
  }

  // Initial welcome greeting after 2.5 seconds
  setTimeout(() => {
    speak("Meow! I'm your AI Skincare Kitty companion! ฅ^•ﻌ•^ฅ");
  }, 2200);

  // Periodic random tips
  setInterval(() => {
    if (!speechCloud.classList.contains('visible') && Math.random() > 0.3) {
      const quote = meowQuotes[Math.floor(Math.random() * meowQuotes.length)];
      speak(quote);
    }
  }, 22000);

  // Mousemove listener: tracks cursor & triggers occasional curiosity
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // 15% random chance on movement to get curious and trot towards cursor
    if (!isFollowingMouse && Math.random() < 0.015) {
      startFollowingMouse();
    }
  });

  function startFollowingMouse() {
    isFollowingMouse = true;
    speak("Trotting over to check your screen! 🐾", 3000);

    if (followTimer) clearTimeout(followTimer);
    // Follow for 8 to 12 seconds, then return home or rest
    followTimer = setTimeout(() => {
      isFollowingMouse = false;
      // Head towards cozy bottom right
      targetX = window.innerWidth - 110;
      targetY = window.innerHeight - 110;
      speak("Purrr~ Sitting cute right here! 🌸", 3500);
    }, 9000);
  }

  // Animation frame loop for buttery movement
  function updateKittyMotion() {
    if (isFollowingMouse) {
      // Follow cursor with polite offset so she doesn't obstruct clicks
      const offsetX = mouseX > window.innerWidth / 2 ? -85 : 85;
      const offsetY = mouseY > window.innerHeight / 2 ? -75 : 75;
      targetX = Math.max(30, Math.min(window.innerWidth - 110, mouseX + offsetX));
      targetY = Math.max(80, Math.min(window.innerHeight - 110, mouseY + offsetY));
    }

    const dx = targetX - currentX;
    const dy = targetY - currentY;
    const distance = Math.hypot(dx, dy);

    if (distance > 3) {
      isMoving = true;
      currentX += dx * 0.055;
      currentY += dy * 0.055;

      meow.style.left = `${currentX}px`;
      meow.style.top = `${currentY}px`;
      meow.classList.add('trotting');

      // Flip orientation based on movement direction
      if (dx > 1 && !facingRight) {
        facingRight = true;
        catBody.style.transform = 'scaleX(1)';
      } else if (dx < -1 && facingRight) {
        facingRight = false;
        catBody.style.transform = 'scaleX(-1)';
      }
    } else {
      if (isMoving) {
        isMoving = false;
        meow.classList.remove('trotting');
      }
    }

    requestAnimationFrame(updateKittyMotion);
  }

  requestAnimationFrame(updateKittyMotion);

  // Resize handler to keep kitty in bounds
  window.addEventListener('resize', () => {
    currentX = Math.min(currentX, window.innerWidth - 110);
    currentY = Math.min(currentY, window.innerHeight - 110);
  });

  // Click / Pet interaction
  meow.addEventListener('click', (e) => {
    e.stopPropagation();

    // Trigger heart burst
    if (heart) {
      heart.classList.remove('pop');
      void heart.offsetWidth; // trigger reflow
      heart.classList.add('pop');
      setTimeout(() => heart.classList.remove('pop'), 800);
    }

    // Happy eyes expression
    if (eyesOpen && eyesHappy) {
      eyesOpen.classList.add('hidden');
      eyesHappy.classList.remove('hidden');
      setTimeout(() => {
        eyesOpen.classList.remove('hidden');
        eyesHappy.classList.add('hidden');
      }, 2200);
    }

    // Little happy jump
    meow.style.transform = 'scale(1.25) translateY(-10px)';
    setTimeout(() => {
      meow.style.transform = '';
    }, 250);

    // Cute speech lines for clicks
    const clickQuotes = [
      "Purrrr~ That feels so nice! 💖✨",
      "Meow! You unlocked a secret: drink water now! 💧",
      "ฅ^•ﻌ•^ฅ Soft skin barrier mode activated!",
      "I love watching you build healthy habits! 🌸",
      "Purrr purrr~ Your routine score is 100%! ✨"
    ];
    speak(clickQuotes[Math.floor(Math.random() * clickQuotes.length)], 4000);

    // If she wasn't following, start following on click!
    if (!isFollowingMouse) {
      startFollowingMouse();
    }
  });
}

