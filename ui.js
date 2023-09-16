export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 20;
    this.fontFamily = 'PressStart';
    this.fontColor = 'white';
    this.livesImage = document.getElementById('ship');
  }

  draw(context) {
    // context.save();
  //   context.shadowOffsetX = 2;
  //   context.shadowOffsetY = 2;
  //   context.shadowColor = 'white';
  //   context.shadowBlur = 0;
  //
    context.font = this.fontSize + 'px ' + this.fontFamily;
    context.textAlign = 'left';
    context.fillStyle = this.fontColor;

    /** Очки */
    context.fillText('Score: ' + this.game.score, 20, 40);
  //
  //   /** Таймер */
  //   context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
  //   context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
  //
    /** Жизни */
    for (let i = 0; i < this.game.lives; i++) {
      context.drawImage(this.livesImage,
        0,
        0,
        64,
        96,
        this.game.width - 28 * i - 45,
        16,
        24,
        36,
      );
    }
  //
  //   /** Game Over */
  //   if (this.game.gameOver) {
  //     context.textAlign = 'center';
  //     context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
  //     if (this.game.score >= this.game.winningScore) {
  //       context.fillText(
  //         'Boo-yah',
  //         this.game.width * 0.5,
  //         this.game.height * 0.5 - 20,
  //       );
  //       context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
  //       context.fillText(
  //         'What are creatures of the night afraid of? YOU!!!',
  //         this.game.width * 0.5,
  //         this.game.height * 0.5 + 20,
  //       );
  //     } else {
  //       context.fillText(
  //         'Love at first bite?',
  //         this.game.width * 0.5,
  //         this.game.height * 0.5 - 20,
  //       );
  //       context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
  //       context.fillText(
  //         'Nope, better luck next time!',
  //         this.game.width * 0.5,
  //         this.game.height * 0.5 + 20,
  //       );
  //     }
  //   }
  //   context.restore();
  }
}