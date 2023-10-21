import { EnemyBasicBolt } from './bolts.js';

class Enemy {
  constructor() {
    this.frameX = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;

    this.game = null;
    this.image = null;
    this.width = null;
    this.height = null;
    this.x = null;
    this.y = null;
    this.maxFrame = null;
    this.speedX = null;
    this.speedY = null;
    this.angle = null;
    this.curve = null;
    this.angleSpeed = null;
    this.shotCooldown = null;
    this.shootTimer = null;
    this.explosionSize = null;
    this.lives = null;
    this.score = null;
    this.trajectory = null;
  }

  update(deltaTime) {
    this.x -= this.speedX;
    this.y += this.speedY;

    switch (this.trajectory) {
      case 'sideToSide':
        this.fromSideToSideMovement(deltaTime);
        break;
      case 'spiral':
        this.spiralMovement(deltaTime);
        break;
    }

    /** Animation */
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }

    /** Boundaries */
    if (this.x + this.width < 0) {
      this.x = -this.width;
      this.angle = -this.angle;
      this.angleSpeed = -this.angleSpeed;
    }
    if (this.x > this.game.width) {
      this.x = this.game.width;
      this.angle = -this.angle;
      this.angleSpeed = -this.angleSpeed;
    }

    /** Shooting */
    this.shooting(deltaTime);

    if (this.y > this.game.height) this.markedForDeletion = true;
  }

  draw(context) {
    if (this.game.debug) {
      context.fillStyle = 'white';
      context.fillRect(this.x, this.y, this.width, this.height);
    }
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
  
  shooting(deltaTime) {
    if (this.shootTimer) {
      if (this.shootTimer > this.shotCooldown) {
        this.shootTimer = 0;
        this.game.enemyBolts.push(new EnemyBasicBolt(this.game, this));
      } else this.shootTimer += deltaTime;
    }
  }
  
  initTrajectory(trajectoryType, x) {
    switch (trajectoryType) {
      case 'straight': {
        this.x = Math.random() * this.game.width - this.width * 0.5;
        break;
      }

      case 'spiral': {
        this.x = x * this.game.width - this.width * 0.5;
        this.angle = 0.12;
        this.angleSpeed = 2;
        this.curve = 4;
        break;
      }

      case 'sideToSide': {
        this.x = x * this.game.width - this.width * 0.5;
        this.angle = 0.12;
        this.angleSpeed = 2;
        this.curve = 4;
        break;
      }
    }
  }

  fromSideToSideMovement() {
    this.angle += this.angleSpeed;
    this.x += this.curve * Math.sin(this.angle * Math.PI / 360);
    this.y += this.curve * Math.sin(this.angle * Math.PI );
  }

  spiralMovement() {
    this.angle += this.angleSpeed;
    this.x += 4 * Math.sin(this.angle * Math.PI / 180);
  }
}

export class EnemySmall extends Enemy {
  constructor(game, shotCooldown, trajectory, x,) {
    super();
    this.game = game;
    this.shotCooldown = shotCooldown;
    this.trajectory = trajectory;

    this.width = 64;
    this.height = 64;
    this.y = -this.height;
    this.speedX = 0;
    this.speedY = 5;
    this.maxFrame = 1;
    this.image = document.getElementById('enemySmall');
    this.shootTimer = this.shotCooldown ? Math.random() * this.shotCooldown : null;
    this.explosionSize = 2;
    this.lives = 1;
    this.score = 5;

    this.initTrajectory(trajectory, x);
  }

  update(deltaTime) {
    super.update(deltaTime);
  }

  draw(context) {
    if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
    super.draw(context);
  }
}

export class EnemyMedium extends Enemy {
  constructor(game, shotCooldown, trajectory, x,) {
    super();
    this.game = game;
    this.shotCooldown = shotCooldown;
    this.trajectory = trajectory;

    this.width = 128;
    this.height = 64;
    this.y = -this.height;
    this.speedX = 0;
    this.speedY = 1;
    this.maxFrame = 1;
    this.image = document.getElementById('enemyMedium');
    this.shootTimer = Math.random() * this.shotCooldown;
    this.explosionSize = 3;
    this.lives = 3;
    this.score = 20;

    this.initTrajectory(trajectory, x);
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

export class EnemyBig extends Enemy {
  constructor(game, shotCooldown, trajectory, x) {
    super();
    this.game = game;
    this.shotCooldown = shotCooldown;
    this.trajectory = trajectory;

    this.width = 104;
    this.height = 120;
    this.y = -this.height;
    this.speedX = 0;
    this.speedY = Math.random() * 0.2 + 0.2;
    this.maxFrame = 1;
    this.image = document.getElementById('enemyBig');
    this.shootTimer = Math.random() * this.shotCooldown;
    this.explosionSize = 4;
    this.lives = 20;
    this.score = 100;

    this.initTrajectory(trajectory, x);
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