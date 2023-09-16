export class Explosion {
  constructor(game, x, y) {
    this.game = game;
    this.image = document.getElementById('explosion');
    this.spriteWidth = 64;
    this.sptiteHeight = 64;
    this.sizeModifier = Math.random() + 0.5;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.sptiteHeight * this.sizeModifier;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
    this.frameX = 0;
    this.maxFrame = 3;
    this.markedForDeletion = false;
    this.fps = Math.random() * 10 + 5;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
  }

  update(deltaTime) {
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      this.frameX++;
      if (this.frameX > this.maxFrame) this.markedForDeletion = true;
    } else this.frameTimer += deltaTime;
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.sptiteHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    )
  }
}