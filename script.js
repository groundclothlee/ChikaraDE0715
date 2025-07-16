const card = document.getElementById('card');
const scene = document.querySelector('.scene');

let rotationX = 0;
let rotationY = 0;
let velocityX = 0;
let velocityY = 0;
let lastX = null;
let lastY = null;
let isInside = false;
let animationFrame;

function applyTransform() {
  card.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
}

function animateInertia() {
  if (Math.abs(velocityX) > 0.05 || Math.abs(velocityY) > 0.05) {
    rotationY += velocityX;
    rotationX -= velocityY;
    velocityX *= 0.95;
    velocityY *= 0.95;
    applyTransform();
    animationFrame = requestAnimationFrame(animateInertia);
  }
}

//  滑鼠進入圖片範圍才控制
scene.addEventListener('mouseenter', () => {
  isInside = true;
  lastX = null;
  lastY = null;
  if (animationFrame) cancelAnimationFrame(animationFrame);
});

scene.addEventListener('mouseleave', () => {
  isInside = false;
  lastX = null;
  lastY = null;
  animateInertia();
});

scene.addEventListener('mousemove', (e) => {
  if (!isInside) return;

  if (lastX === null || lastY === null) {
    lastX = e.clientX;
    lastY = e.clientY;
    return;
  }

  const deltaX = e.clientX - lastX;
  const deltaY = e.clientY - lastY;

  velocityX = deltaX * 0.5;
  velocityY = deltaY * 0.5;

  rotationY += velocityX;
  rotationX -= velocityY;

  applyTransform();

  lastX = e.clientX;
  lastY = e.clientY;
});

//  手機觸控
scene.addEventListener('touchstart', (e) => {
  if (e.touches.length !== 1) return;
  lastX = e.touches[0].clientX;
  lastY = e.touches[0].clientY;
  if (animationFrame) cancelAnimationFrame(animationFrame);
});

scene.addEventListener('touchmove', (e) => {
  if (e.touches.length !== 1) return;
  const touchX = e.touches[0].clientX;
  const touchY = e.touches[0].clientY;

  const deltaX = touchX - lastX;
  const deltaY = touchY - lastY;

  velocityX = deltaX * 0.5;
  velocityY = deltaY * 0.5;

  rotationY += velocityX;
  rotationX -= velocityY;

  applyTransform();

  lastX = touchX;
  lastY = touchY;
});

scene.addEventListener('touchend', () => {
  animateInertia();
});
