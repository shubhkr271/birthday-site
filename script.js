const overlay = document.getElementById("overlay");
const unlockBtn = document.getElementById("unlockBtn");
const input = document.getElementById("passwordInput");
const errorMsg = document.getElementById("errorMsg");
const loveLetter = document.getElementById("loveLetter");
const music = document.getElementById("bgMusic");

const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseModal = document.getElementById("surpriseModal");
const giftBtn = document.getElementById("giftBtn");
const giftStep = document.getElementById("giftStep");
const qrStep = document.getElementById("qrStep");

const PASSWORD = "0702";

/* 💖 HEART-DOMINANT EMOJI SET */
const emojiSet = ["💖","💘","💕","❤️","💝","💫","✨","🥰","🎉","🎂"];

let emojiBeatInterval = null;
let qrVisible = false;
let qrGlowEl = null;

/* ===========================
   UNLOCK
   =========================== */
unlockBtn.onclick = () => {
  if (input.value === PASSWORD) {
    overlay.remove();
    document.body.classList.remove("locked");

    loveLetter.style.opacity = "1";
    loveLetter.style.transform = "translateY(0)";

    music.play();

    // cinematic pause before emoji rain
    setTimeout(startBeatSyncedEmojis, 700);
  } else {
    errorMsg.style.display = "block";
  }
};

/* ===========================
   🎵 BEAT-SYNCED EMOJI RAIN
   =========================== */
function startBeatSyncedEmojis() {
  if (emojiBeatInterval) return;

  const BEAT_INTERVAL = 520;

  emojiBeatInterval = setInterval(() => {
    for (let i = 0; i < 6; i++) {
      spawnEmoji();
    }
  }, BEAT_INTERVAL);
}

/* ===========================
   EMOJI SPAWN (QR SAFE)
   =========================== */
function spawnEmoji() {
  const e = document.createElement("div");
  e.className = "emoji";

  const isHeart = Math.random() < 0.7;
  e.textContent = isHeart
    ? ["💖","💘","💕","❤️","💝"][Math.floor(Math.random() * 5)]
    : emojiSet[Math.floor(Math.random() * emojiSet.length)];

  e.style.fontSize = 55 + Math.random() * 30 + "px";

  // 🚫 Protect QR scan zone
  let left;
  const safeZoneStart = 35; // %
  const safeZoneEnd = 65;   // %

  do {
    left = Math.random() * 100;
  } while (qrVisible && left > safeZoneStart && left < safeZoneEnd);

  e.style.left = left + "vw";

  document.body.appendChild(e);
  setTimeout(() => e.remove(), 5200);
}

/* ===========================
   MEMORY CARD REVEAL
   =========================== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll(".memory-card").forEach(card => {
  observer.observe(card);
});

/* ===========================
   SHOW SURPRISE AT BOTTOM
   =========================== */
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 120) {
    surpriseBtn.classList.add("show");
  }
});

/* ===========================
   OPEN MODAL
   =========================== */
surpriseBtn.onclick = () => {
  surpriseModal.style.display = "flex";
};

/* ===========================
   🎁 GIFT SEQUENCE
   =========================== */
giftBtn.onclick = () => {
  launchConfetti();
  heartBurst();

  giftStep.style.display = "none";

  setTimeout(() => {
    qrStep.style.display = "block";
    qrVisible = true;
    addQrGlow();           // 🌟 SOFT GLOW BEHIND QR
    finalHeartExplosion();
  }, 300);
};

/* ===========================
   🌟 QR BACK GLOW
   =========================== */
function addQrGlow() {
  if (qrGlowEl) return;

  qrGlowEl = document.createElement("div");
  qrGlowEl.style.position = "fixed";
  qrGlowEl.style.width = "340px";
  qrGlowEl.style.height = "340px";
  qrGlowEl.style.borderRadius = "50%";
  qrGlowEl.style.left = "50%";
  qrGlowEl.style.top = "50%";
  qrGlowEl.style.transform = "translate(-50%, -50%)";
  qrGlowEl.style.background =
    "radial-gradient(circle, rgba(226,107,122,0.35) 0%, rgba(226,107,122,0.15) 35%, transparent 70%)";
  qrGlowEl.style.filter = "blur(8px)";
  qrGlowEl.style.zIndex = "1";
  qrGlowEl.style.pointerEvents = "none";

  document.body.appendChild(qrGlowEl);
}

/* ===========================
   CONFETTI
   =========================== */
function launchConfetti() {
  for (let i = 0; i < 90; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = `hsl(${Math.random() * 360},100%,60%)`;
    c.style.animationDuration = 3 + Math.random() * 2 + "s";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}

/* ===========================
   💖 SMALL HEART BURST
   =========================== */
function heartBurst() {
  for (let i = 0; i < 12; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = "💖";
    h.style.left = 45 + Math.random() * 10 + "vw";
    h.style.bottom = "50vh";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 2000);
  }
}

/* ===========================
   💥 FINAL HEART EXPLOSION
   =========================== */
function finalHeartExplosion() {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  for (let i = 0; i < 28; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = ["💖","💘","💕","❤️"][Math.floor(Math.random() * 4)];

    document.body.appendChild(h);
    h.style.left = cx + "px";
    h.style.top = cy + "px";

    const angle = Math.random() * Math.PI * 2;
    const distance = 120 + Math.random() * 100;

    h.animate(
      [
        { transform: "translate(0,0) scale(0.6)", opacity: 1 },
        {
          transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1.6)`,
          opacity: 0
        }
      ],
      { duration: 1600, easing: "ease-out" }
    );

    setTimeout(() => h.remove(), 1800);
  }
}

/* ===========================
   CLOSE MODAL
   =========================== */
surpriseModal.onclick = e => {
  if (e.target === surpriseModal) {
    surpriseModal.style.display = "none";
    giftStep.style.display = "block";
    qrStep.style.display = "none";
    qrVisible = false;

    // remove glow
    if (qrGlowEl) {
      qrGlowEl.remove();
      qrGlowEl = null;
    }
  }
};
