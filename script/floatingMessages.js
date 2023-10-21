export class FloatingMessage {
  constructor(value, x, y, targetX, targetY) {
    this.fontSize = 20;
    this.fontFamily = 'PressStart';
    this.value = value;
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.markedForDeletion = false;
    this.timer = 0;
  }

  update() {
    this.y--
    this.timer++;
    if (this.timer > 100) this.markedForDeletion = true;
  }

  draw(context) {
    context.font = this.fontSize * 0.6 + 'px ' + this.fontFamily;
    context.fillStyle = this.color;
    context.fillText(this.value, this.x, this.y);
  }

  get color() {
    return 'rgba('
      + (Math.random() * 5 + 256).toFixed() + ', '
      + (Math.random() * 5 + 256).toFixed() + ', '
      + (Math.random() * 5).toFixed() + ', '
      + Math.random().toFixed(1)
      + ')'
  }
}