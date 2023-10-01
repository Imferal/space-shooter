import { Ship } from './ship.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { UI } from './ui.js';
import { EnemySpawner } from './enemySpawner.js';

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 600;
  canvas.height = window.innerHeight;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;

      this.background = new Background(this);
      this.ship = new Ship(this);
      this.input = new InputHandler(this);
      this.ui = new UI(this);
      this.enemySpawner = new EnemySpawner(this);

      this.enemies = [];
      this.bolts = [];
      this.enemyBolts = [];
      this.explosions = [];

      this.speed = 4;
      this.maxSpeed = 4;
      this.gameOver = false;
      this.debug = false;

      this.maxLives = 10;
      this.lives = this.maxLives;
      this.score = 0;
      this.gameTimer = 0;
      this.level = 0;
      this.wave = 0;

      this.gameOverMaxDelay = 3000;
      this.gameOverDelay = this.gameOverMaxDelay;
      this.gameOverInProgress = false;
      this.gameOver = false;

      /** Инициализация первичного состояния */
      this.ship.currentState = this.ship.states[0];
      this.ship.currentState.enter();
    }

    update(deltaTime) {
      this.gameTimer += deltaTime;
      if (this.gameOver) {
        if (this.gameOverDelay > 0) {
          this.gameOverDelay -= deltaTime;
        } else {
          this.gameOverInProgress = false;
        }
      }

      /** Background */
      this.background.update();

      /** Enemies */
      this.enemySpawner.spawnEnemy()
      this.enemies.forEach(enemy => {
        enemy.update(deltaTime);
      });
      this.enemies = this.enemies.filter(
        enemy => !enemy.markedForDeletion,
      );

      /** Explosions */
      this.explosions.forEach(explosion => {
        explosion.update(deltaTime);
      });
      this.explosions = this.explosions.filter(
        explosion => !explosion.markedForDeletion,
      );

      if (!this.gameOver) {
        /** Ship */
        this.ship.update(this.input.keys, deltaTime);

        /** Bolts */
        this.bolts.forEach(bolt => {
          bolt.update(deltaTime);
        });
        this.bolts = this.bolts.filter(
          bolt => !bolt.markedForDeletion,
        );

        /** Enemy Bolts */
        this.enemyBolts.forEach(bolt => {
          bolt.update(deltaTime);
        });
        this.enemyBolts = this.enemyBolts.filter(
          bolt => !bolt.markedForDeletion,
        );
      }

      /** UI */
      this.ui.update(deltaTime);
    }

    draw(context) {
      /** Background */
      this.background.draw(context);

      /** Enemies */
      this.enemies.forEach(enemy => {
        enemy.draw(context);
      });

      /** Explosions */
      this.explosions.forEach(explosion => {
        explosion.draw(context);
      });

      if (!this.gameOver) {
        /** Ship */
        this.ship.draw(context);

        /** Bolts */
        this.bolts.forEach(bolt => {
          bolt.draw(context);
        });

        /** Enemy Bolts */
        this.enemyBolts.forEach(bolt => {
          bolt.draw(context);
        });
      }

      /** UI */
      this.ui.draw(context);
    }
    
    resetGame() {
      this.gameOver = false;
      this.gameOverInProgress = false;
      
      this.enemies = [];
      this.bolts = [];
      this.enemyBolts = [];
      this.explosions = [];
      this.lives = this.maxLives;
      this.score = 0;
      this.gameOverDelay = this.gameOverMaxDelay;
      this.gameTimer = 0;
    }
  }


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