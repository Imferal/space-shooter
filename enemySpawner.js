import { EnemyBig, EnemyMedium, EnemySmall } from './enemy.js';

export class EnemySpawner {
  constructor(game) {
    this.game = game;
    this.lastTime = 0;
  }

  spawnEnemy() {
    this.lastTime = this.game.gameTimer;
    levels[this.game.level].forEach((enemyPack) => {
      if (this.lastTime > enemyPack.time && enemyPack.spawned === false) {
        enemyPack.spawned = true;        
        for (let i = 1; i <= enemyPack.number; i++) {
          setTimeout(() => {
            this.game.enemies.push(this.createNewEnemy(enemyPack));
          }, i * enemyPack.enemyDelay)
        }
      }
    })    
  }
  
  createNewEnemy(enemyPack) {
    const x = Math.random();
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

const levels = [
  [
    { time: 1000, enemy: 'small', trajectory: 'straight', number: 2, enemyDelay: 200, shotCooldown: 2000, spawned: false },
    { time: 5000, enemy: 'small', trajectory: 'straight', number: 4, enemyDelay: 200, shotCooldown: 2000, spawned: false },
    { time: 9000, enemy: 'small', trajectory: 'straight', number: 10, enemyDelay: 100, shotCooldown: 2000, spawned: false },
    { time: 17000, enemy: 'medium', trajectory: 'straight', number: 5, enemyDelay: 200, shotCooldown: 2000, spawned: false },
    { time: 24000, enemy: 'small', trajectory: 'straight', number: 10, enemyDelay: 100, shotCooldown: 2000, spawned: false },
    { time: 24000, enemy: 'big', trajectory: 'straight', number: 10, enemyDelay: 100, shotCooldown: 2000, spawned: false },
  ]
]