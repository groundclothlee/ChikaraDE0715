let rotationY = 0;
let isDragging = false;
let lastX = 0;

const container = document.getElementById('imageContainer');

document.addEventListener('mousedown', (e) => {
  isDragging = true;
  lastX = e.clientX;
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const deltaX = e.clientX - lastX;
  rotationY += deltaX * 0.5; // 控制旋轉速度
  container.style.transform = `rotateY(${rotationY}deg)`;
  lastX = e.clientX;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

document.addEventListener('mouseleave', () => {
  isDragging = false;
});
