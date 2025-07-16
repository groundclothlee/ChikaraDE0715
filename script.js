const card = document.getElementById('card');

let rotationY = 0;
let velocity = 0;
let lastX = null;
let animationFrame;

function applyTransform() {
  card.style.transform = `rotateY(${rotationY}deg)`;
}

function animateInertia() {
  if (Math.abs(velocity) < 0.05) return;
  rotationY += velocity;
  velocity *= 0.95;
  applyTransform();
  animationFrame = requestAnimationFrame(animateInertia);
}

// 滑鼠事件
document.addEventListener('mousemove', (e) => {
  if (lastX === null) {
    lastX = e.clientX;
    return;
  }
  const delta = e.clientX - lastX;
  velocity = delta * 0.3;
  rotationY += velocity;
  applyTransform();
  lastX = e.clientX;
  if (animationFrame) cancelAnimationFrame(animationFrame);
});

document.addEventListener('mouseleave', () => {
  lastX = null;
  animateInertia();
});

// 觸控事件
document.addEventListener('touchmove', (e) => {
  if (e.touches.length !== 1) return;

  const touchX = e.touches[0].clientX;
  if (lastX === null) {
    lastX = touchX;
    return;
  }

  const delta = touchX - lastX;
  velocity = delta * 0.3;
  rotationY += velocity;
  applyTransform();
  lastX = touchX;
  if (animationFrame) cancelAnimationFrame(animationFrame);
}, { passive: true });

document.addEventListener('touchend', () => {
  lastX = null;
  animateInertia();
});
