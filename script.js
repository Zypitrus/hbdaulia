let slides = document.querySelectorAll(".slide");
let current = 0;
let progress = document.querySelector(".progress");

function showSlide(index) {
  slides.forEach(s => s.classList.remove("active"));
  slides[index].classList.add("active");

  if (index === slides.length - 1) startConfetti();
}

/* AUTO SLIDE + PROGRESS */
let duration = 4000;
let startTime = Date.now();

function autoSlide() {
  let now = Date.now();
  let percent = ((now - startTime) / duration) * 100;
  progress.style.width = percent + "%";

  if (percent >= 100) {
    current++;
    if (current >= slides.length) current = 0;
    showSlide(current);
    startTime = Date.now();
  }

  requestAnimationFrame(autoSlide);
}

autoSlide();

/* SWIPE (mobile friendly) */
let startX = 0;

document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) {
    current = Math.min(current + 1, slides.length - 1);
  } else if (endX - startX > 50) {
    current = Math.max(current - 1, 0);
  }

  showSlide(current);
});

/* CONFETTI */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pieces = [];

function randomColor() {
  const colors = ["#ff00cc", "#00ffff", "#ffcc00", "#00ff88"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createConfetti() {
  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 6 + 2,
      color: randomColor(),
      speed: Math.random() * 3 + 2
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pieces.forEach(p => {
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
    p.y += p.speed;
    if (p.y > canvas.height) p.y = -10;
  });
}

function startConfetti() {
  if (pieces.length === 0) {
    createConfetti();
    setInterval(drawConfetti, 20);
  }
}