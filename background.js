export class Background {
  constructor(game) {
    this.game = game;
    this.width = 600;
    this.height = 2400;

    this.coffee_layer1 = document.getElementById('coffee_layer1');
    this.coffee_layer2 = document.getElementById('coffee_layer2');
    this.coffee_layer3 = document.getElementById('coffee_layer3');

    this.layer1 = new Layer(this.game, this.width, this.height, 0.1, this.coffee_layer1)
    this.layer2 = new Layer(this.game, this.width, this.height, 0.12, this.coffee_layer2)
    this.layer3 = new Layer(this.game, this.width, this.height, 0.2, this.coffee_layer3)

    this.backgroundLayers = [
      this.layer1,
      this.layer2,
      this.layer3,
    ];
  }

  update() {
    this.backgroundLayers.forEach(layer => {
      layer.update();
    })
  }

  draw(context) {
    this.backgroundLayers.forEach(layer => {
      layer.draw(context);
    })
  }
}

class Layer {
  constructor(
    game,
    width,
    height,
    speedModifier,
    image,
  ) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.y = this.game.height - this.height;
  }

  update() {
    if (this.y > this.height) this.y = 0;
    else this.y += this.game.speed * this.speedModifier;
  }

  draw(context) {
    context.drawImage(this.image, 0, this.y, this.width, this.height);
    context.drawImage(this.image, 0, this.y - this.height + 1, this.width, this.height);
  }
}