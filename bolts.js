import {Explosion} from './explosion.js';

class Bolt {
  constructor() {
    this.frameX = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;

    this.game = null;
    this.x = null;
    this.y = null;
    this.image = null;
    this.width = null;
    this.height = null;
    this.maxFrame = null;
    this.speedY = null;
  }

  update(deltaTime) {
    this.checkCollisions()
    this.y -= this.speedY;

    /** Animation */
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }

    if (this.y + this.height < 0) this.markedForDeletion = true;
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
  
  checkCollisions() {
    this.game.enemies.forEach(enemy => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        enemy.markedForDeletion = true;
        this.markedForDeletion = true;
        this.game.score++;
        this.game.explosions.push(
          new Explosion(
            this.game,
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5,
          )
        )
      }
    })
  }
}

export class BasicBolt extends Bolt {
  constructor(game) {
    super();
    this.game = game;
    this.image = document.getElementById('basicBolt');
    this.width = 20;
    this.height = 72;
    this.x = this.game.ship.x + this.game.ship.width / 2 - this.width / 2;
    this.y = this.game.ship.y - this.height;
    this.maxFrame = 1;
    this.speedY = 15;
  }

  update(deltaTime) {
    super.update(deltaTime);
  }

  draw(context) {
    if (this.game.debug) {
      context.fillStyle = 'white';
      context.fillRect(this.x, this.y, this.width, this.height);
    }
    super.draw(context);
  }
}