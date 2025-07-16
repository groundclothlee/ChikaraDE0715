const card = document.getElementById("card");

let rotationY = 0;
let velocity = 0;
let lastMouseX = null;
let animationFrameId;

function animateInertia() {
  if (Math.abs(velocity) < 0.05) return; // 停止動畫
  rotationY += velocity;
  velocity *= 0.95; // 慣性衰減
  card.style.transform = `rotateY(${rotationY}deg)`;
  animationFrameId = requestAnimationFrame(animateInertia);
}

document.addEventListener("mousemove", (e) => {
  if (lastMouseX === null) {
    lastMouseX = e.clientX;
    return;
  }

  const deltaX = e.clientX - lastMouseX;
  velocity = deltaX * 0.3;
  rotationY += velocity;
  card.style.transform = `rotateY(${rotationY}deg)`;
  lastMouseX = e.clientX;

  if (animationFrameId) cancelAnimationFrame(animationFrameId);
});

document.addEventListener("mouseleave", () => {
  lastMouseX = null;
  animateInertia();
});
