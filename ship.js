import {
  Stop,
  Up,
  Down,
  Left,
  Right,
  UpRight,
  RightDown,
  DownLeft,
  LeftUp,
} from './shipStates.js';
import {BasicBolt} from './bolts.js';
import {Explosion} from './explosion.js';

export class Ship {
  constructor(game) {
    this.game = game;

    this.image = document.getElementById('ship');
    this.vy = 0;
    this.vx = 0;
    this.maxSpeed = 10;
    this.width = 64;
    this.height = 96;
    this.explosionSize = 5;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 1;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.shot = false;
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height - this.height - 50;
    this.currentState = null;
    this.states = [
      new Stop(this.game),
      new Up(this.game),
      new Down(this.game),
      new Left(this.game),
      new Right(this.game),
      new UpRight(this.game),
      new RightDown(this.game),
      new DownLeft(this.game),
      new LeftUp(this.game),
    ]

  }

  update(input, deltaTime) {
    this.currentState.handleInput(input);
    /** Movement */
    this.x += this.vx;
    this.y += this.vy;

    this.setDirection(input);
    this.shooting(input, deltaTime);
    this.checkCollisions()

    /** Boundaries */
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
    if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
    if (this.y > this.game.height - this.height) this.y = this.game.height - this.height;

    /** Animation */
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else if (
        this.currentState !== this.states[3]
        && this.currentState !== this.states[4]
        && this.currentState !== this.states[5]
        && this.currentState !== this.states[6]
        && this.currentState !== this.states[7]
        && this.currentState !== this.states[8]
      ) this.frameX = 0;
      else this.frameX = this.maxFrame - 1
    } else {
      this.frameTimer += deltaTime;
    }
  }

  draw(context) {
    if (this.game.debug) {
      context.fillStyle = 'white';
      context.fillRect(this.x, this.y, this.width, this.height);
    }
    context.drawImage(
      this.image,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }

  /** Change state */
  setState(state) {
    this.currentState = this.states[state];
    this.game.speed = this.game.maxSpeed;
    /** New state init */
    this.currentState.enter();
  }
  
  /** Set the direction of movement */
  setDirection(input) {
    if (input.KeyW && input.KeyD) {
      this.vx = this.maxSpeed; this.vy = -this.maxSpeed;
    } else if (input.KeyD && input.KeyS) {
      this.vx = this.maxSpeed;
      this.vy = this.maxSpeed;
    } else if (input.KeyS && input.KeyA) {
      this.vx = -this.maxSpeed;
      this.vy = this.maxSpeed;
    } else if (input.KeyA && input.KeyW) {
      this.vx = -this.maxSpeed;
      this.vy = -this.maxSpeed;
    } else if (input.KeyW) {
      this.vx = 0;
      this.vy = -this.maxSpeed;
    }
    else if (input.KeyS) {
      this.vx = 0;
      this.vy = this.maxSpeed;
    }
    else if (input.KeyD) {
      this.vy = 0;
      this.vx = this.maxSpeed;
    }
    else if (input.KeyA) {
      this.vy = 0;
      this.vx = -this.maxSpeed;
    }
    else {
      this.vx = 0;
      this.vy = 0;
      if (this.currentState !== this.states[0]) this.setState(0)
    }
  }
  
  /** Shooting */
  shooting() {
    if (this.shot) {
      this.shot = false;
      this.game.bolts.push(new BasicBolt(this.game));
    }
  }

  /** Collisions with enemies */
  checkCollisions() {
    this.game.enemies.forEach(enemy => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        enemy.markedForDeletion = true;
        this.game.explosions.push(
          new Explosion(
            this.game,
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5,
            enemy.explosionSize,
          ),
        );
        this.collisionHandler()
      }
    })
  }

  collisionHandler() {
    this.markedForDeletion = true;
    this.game.enemies = [];
    this.game.enemyBolts = [];
    this.game.explosions.push(
      new Explosion(
        this.game,
        this.game.ship.x + this.game.ship.width * 0.5,
        this.game.ship.y + this.game.ship.height * 0.5,
        this.game.ship.explosionSize,
      ),
    );
    this.game.lives--;
    if (this.game.lives <= 0) this.game.gameOver = true;
    else {
      this.game.ship = new Ship(this.game);
      this.game.ship.currentState = new Stop(this.game);
    }
  }
}