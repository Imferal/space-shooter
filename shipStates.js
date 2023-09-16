export const states = {
  STOP: 0,
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
  UP_RIGHT: 5,
  RIGHT_DOWN: 6,
  DOWN_LEFT: 7,
  LEFT_UP: 8,
}

export class Stop {
  constructor(game) {
    this.game = game;
  }

  enter() {
    this.game.ship.frameX = 0;
    this.game.ship.frameY = 1;
    this.game.ship.maxFrame = 1;
  }

  handleInput(input) {
    if (input.KeyW && input.KeyD) this.game.ship.setState(states.UP_RIGHT)
    else if (input.KeyD && input.KeyS) this.game.ship.setState(states.RIGHT_DOWN)
    else if (input.KeyS && input.KeyA) this.game.ship.setState(states.DOWN_LEFT)
    else if (input.KeyA && input.KeyW) this.game.ship.setState(states.LEFT_UP)
    else if (input.KeyW && !input.KeyA && !input.KeyD) this.game.ship.setState(states.UP)
    else if (input.KeyS && !input.KeyA && !input.KeyD) this.game.ship.setState(states.DOWN)
    else if (input.KeyA && !input.KeyS && !input.KeyW) this.game.ship.setState(states.LEFT)
    else if (input.KeyD && !input.KeyS && !input.KeyW) this.game.ship.setState(states.RIGHT)
  }
}

export class Up {
  constructor(game) {
    this.game = game;
  }

  enter() {
      this.game.ship.frameX = 0;
      this.game.ship.frameY = 0;
      this.game.ship.maxFrame = 1;
  }

  handleInput(input) {
    if (input.KeyW && input.KeyD) this.game.ship.setState(states.UP_RIGHT)
    else if (input.KeyD && input.KeyS) this.game.ship.setState(states.RIGHT_DOWN)
    else if (input.KeyS && input.KeyA) this.game.ship.setState(states.DOWN_LEFT)
    else if (input.KeyA && input.KeyW) this.game.ship.setState(states.LEFT_UP)
    else if (input.KeyS && !input.KeyA && !input.KeyD) this.game.ship.setState(states.DOWN)
    else if (input.KeyA && !input.KeyS && !input.KeyW) this.game.ship.setState(states.LEFT)
    else if (input.KeyD && !input.KeyS && !input.KeyW) this.game.ship.setState(states.RIGHT)
  }
}

export class Down {
  constructor(game) {
    this.game = game;
  }

  enter() {
    this.game.ship.frameX = 0;
    this.game.ship.frameY = 1;
    this.game.ship.maxFrame = 1;
  }

  handleInput(input) {
    if (input.KeyW && input.KeyD) this.game.ship.setState(states.UP_RIGHT)
    else if (input.KeyD && input.KeyS) this.game.ship.setState(states.RIGHT_DOWN)
    else if (input.KeyS && input.KeyA) this.game.ship.setState(states.DOWN_LEFT)
    else if (input.KeyA && input.KeyW) this.game.ship.setState(states.LEFT_UP)
    else if (input.KeyW && !input.KeyA && !input.KeyD) this.game.ship.setState(states.UP)
    else if (input.KeyA && !input.KeyS && !input.KeyW) this.game.ship.setState(states.LEFT)
    else if (input.KeyD && !input.KeyS && !input.KeyW) this.game.ship.setState(states.RIGHT)
  }
}

export class Left {
  constructor(game) {
    this.game = game;
  }

  enter() {
    this.game.ship.frameX = 0;
    this.game.ship.frameY = 2;
    this.game.ship.maxFrame = 3;
  }

  handleInput(input) {
    if (input.KeyW && input.KeyD) this.game.ship.setState(states.UP_RIGHT)
    else if (input.KeyD && input.KeyS) this.game.ship.setState(states.RIGHT_DOWN)
    else if (input.KeyS && input.KeyA) this.game.ship.setState(states.DOWN_LEFT)
    else if (input.KeyA && input.KeyW) this.game.ship.setState(states.LEFT_UP)
    else if (input.KeyW && !input.KeyA && !input.KeyD) this.game.ship.setState(states.UP)
    else if (input.KeyS && !input.KeyA && !input.KeyD) this.game.ship.setState(states.DOWN)
    else if (input.KeyD && !input.KeyS && !input.KeyW) this.game.ship.setState(states.RIGHT)
  }
}

export class Right {
  constructor(game) {
    this.game = game;
  }

  enter() {
    this.game.ship.frameX = 0;
    this.game.ship.frameY = 3;
    this.game.ship.maxFrame = 3;
  }

