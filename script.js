body, html {
  margin: 0;
  height: 100%;
  background: #111;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  perspective: 1200px;
}

.scene {
  width: 400px;
  height: 400px;
  position: relative;
}

.card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.1s linear;
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.front img {
  width: 100%;
  height: auto;
}

.back {
  background: white;
  transform: rotateY(180deg);
}
