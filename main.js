import {Ship} from './ship.js';
import {InputHandler} from './input.js';
import {EnemyBig, EnemyMedium, EnemySmall} from './enemy.js';
import {Background} from './background.js';
import {UI} from './ui.js';

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

      this.enemies = [];
      this.bolts = [];
      this.enemyBolts = [];
      this.explosions = [];

      this.enemyTimer = 0;
      this.enemyInterval = 1000;

      this.speed = 4;
      this.maxSpeed = 4;
      this.gameOver = false;
      this.debug = false;
      
      this.lives = 5;
      this.score = 0;
      this.gameOver = false;

      /** Инициализация первичного состояния */
      this.ship.currentState = this.ship.states[0];
      this.ship.currentState.enter();
    }

    update(deltaTime) {
      /** Background */
      this.background.update();
      
      /** Enemies */
      if (this.enemyTimer > this.enemyInterval) {
        this.enemyTimer = 0;
        this.addEnemy()
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach(enemy => {
        enemy.update(deltaTime);
      })
      this.enemies = this.enemies.filter(
        enemy => !enemy.markedForDeletion
      )

      /** Ship */
      this.ship.update(this.input.keys, deltaTime);

      /** Bolts */
      this.bolts.forEach(bolt => {
        bolt.update(deltaTime)
      })
      this.bolts = this.bolts.filter(
        bolt => !bolt.markedForDeletion
      )
      
      /** Enemy Bolts */
      this.enemyBolts.forEach(bolt => {
        bolt.update(deltaTime)
      })
      this.enemyBolts = this.enemyBolts.filter(
        bolt => !bolt.markedForDeletion
      )
      
      /** Explosions */
      this.explosions.forEach(explosion => {
        explosion.update(deltaTime)
      })
      this.explosions = this.explosions.filter(
        explosion => !explosion.markedForDeletion
      )
    }

    draw(context) {
      /** Background */
      this.background.draw(context);
      
      /** Enemies */
      this.enemies.forEach(enemy => {
        enemy.draw(context);
      })

      /** Ship */
      this.ship.draw(context)

      /** Bolts */
      this.bolts.forEach(bolt => {
        bolt.draw(context);
      })

      /** Enemy Bolts */
      this.enemyBolts.forEach(bolt => {
        bolt.draw(context);
      })

      /** Explosions */
      this.explosions.forEach(explosion => {
        explosion.draw(context)
      })
      
      /** UI */
      this.ui.draw(context);
    }

    addEnemy() {
      if (Math.random() > 0.2) this.enemies.push(new EnemySmall(this, 2000))
      if (Math.random() > 0.6) this.enemies.push(new EnemyMedium(this, 1800))
      if (Math.random() > 0.85) this.enemies.push(new EnemyBig(this, 1200))
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
    if (!game.gameOver) requestAnimationFrame(animate)
  }

  animate(0)
})