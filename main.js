import { Game } from './script/game.js';

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 600;
  canvas.height = window.innerHeight;

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime, ctx);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }

  animate(0);
});