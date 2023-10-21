class Particle {
  constructor(game) {
    this.game = game;
    this.markedForDeletion = false;
    this.speedY = null;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size *= 0.95;
    if (this.size < 0.5) this.markedForDeletion = true;
  }
  
  get color() {
    return 'rgba('
      + (Math.random() * 150 + 116).toFixed() + ', '
      + (Math.random() * 150 + 116).toFixed() + ', '
      + (Math.random() * 150 + 116).toFixed() + ', '
      + Math.random().toFixed(1)
      + ')'
  }
}

export class BoltTrack extends Particle {
  constructor(game, x, y) {
    super(game)
    this.size = Math.random() * 5 + 5;
    this.x = x;
    this.y = y;
    this.speedX = Math.random();
    this.speedY = Math.random();
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }
}

export class ShipExplosion extends Particle {
  constructor(game, x, y, size) {
    super(game);
    this.particleCount = 30;
    this.particles = [];
    this.size = size / 8

    for (let i = 0; i < this.particleCount; i++) {
      const particle = new Particle(this.game);
      particle.x = x;
      particle.y = y;
      particle.speedX = (Math.random() - 0.5) * 5;
      particle.speedY = (Math.random() - 0.5) * 5;
      particle.size = Math.random() * this.size + this.size;
      this.particles.push(particle);
    }
  }

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      particle.update();
      if (particle.markedForDeletion) {
        this.particles.splice(i, 1);
      }
    }

    if (this.particles.length === 0) {
      this.markedForDeletion = true;
    }
  }

  draw(context) {
    this.particles.forEach(particle => {
      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fillStyle = particle.color;
      context.fill();
    });
  }
}