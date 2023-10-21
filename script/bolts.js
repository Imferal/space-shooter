import { FloatingMessage } from './floatingMessages.js';
import {BoltTrack, ShipExplosion} from './particles.js';

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
    this.enemyBolt = null;
  }

  update(deltaTime) {
    this.checkCollisions()
    this.y -= this.speedY;
    
    /** Check if out of screen */
    if (this.y < 0 - this.height || this.y > this.game.height) {
      this.markedForDeletion = true;
    }

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
    /** Check if enemy killed */
    if (!this.enemyBolt) {
      this.game.enemies.forEach(enemy => {
        if (
          enemy.x < this.x + this.width &&
          enemy.x + enemy.width > this.x &&
          enemy.y < this.y + this.height &&
          enemy.y + enemy.height > this.y
        ) {
          this.markedForDeletion = true;
          enemy.lives--;

          this.game.particles.unshift(
            new ShipExplosion(
              this.game,
              this.x + this.width * 0.5,
              enemy.y + enemy.height,
              enemy.width / 2,
            ),
          );
          
          if (enemy.lives <= 0) {
            enemy.markedForDeletion = true;
            this.game.score += enemy.score;

            this.game.particles.unshift(
              new ShipExplosion(
                this.game,
                enemy.x + enemy.width * 0.5,
                enemy.y + enemy.height * 0.5,
                enemy.width * 2,
              ),
            );

            this.game.floatingMessages.push(
              new FloatingMessage(
                enemy.score,
                enemy.x,
                enemy.y,
                150,
                50,
              )
            )
          }
        }
    })
  } else {
      /** Check if ship killed */
      if (
        this.game.ship.x < this.x + this.width &&
        this.game.ship.x + this.game.ship.width > this.x &&
        this.game.ship.y < this.y + this.height &&
        this.game.ship.y + this.game.ship.height > this.y
      ) {
        this.game.ship.collisionHandler()
      }
    }
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
    this.game.particles.unshift(new BoltTrack(
      this.game,
      this.x + this.width * 0.5,
      this.y + this.height * 0.7,
    ))
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

export class EnemyBasicBolt extends Bolt {
  constructor(game, enemy) {
    super();
    this.game = game;
    this.enemy = enemy;
    this.image = document.getElementById('enemyBasicBolt');
    this.width = 12;
    this.height = 72;
    this.x = this.enemy.x + this.enemy.width / 2 - this.width / 2;
    this.y = this.enemy.y + this.height;
    this.maxFrame = 1;
    this.speedY = -15;
    this.enemyBolt = true;
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