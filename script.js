const card = document.getElementById('card');
const scene = document.querySelector('.scene');

let rotationY = 0;
let velocity = 0;
let lastX = null;
let isInside = false;
let animationFrame;

function applyTransform() {
  card.style.transform = `rotateY(${rotationY}deg)`;
}

function animateInertia() {
  if (!isInside) {
    if (Math.abs(velocity) > 0.05) {
      rotationY += velocity;
      velocity *= 0.95;
      applyTransform();
      animationFrame = requestAnimationFrame(animateInertia);
    }
  }
}

// 滑鼠進入 scene 才允許操作
scene.addEventListener('mouseenter', () => {
  isInside = true;
  lastX = null;
  if (animationFrame) cancelAnimationFrame(animationFrame);
});

// 滑鼠離開 scene 後進入慣性模式
scene.addEventListener('mouseleave', () => {
  isInside = false;
  lastX = null;
  animateInertia();
});

// 滑鼠滑動
scene.addEventListener('mousemove', (e) => {
  if (!isInside) return;
  if (lastX === null) {
    lastX = e.clientX;
    return;
  }
  const delta = e.clientX - lastX;
  velocity = delta * 0.6;
  rotationY += velocity;
  applyTransform();
  lastX = e.clientX;
});

// 觸控支援
scene.addEventListener('touchstart', () => {
  isInside = true;
  lastX = null;
  if (animationFrame) cancelAnimationFrame(animationFrame);
});

scene.addEventListener('touchmove', (e) => {
  if (!isInside || e.touches.length !== 1) return;
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
});

scene.addEventListener('touchend', () => {
  isInside = false;
  lastX = null;
  animateInertia();
});