  handleInput(input) {
    if (input.KeyW && input.KeyD) this.game.ship.setState(states.UP_RIGHT)
    else if (input.KeyD && input.KeyS) this.game.ship.setState(states.RIGHT_DOWN)
    else if (input.KeyS && input.KeyA) this.game.ship.setState(states.DOWN_LEFT)
    else if (input.KeyA && input.KeyW) this.game.ship.setState(states.LEFT_UP)
    else if (input.KeyW && !input.KeyA && !input.KeyD) this.game.ship.setState(states.UP)
    else if (input.KeyS && !input.KeyA && !input.KeyD) this.game.ship.setState(states.DOWN)
    else if (input.KeyA && !input.KeyS && !input.KeyW) this.game.ship.setState(states.LEFT)
  }
}

export class UpRight {
  constructor(game) {
    this.game = game;
  }

  enter() {
    this.game.ship.frameX = 0;
    this.game.ship.frameY = 3;
    this.game.ship.maxFrame = 3;
  }

  handleInput(input) {
    if (input.KeyD && input.KeyS) this.game.ship.setState(states.RIGHT_DOWN)
    else if (input.KeyS && input.KeyA) this.game.ship.setState(states.DOWN_LEFT)
    else if (input.KeyA && input.KeyW) this.game.ship.setState(states.LEFT_UP)
    else if (input.KeyW && !input.KeyA && !input.KeyD) this.game.ship.setState(states.UP)
    else if (input.KeyS && !input.KeyA && !input.KeyD) this.game.ship.setState(states.DOWN)
    else if (input.KeyA && !input.KeyS && !input.KeyW) this.game.ship.setState(states.LEFT)
    else if (input.KeyD && !input.KeyS && !input.KeyW) this.game.ship.setState(states.RIGHT)
  }
}

export class RightDown {
  constructor(game) {
    this.game = game;
  }

  enter() {
    this.game.ship.frameX = 0;
    this.game.ship.frameY = 3;
    this.game.ship.maxFrame = 3;
  }

  handleInput(input) {
    if (input.KeyW && input.KeyD) this.game.ship.setState(states.UP_RIGHT)
    else if (input.KeyS && input.KeyA) this.game.ship.setState(states.DOWN_LEFT)
    else if (input.KeyA && input.KeyW) this.game.ship.setState(states.LEFT_UP)
    else if (input.KeyW && !input.KeyA && !input.KeyD) this.game.ship.setState(states.UP)
    else if (input.KeyS && !input.KeyA && !input.KeyD) this.game.ship.setState(states.DOWN)
    else if (input.KeyA && !input.KeyS && !input.KeyW) this.game.ship.setState(states.LEFT)
    else if (input.KeyD && !input.KeyS && !input.KeyW) this.game.ship.setState(states.RIGHT)
  }
}

export class DownLeft {
  constructor(game) {
    this.game = game;
  }

  enter() {
    this.game.ship.frameX = 0;
    this.game.ship.frameY = 2;
    this.game.ship.maxFrame = 3;
  }

  handleInput(input) {
    if (input.KeyW && input.KeyD) this.game.ship.setState(states.UP_RIGHT)
    else if (input.KeyD && input.KeyS) this.game.ship.setState(states.RIGHT_DOWN)
    else if (input.KeyA && input.KeyW) this.game.ship.setState(states.LEFT_UP)
    else if (input.KeyW && !input.KeyA && !input.KeyD) this.game.ship.setState(states.UP)
    else if (input.KeyS && !input.KeyA && !input.KeyD) this.game.ship.setState(states.DOWN)
    else if (input.KeyA && !input.KeyS && !input.KeyW) this.game.ship.setState(states.LEFT)
    else if (input.KeyD && !input.KeyS && !input.KeyW) this.game.ship.setState(states.RIGHT)
  }
}

export class LeftUp {
  constructor(game) {
    this.game = game;
  }

  enter() {
    this.game.ship.frameX = 0;
    this.game.ship.frameY = 2;
    this.game.ship.maxFrame = 3;
  }

  handleInput(input) {
    if (input.KeyW && input.KeyD) this.game.ship.setState(states.UP_RIGHT)
    else if (input.KeyD && input.KeyS) this.game.ship.setState(states.RIGHT_DOWN)
    else if (input.KeyS && input.KeyA) this.game.ship.setState(states.DOWN_LEFT)
    else if (input.KeyW && !input.KeyA && !input.KeyD) this.game.ship.setState(states.UP)
    else if (input.KeyS && !input.KeyA && !input.KeyD) this.game.ship.setState(states.DOWN)
    else if (input.KeyA && !input.KeyS && !input.KeyW) this.game.ship.setState(states.LEFT)
    else if (input.KeyD && !input.KeyS && !input.KeyW) this.game.ship.setState(states.RIGHT)
  }
}