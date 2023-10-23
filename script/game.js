import { Background } from './background.js';
import { Ship } from './ship.js';
import { InputHandler } from './input.js';
import { UI } from './ui.js';
import { EnemySpawner } from './enemySpawner.js';
import { Stop } from './shipStates.js';

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.enemies = [];
    this.bolts = [];
    this.enemyBolts = [];
    this.floatingMessages = [];
    this.particles = [];
    this.explosionParticles = [];

    this.speed = 12;
    this.maxSpeed = 12;
    this.gameOver = false;
    this.debug = false;
    this.maxParticles = 500;

    this.maxLives = 10;
    this.lives = this.maxLives;
    this.score = 0;
    this.levelTimer = 0;
    this.delayAfterDeath = 3000;
    this.rollBackWavesNumber = 1;
    this.level = 1;
    this.wave = 0;

    this.newLiveInProgress = true;
    this.gameOverMaxDelay = 3000;
    this.gameOverDelay = this.gameOverMaxDelay;
    this.gameOverInProgress = false;
    this.gameOver = false;
    this.gameCompleted = false;

    this.background = new Background(this);
    this.ship = new Ship(this);
    this.input = new InputHandler(this);
    this.ui = new UI(this);
    this.enemySpawner = new EnemySpawner(this);

    /** Инициализация первичного состояния */
    this.ship.currentState = this.ship.states[0];
    this.ship.currentState.enter();
  }

  update(deltaTime) {
    this.levelTimer += deltaTime;
    if (this.gameOver) {
      if (this.gameOverDelay > 0) {
        this.gameOverDelay -= deltaTime;
      } else {
        this.gameOverInProgress = false;
      }
    }

    if (this.newLiveInProgress) {
      this.ship.newLiveBlinking(deltaTime);
    }

    /** Background */
    this.background.update();

    /** Enemies */
    if (!this.gameOver) this.enemySpawner.spawnEnemy()
    this.enemies.forEach(enemy => {
      enemy.update(deltaTime);
    });
    this.enemies = this.enemies.filter(
      enemy => !enemy.markedForDeletion,
    );

    /** Particles */
    this.particles.forEach((particle) => {
      particle.update();
    })
    this.particles = this.particles.filter(
      particle => !particle.markedForDeletion
    )

    /** Particles Limit */
    if (this.particles.length > this.maxParticles) {
      this.particles.length = this.maxParticles;
    }

    /** Floating Messages */
    this.floatingMessages.forEach((message) => {
      message.update();
    })
    this.floatingMessages = this.floatingMessages.filter(
      message => !message.markedForDeletion
    )

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

    /** Particles */
    this.particles.forEach(particle => {
      particle.draw(context);
    })

    /** Floating Messages */
    this.floatingMessages.forEach(message => {
      message.draw(context);
    })

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
    this.gameCompleted = false;
    this.gameOverInProgress = false;

    this.enemies = [];
    this.bolts = [];
    this.enemyBolts = [];
    this.explosions = [];
    this.lives = this.maxLives;
    this.gameOverDelay = this.gameOverMaxDelay;
    this.level = 1;
    this.wave = 0;
    this.score = 0;
    this.levelTimer = 0;
    this.enemySpawner.resetLevels()
    this.background = new Background(this);
  }

  createNewShip(){
    this.ship.resetShip();
    this.ship.currentState = new Stop(this);
    this.newLiveInProgress = true;
  }

  setNewLevel() {
    this.lives++;
    this.level++;
    this.wave = 0;
    this.levelTimer = 0;
    this.background = new Background(this);
  }
}