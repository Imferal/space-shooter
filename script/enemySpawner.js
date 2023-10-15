import { EnemyBig, EnemyMedium, EnemySmall } from './enemy.js';
import { levels } from '../levels/levels.js';

export class EnemySpawner {
  constructor(game) {
    this.game = game;
    this.lastTime = 0;
    this.levels = levels;
  }

  spawnEnemy() {
    this.level = this.levels[this.game.level]
    this.lastTime = this.game.levelTimer;
    levels[this.game.level].forEach((enemyPack, index) => {
      if (this.lastTime > enemyPack.time && !enemyPack.spawned) {
        enemyPack.spawned = true;
        this.game.wave = index;
        const x = Math.random();

        for (let i = 1; i <= enemyPack.number; i++) {
          setTimeout(() => {
            this.game.enemies.push(this.createNewEnemy(enemyPack, x));
          }, i * enemyPack.enemyDelay)
        }
      }
      
      /** Check if level complete */
      if (
        this.level[this.level.length - 1].spawned
        && this.game.wave === this.level.length - 1
        && this.game.enemies.length === 0
        && this.levels[this.game.level + 1]
      ) {
          this.game.lives++;
          this.game.level++;
          this.game.wave = 0;
          this.game.levelTimer = 0;
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

  rollBackWaves() {
    const currentLevel = this.levels[this.game.level]
    const currentPackIndex = currentLevel
      .findIndex((enemyPack) => enemyPack.spawned === false)

    let newIndex = currentPackIndex >= this.game.rollBackWavesNumber
                     ? currentPackIndex - this.game.rollBackWavesNumber
                     : 0;
    
    this.game.levelTimer = currentLevel[newIndex].time - this.game.delayAfterDeath;
       
    for (let i = newIndex; i < newIndex + this.game.rollBackWavesNumber; i++ ) {
      currentLevel[i].spawned = false;
    }
  }
  
  resetLevels() {
    for (let i = 0; i < this.levels.length; i++) {
      this.levels[i].forEach(enemyPack => enemyPack.spawned = false);
    }
  }
}

