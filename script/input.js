export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = {
      KeyW: false,
      KeyS: false,
      KeyA: false,
      KeyD: false,
      KeyX: false,
      Space: false,
    };

    window.addEventListener('keypress', e => {
      if (e.code === 'Space') {
        if (!this.game.gameOver && !this.game.gameCompleted) this.game.ship.shot = true;
        else this.game.resetGame();
      }
    })

    window.addEventListener('keydown', e => {
      /** Если клавиша нажата и не находится в массиве keys - добавляем её туда */
      this.keys[e.code] = true;
      if (e.code === 'KeyX') this.game.debug = !this.game.debug;
    });

    window.addEventListener('keyup', e => {
      this.keys[e.code] = false;
    });
  }
}