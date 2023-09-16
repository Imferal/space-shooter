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