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

export class Ship {
  constructor(game) {
    this.game = game;

    this.image = document.getElementById('ship');
    this.vy = 0;
    this.vx = 0;
    this.maxSpeed = 10;
    this.width = 64;
    this.height = 96;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 1;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.shotDelay = 300;
    this.shotTimer = 0;
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
  shooting(input, deltaTime) {
    if (this.shotTimer > this.shotDelay) {
      this.shotTimer = 0;
      if (input.Space) {
        this.game.bolts.push(new BasicBolt(this.game));
      }
    } else this.shotTimer += deltaTime;
  }
}