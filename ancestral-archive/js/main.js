const waveformEl = document.getElementById('waveform');
const playBtn = document.getElementById('play-btn');
const audioTimeEl = document.getElementById('audio-time');

const heights = [8,14,20,26,18,24,30,22,16,28,20,12,18,24,16,20,10,14,22,28,18,24,14,10,16,22,18,26,20,12];
let isPlaying = false;
let currentSecond = 0;
const totalSeconds = 522;

if (waveformEl) {
  heights.forEach((h, i) => {
    const bar = document.createElement('span');
    bar.className = 'waveform-bar';
    bar.style.height = h + 'px';
    bar.dataset.index = i;
    waveformEl.appendChild(bar);
  });
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return m + ':' + (sec < 10 ? '0' : '') + sec;
}

function updateWaveform() {
  const bars = waveformEl ? waveformEl.querySelectorAll('.waveform-bar') : [];
  const progress = currentSecond / totalSeconds;
  const playedCount = Math.floor(progress * bars.length);
  bars.forEach((bar, i) => {
    bar.classList.toggle('played', i < playedCount);
  });
  if (audioTimeEl) {
    audioTimeEl.textContent = formatTime(currentSecond) + ' / ' + formatTime(totalSeconds);
  }
}

let ticker = null;

function startTick() {
  ticker = setInterval(() => {
    if (currentSecond < totalSeconds) {
      currentSecond++;
      updateWaveform();
    } else {
      clearInterval(ticker);
      isPlaying = false;
      playBtn.textContent = '\u25BA';
    }
  }, 1000);
}

if (playBtn) {
  playBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
      playBtn.textContent = '\u23F8';
      startTick();
    } else {
      playBtn.textContent = '\u25BA';
      clearInterval(ticker);
    }
  });
}

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.display = open ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '60px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'var(--cream)';
    navLinks.style.padding = '1rem 2rem';
    navLinks.style.borderBottom = '0.5px solid var(--border)';
    navLinks.style.zIndex = '99';
  });
}

const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      card.click();
    }
  });
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
});

updateWaveform();
