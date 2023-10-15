/** Possible trajectory types: straight, spiral, sideToSide */
export const levels = [
  [
    { time: 1000, enemy: 'small', trajectory: 'straight', number: 2, enemyDelay: 1500, shotCooldown: 3000, spawned: false },
    { time: 5000, enemy: 'small', trajectory: 'spiral', number: 2, enemyDelay: 200, shotCooldown: 7000, spawned: false },
    { time: 6000, enemy: 'small', trajectory: 'spiral', number: 2, enemyDelay: 200, shotCooldown: 7000, spawned: false },
    { time: 10000, enemy: 'small', trajectory: 'straight', number: 10, enemyDelay: 20, shotCooldown: 3000, spawned: false },
    { time: 15000, enemy: 'small', trajectory: 'spiral', number: 20, enemyDelay: 100, shotCooldown: null, spawned: false },
    { time: 20000, enemy: 'big', trajectory: 'straight', number: 1, enemyDelay: 100, shotCooldown: 2000, spawned: false },
    { time: 25000, enemy: 'medium', trajectory: 'sideToSide', number: 5, enemyDelay: 200, shotCooldown: 2000, spawned: false },
    { time: 30000, enemy: 'small', trajectory: 'straight', number: 10, enemyDelay: 100, shotCooldown: 2000, spawned: false },
    { time: 35000, enemy: 'big', trajectory: 'straight', number: 2, enemyDelay: 0, shotCooldown: 3000, spawned: false },
    { time: 40000, enemy: 'small', trajectory: 'sideToSide', number: 2, enemyDelay: 500, shotCooldown: 3000, spawned: false },
  ],
  [
    { time: 5000, enemy: 'small', trajectory: 'spiral', number: 2, enemyDelay: 500, shotCooldown: 5000, spawned: false },
    { time: 6000, enemy: 'small', trajectory: 'spiral', number: 2, enemyDelay: 500, shotCooldown: 5000, spawned: false },
    { time: 12000, enemy: 'small', trajectory: 'straight', number: 10, enemyDelay: 20, shotCooldown: 3000, spawned: false },
    { time: 17000, enemy: 'small', trajectory: 'spiral', number: 10, enemyDelay: 150, shotCooldown: 5000, spawned: false },
    { time: 22000, enemy: 'big', trajectory: 'straight', number: 1, enemyDelay: 100, shotCooldown: 1000, spawned: false },
    { time: 25000, enemy: 'medium', trajectory: 'sideToSide', number: 15, enemyDelay: 200, shotCooldown: 3000, spawned: false },
    { time: 29000, enemy: 'small', trajectory: 'sideToSide', number: 20, enemyDelay: 100, shotCooldown: 2000, spawned: false },
    { time: 33000, enemy: 'big', trajectory: 'straight', number: 5, enemyDelay: 100, shotCooldown: 1500, spawned: false },
    { time: 36000, enemy: 'small', trajectory: 'straight', number: 2, enemyDelay: 500, shotCooldown: 2000, spawned: false },
    { time: 40000, enemy: 'small', trajectory: 'spiral', number: 2, enemyDelay: 200, shotCooldown: 5000, spawned: false },
  ],
  [
    { time: 5000, enemy: 'medium', trajectory: 'spiral', number: 12, enemyDelay: 200, shotCooldown: 5000, spawned: false },
    { time: 9000, enemy: 'small', trajectory: 'sideToSide', number: 10, enemyDelay: 20, shotCooldown: 3000, spawned: false },
    { time: 15000, enemy: 'small', trajectory: 'spiral', number: 20, enemyDelay: 100, shotCooldown: 2000, spawned: false },
    { time: 20000, enemy: 'big', trajectory: 'straight', number: 1, enemyDelay: 100, shotCooldown: 1000, spawned: false },
    { time: 25000, enemy: 'medium', trajectory: 'sideToSide', number: 5, enemyDelay: 200, shotCooldown: 2000, spawned: false },
    { time: 30000, enemy: 'small', trajectory: 'straight', number: 10, enemyDelay: 100, shotCooldown: 2000, spawned: false },
    { time: 34500, enemy: 'big', trajectory: 'straight', number: 5, enemyDelay: 0, shotCooldown: 4000, spawned: false },
    { time: 38000, enemy: 'small', trajectory: 'straight', number: 2, enemyDelay: 500, shotCooldown: 4000, spawned: false },
    { time: 42500, enemy: 'small', trajectory: 'straight', number: 2, enemyDelay: 500, shotCooldown: 4000, spawned: false },
    { time: 48000, enemy: 'medium', trajectory: 'spiral', number: 2, enemyDelay: 500, shotCooldown: 5000, spawned: false },
    { time: 50500, enemy: 'small', trajectory: 'spiral', number: 2, enemyDelay: 500, shotCooldown: 5000, spawned: false },
    { time: 52000, enemy: 'small', trajectory: 'spiral', number: 2, enemyDelay: 500, shotCooldown: 5000, spawned: false },
    { time: 55000, enemy: 'medium', trajectory: 'straight', number: 8, enemyDelay: 20, shotCooldown: 3000, spawned: false },
    { time: 59500, enemy: 'small', trajectory: 'spiral', number: 20, enemyDelay: 100, shotCooldown: 5000, spawned: false },
    { time: 63700, enemy: 'small', trajectory: 'spiral', number: 20, enemyDelay: 100, shotCooldown: 5000, spawned: false },
    { time: 68000, enemy: 'big', trajectory: 'straight', number: 1, enemyDelay: 100, shotCooldown: 3000, spawned: false },
    { time: 72500, enemy: 'medium', trajectory: 'sideToSide', number: 15, enemyDelay: 200, shotCooldown: 3000, spawned: false },
    { time: 76000, enemy: 'small', trajectory: 'sideToSide', number: 20, enemyDelay: 100, shotCooldown: 3000, spawned: false },
    { time: 80500, enemy: 'big', trajectory: 'straight', number: 5, enemyDelay: 100, shotCooldown: 1500, spawned: false },
  ],
]