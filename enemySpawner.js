import { EnemyBig, EnemyMedium, EnemySmall } from './enemy.js';

export class EnemySpawner {
  constructor(game) {
    this.game = game;
    this.lastTime = 0;
  }

  spawnEnemy() {
    this.lastTime = this.game.gameTimer;
    levels[this.game.level].forEach((enemyPack, index) => {
      if (this.lastTime > enemyPack.time && !enemyPack.spawned) {
        enemyPack.spawned = true;
        this.game.wave = index + 1;
        const x = Math.random();

        for (let i = 1; i <= enemyPack.number; i++) {
          setTimeout(() => {
            this.game.enemies.push(this.createNewEnemy(enemyPack, x));
          }, i * enemyPack.enemyDelay)
        }
      }
    })    
  }
  
  createNewEnemy(enemyPack, x) {
    switch (enemyPack.enemy) {
      case 'small': return new EnemySmall(
        this.game,
        enemyPack.shotCooldown,
        enemyPack.trajectory,
        x,
      );
      
      case 'medium': return new EnemyMedium(
        this.game,
        enemyPack.shotCooldown,
        enemyPack.trajectory,
        x,
      );
      
      case 'big': return new EnemyBig(
        this.game,
        enemyPack.shotCooldown,
        enemyPack.trajectory,
        x,
      );
      
    }
  }
}

/** Possible trajectory types: straight, spiral, sideToSide */  
const levels = [
  [
    { time: 1000, enemy: 'small', trajectory: 'straight', number: 2, enemyDelay: 1500, shotCooldown: 3000 },
    { time: 5000, enemy: 'small', trajectory: 'spiral', number: 2, enemyDelay: 200, shotCooldown: 7000 },
    { time: 6000, enemy: 'small', trajectory: 'spiral', number: 2, enemyDelay: 200, shotCooldown: 7000 },
    { time: 10000, enemy: 'small', trajectory: 'straight', number: 10, enemyDelay: 20, shotCooldown: 3000 },
    { time: 15000, enemy: 'small', trajectory: 'spiral', number: 20, enemyDelay: 100, shotCooldown: 3000 },
    { time: 20000, enemy: 'big', trajectory: 'straight', number: 1, enemyDelay: 100, shotCooldown: 2000 },
    { time: 25000, enemy: 'medium', trajectory: 'sideToSide', number: 5, enemyDelay: 200, shotCooldown: 2000 },
    { time: 30000, enemy: 'small', trajectory: 'straight', number: 10, enemyDelay: 100, shotCooldown: 2000 },
    { time: 35000, enemy: 'big', trajectory: 'straight', number: 2, enemyDelay: 0, shotCooldown: 3000 },
    { time: 40000, enemy: 'small', trajectory: 'sideToSide', number: 2, enemyDelay: 500, shotCooldown: 3000 },
    { time: 45000, enemy: 'small', trajectory: 'spiral', number: 2, enemyDelay: 500, shotCooldown: 5000 },
    { time: 47000, enemy: 'small', trajectory: 'spiral', number: 2, enemyDelay: 500, shotCooldown: 5000 },
    { time: 50000, enemy: 'small', trajectory: 'straight', number: 10, enemyDelay: 20, shotCooldown: 3000 },
    { time: 55000, enemy: 'small', trajectory: 'spiral', number: 20, enemyDelay: 100, shotCooldown: 2000 },
    { time: 60000, enemy: 'big', trajectory: 'straight', number: 1, enemyDelay: 100, shotCooldown: 1000 },
    { time: 65000, enemy: 'medium', trajectory: 'sideToSide', number: 15, enemyDelay: 200, shotCooldown: 3000 },
    { time: 70000, enemy: 'small', trajectory: 'sideToSide', number: 20, enemyDelay: 100, shotCooldown: 2000 },
    { time: 75000, enemy: 'big', trajectory: 'straight', number: 5, enemyDelay: 100, shotCooldown: 1500 },
    { time: 80000, enemy: 'small', trajectory: 'straight', number: 2, enemyDelay: 500, shotCooldown: 2000 },
    { time: 82000, enemy: 'small', trajectory: 'spiral', number: 2, enemyDelay: 200, shotCooldown: 5000 },
    { time: 86000, enemy: 'medium', trajectory: 'spiral', number: 12, enemyDelay: 200, shotCooldown: 5000 },
    { time: 90000, enemy: 'small', trajectory: 'sideToSide', number: 10, enemyDelay: 20, shotCooldown: 3000 },
    { time: 95000, enemy: 'small', trajectory: 'spiral', number: 20, enemyDelay: 100, shotCooldown: 2000 },
    { time: 100000, enemy: 'big', trajectory: 'straight', number: 1, enemyDelay: 100, shotCooldown: 1000 },
    { time: 105000, enemy: 'medium', trajectory: 'sideToSide', number: 5, enemyDelay: 200, shotCooldown: 2000 },
    { time: 110000, enemy: 'small', trajectory: 'straight', number: 10, enemyDelay: 100, shotCooldown: 2000 },
    { time: 115000, enemy: 'big', trajectory: 'straight', number: 5, enemyDelay: 0, shotCooldown: 4000 },
    { time: 120000, enemy: 'small', trajectory: 'straight', number: 2, enemyDelay: 500, shotCooldown: 4000 },
    { time: 125000, enemy: 'small', trajectory: 'straight', number: 2, enemyDelay: 500, shotCooldown: 4000 },
    { time: 130000, enemy: 'medium', trajectory: 'spiral', number: 2, enemyDelay: 500, shotCooldown: 5000 },
    { time: 135000, enemy: 'small', trajectory: 'spiral', number: 2, enemyDelay: 500, shotCooldown: 5000 },
    { time: 140000, enemy: 'small', trajectory: 'spiral', number: 2, enemyDelay: 500, shotCooldown: 5000 },
    { time: 150000, enemy: 'medium', trajectory: 'straight', number: 8, enemyDelay: 20, shotCooldown: 3000 },
    { time: 155000, enemy: 'small', trajectory: 'spiral', number: 20, enemyDelay: 100, shotCooldown: 5000 },
    { time: 157000, enemy: 'small', trajectory: 'spiral', number: 20, enemyDelay: 100, shotCooldown: 5000 },
    { time: 160000, enemy: 'big', trajectory: 'straight', number: 1, enemyDelay: 100, shotCooldown: 3000 },
    { time: 165000, enemy: 'medium', trajectory: 'sideToSide', number: 15, enemyDelay: 200, shotCooldown: 3000 },
    { time: 170000, enemy: 'small', trajectory: 'sideToSide', number: 20, enemyDelay: 100, shotCooldown: 3000 },
    { time: 175000, enemy: 'big', trajectory: 'straight', number: 5, enemyDelay: 100, shotCooldown: 1500 },
  ],
]