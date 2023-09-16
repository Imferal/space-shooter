export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 20;
    this.fontFamily = 'PressStart';
    this.fontColor = 'white';
    this.livesImage = document.getElementById('ship');
  }

  draw(context) {
    context.font = this.fontSize + 'px ' + this.fontFamily;
    context.textAlign = 'left';
    context.fillStyle = this.fontColor;

    /** Scores */
    context.fillText('Score: ' + this.game.score, 20, 40);

    /** Lives */
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

    /** Game Over */
    if (this.game.gameOver) {
      context.textAlign = 'center';
      context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
      context.fillText(
        'Game Over',
        this.game.width * 0.5,
        this.game.height * 0.5 - 20,
      );
    }
    
    /** Debug Information */
    if (this.game.debug) {
      context.fillStyle = 'green';
      context.font = 10 + 'px ' + this.fontFamily;
      context.fillText('Enemies: ' + this.game.enemies.length, 20, this.game.height - 20)
      context.fillText('Bolts: ' + this.game.bolts.length, 20, this.game.height - 40)
      context.fillText('EnemyBolts: ' + this.game.enemyBolts.length, 20, this.game.height - 60)
      context.fillText('Explosions: ' + this.game.explosions.length, 20, this.game.height - 80)
    }
  }
}