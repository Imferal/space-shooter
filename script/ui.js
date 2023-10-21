import { levels } from '../levels/levels.js';

export class UI {
  constructor(game) {
    this.game = game;
    this.levels = levels;
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

    /** Level */
    context.font = this.fontSize * 0.5 + 'px ' + this.fontFamily;
    context.fillText('Level: ' + (this.game.level), 20, this.game.height - 20);

    /** Wave */
    context.font = this.fontSize * 0.5 + 'px ' + this.fontFamily;
    context.textAlign = 'right';
    context.fillText('Wave: ' + (this.game.wave + 1), this.game.width - 20, this.game.height - 20);

    /** Game Over */
    if (this.game.gameOver && !this.game.gameOverInProgress) {
      context.textAlign = 'center';
      context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
      context.fillText('Game Over', this.game.width * 0.5, this.game.height * 0.5 - 20);
      if (this.isBlinkingTextVisible) {
        context.fillStyle = 'yellow';
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText(
          'Press "Space" to Start...',
          this.game.width * 0.5,
          this.game.height * 0.5 + 60,
        );
      }
    }

    /** Game Completed */
    if (this.game.gameCompleted) {
      context.fillStyle = 'green';
      context.textAlign = 'center';
      context.font = this.fontSize * 1.6 + 'px ' + this.fontFamily;
      context.fillText(
        'Congratulations!',
        this.game.width * 0.5,
        this.game.height * 0.5 - 70
      );
      context.fillStyle = 'white';
      context.font = this.fontSize + 'px ' + this.fontFamily;
      context.fillText(
        'You have successfully',
        this.game.width * 0.5,
        this.game.height * 0.5 - 20
      );
      context.fillText(
        'defended the galaxy',
        this.game.width * 0.5,
        this.game.height * 0.5 + 10
      );
      context.fillText(
        'from space invaders!',
        this.game.width * 0.5,
        this.game.height * 0.5 + 40
      );
      if (this.isBlinkingTextVisible) {
        context.fillStyle = 'yellow';
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText(
          'Press "Enter" to Start New Game...',
          this.game.width * 0.5,
          this.game.height * 0.5 + 90
        );
      }
    }
    
    /** New Level Message*/
    if (this.game.levelTimer < 5000) {      
      context.textAlign = 'center';
      context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
      context.fillStyle = 'red';
      context.fillText(
        this.levels[this.game.level - 1].text.header,
        this.game.width * 0.5,
        this.game.height * 0.5 - 100);
      context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
      context.fillStyle = 'yellowgreen';
      if (this.levels[this.game.level - 1].text.subHeader) {
        context.fillText(
          this.levels[this.game.level - 1].text.subHeader,
          this.game.width * 0.5,
          this.game.height * 0.5 + 10);
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
      context.fillText('GameTimer: ' + this.game.levelTimer, 20, this.game.height - 100);
    }
  }
}