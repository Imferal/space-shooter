export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 20;
    this.fontFamily = 'PressStart';
    this.fontColor = 'white';
    this.livesImage = document.getElementById('ship');
    this.blinkTimer = 800;
    this.isBlinkingTextVisible = true;
  }

  update(deltaTime) {
    if (this.blinkTimer > 0) {
      this.blinkTimer -= deltaTime;
    }
    else {
      this.blinkTimer = 800;
      this.isBlinkingTextVisible = !this.isBlinkingTextVisible;
    }
  }

  draw(context) {
    context.textAlign = 'left';
    context.fillStyle = this.fontColor;

    /** Scores */
    context.font = this.fontSize + 'px ' + this.fontFamily;
    context.fillText('Score: ' + this.game.score, 20, 40);

    /** Waves */
    context.font = this.fontSize * 0.5 + 'px ' + this.fontFamily;
    context.fillText('Wave: ' + this.game.wave, 20, 70);

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
    if (this.game.gameOver && !this.game.gameOverInProgress) {
      context.textAlign = 'center';
      context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
      context.fillText('Game Over', this.game.width * 0.5, this.game.height * 0.5 - 20);
      if (this.isBlinkingTextVisible) {
        context.fillStyle = 'yellow';
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Press Space to Start', this.game.width * 0.5, this.game.height * 0.5 + 20);
      }
    }

    /** Debug Information */
    if (this.game.debug) {
      context.fillStyle = 'green';
      context.font = 10 + 'px ' + this.fontFamily;
      context.fillText('Enemies: ' + this.game.enemies.length, 20, this.game.height - 20);
      context.fillText('Bolts: ' + this.game.bolts.length, 20, this.game.height - 40);
      context.fillText('EnemyBolts: ' + this.game.enemyBolts.length, 20, this.game.height - 60);
      context.fillText('Explosions: ' + this.game.explosions.length, 20, this.game.height - 80);
      context.fillText('GameTimer: ' + this.game.gameTimer, 20, this.game.height - 100);
    }
  }
}