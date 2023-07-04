const fireLaserBtn = document.querySelector(".fire-laser");
const fireLaser = document.getElementsByClassName("fire-laser");
const retreatBtn = document.querySelector(".retreat");
const resetBtn = document.querySelector(".reset-game");
console.log(fireLaserBtn);
console.log(fireLaser);


class EarthShip {
    constructor(name, hull = 20, firepower = 5, accuracy = 0.7) {
      this.name = name;
      this.hull = hull;
      this.firepower = firepower;
      this.accuracy = accuracy;
    };

    fireLaser(enemy) {
        console.log(`There's ${enemyFighters.length} enemies left!`);
        console.log(`The current combatant is ${currentCombatant.name}.`);
        console.log(`${currentCombatant.name}'s laser strength is ${currentCombatant.firepower}!`);
        console.log(`${currentCombatant.name}'s remaining hull strength is ${currentCombatant.hull}.`);
        console.log(`Engaging ${enemy.name}!`);
        fireLaserBtn.classList.toggle("hidden");
        // retreatBtn.classList.toggle("hidden");
        let chance = Math.random();
        if (chance < this.accuracy) {
            console.log(`The ${this.name} has hit ${enemy.name}'s  craft causing ${this.firepower} damage!`);
            enemy.hull -= this.firepower;
            if (enemy.hull > 0) {
                console.log(`${enemy.name}'s hull strength is now ${enemy.hull}.`);
                enemy.fireLaser();
            } else {
                console.log(`Congrats! You've defeated ${enemy.name}`);
                enemyFighters.shift();
                currentCombatant = enemyFighters[0];
                if (currentCombatant) {
                    console.log(`Your remaining hull strength is ${this.hull}`);
                console.log("What's your next move, Captain?");
                console.log("--------------------------------------------")
                setTimeout(() => {fireLaserBtn.className = "fire-laser button"; retreatBtn.className = "retreat button"}, 2000);
                } else {
                    console.log(`The ${this.name} returns triumphant!`);
                    console.log('Earth is safe for another day. . . ');
                    setTimeout(() => resetBtn.classList.toggle("hidden"), 2000);
                };
            };
        } else {
            console.log(`You missed the alien ship! We need better weapons...`)
            enemy.fireLaser();
        };
    };

    retreat() {
        fireLaserBtn.classList.toggle("hidden");
        retreatBtn.classList.toggle("hidden");
        // console.log(`The aliens have broken through Earth's defenses!`);
        // console.log(`Game Over!`);
        // setTimeout(() => resetBtn.className = "reset-game button", 2000);
    };
};

class AlienShip {
    constructor(name, enemy = USS_Assembly, hull = Math.round(Math.random() * 3) + 3, firepower = Math.round(Math.random() * 2) + 2, accuracy = (Math.round(Math.random()*2) + 6) / 10) {
        this.name = name;
        this.enemy = enemy;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    };

      fireLaser() {
        if (Math.random() < this.accuracy) {
            console.log(`You've been hit!`);
            this.enemy.hull -= this.firepower;
            if (this.enemy.hull > 0) {
                console.log(`Your remaining hull strength is ${this.enemy.hull}`);
                this.enemy.fireLaser(currentCombatant);
            } else {
                console.log(`The ${this.enemy.name} has failed! Earth is doomed!`);
                console.log("Game Over")
                setTimeout(() => resetBtn.className = "reset-game button", 2000);
            };
        } else {
            console.log(`Whew! ${this.name} missed you!`);
            console.log(`Your remaining hull strength is ${this.enemy.hull}`);
            this.enemy.fireLaser(currentCombatant);
        };
    };
};

const USS_Assembly = new EarthShip("USS Assembly");

const enemyFighters = [];

for (i = 1; i <= 6; i++) {
    let alienShip = new AlienShip(`Alien Ship #${i}`);
    enemyFighters.push(alienShip);
};

let currentCombatant = enemyFighters[0];

// console.log(`There's ${enemyFighters.length} enemies left!`);
// console.log(`The current combatant is ${currentCombatant.name}.`);
// console.log(`${currentCombatant.name}'s laser strength is ${currentCombatant.firepower}!`);
// console.log(`${currentCombatant.name}'s remaining hull strength is ${currentCombatant.hull}.`);

fireLaserBtn.addEventListener("click", () => USS_Assembly.fireLaser(currentCombatant));
retreatBtn.addEventListener("click", () => USS_Assembly.retreat());
resetBtn.addEventListener("click", () => window.location = "index.html")