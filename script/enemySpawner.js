import { EnemyBig, EnemyMedium, EnemySmall } from './enemy.js';
import { levels } from '../levels/levels.js';

export class EnemySpawner {
  constructor(game) {
    this.game = game;
    this.lastTime = 0;
    this.levels = levels;
  }

  spawnEnemy() {
    this.level = this.levels[this.game.level - 1]
    this.lastTime = this.game.levelTimer;
    levels[this.game.level - 1].waves.forEach((enemyPack, index) => {
      if (this.lastTime > enemyPack.time && !enemyPack.startSpawn) {
        enemyPack.startSpawn = true;
        this.game.wave = index;
        const x = Math.random();

        for (let i = 1; i <= enemyPack.number; i++) {
          setTimeout(() => {
            this.game.enemies.push(this.createNewEnemy(enemyPack, x));
          }, i * enemyPack.enemyDelay)
        }
        
        setTimeout(() => {
          enemyPack.spawned = true;
        }, enemyPack.number * enemyPack.enemyDelay)
      }

      /** Check if level complete */
      if (
        this.level.waves[this.level.waves.length - 1].spawned
        && this.game.wave === this.level.waves.length - 1
        && this.game.enemies.length === 0
      ) {
        /** Check if game complete */
        if (this.levels[this.game.level]) {
          this.game.setNewLevel()
        } else {
          this.game.gameCompleted = true;          
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

  rollBackWaves() {
    const currentLevel = this.levels[this.game.level - 1]
    const currentPackIndex = currentLevel
      .waves
      .findIndex((enemyPack) => enemyPack.spawned === false)

    let newIndex = currentPackIndex >= this.game.rollBackWavesNumber
                     ? currentPackIndex - this.game.rollBackWavesNumber
                     : 0;
    
    this.game.levelTimer = currentLevel.waves[newIndex].time - this.game.delayAfterDeath;
       
    for (let i = newIndex; i < newIndex + this.game.rollBackWavesNumber; i++ ) {
      currentLevel.waves[i].spawned = false;
      currentLevel.waves[i].startSpawn = false;
    }
  }
  
  resetLevels() {
    for (let i = 0; i < this.levels.length; i++) {
      this.levels[i].waves.forEach(enemyPack => enemyPack.spawned = false);
      this.levels[i].waves.forEach(enemyPack => enemyPack.startSpawn = false);
    }
  }
}

