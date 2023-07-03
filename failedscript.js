const fireLaserBtn = document.querySelector(".fireLaser");
const fleeBtn = document.querySelector(".flee");

class EarthShip {
    constructor(name, hull = 20, firepower = 5, accuracy = 0.7) {
      this.name = name;
      this.hull = hull;
      this.firepower = firepower;
      this.accuracy = accuracy;
    };
  
    fireLaser(enemy) {
        // console.log(`Engaging ${enemy.name}!`);
        // fireLaserBtn.classList.toggle("hidden");
        // fleeBtn.classList.toggle("hidden");
        let chance = Math.random();
        if (chance < this.accuracy) {
            console.log(`The ${this.name} has hit ${enemy.name}'s  craft causing ${this.firepower} damage!`);
            enemy.hull -= this.firepower;
            console.log(`${enemy.name}'s hull is now ${enemy.hull}.`)
        } else {
            console.log(`You missed the alien ship! We need better weapons...`)
        };
        // enemy.fireLaser();
    };
  
    flee() {
      console.log(`The aliens have broken through Earth's defenses!`);
      console.log(`Game Over!`);
    };
};

// console.log("TEST: ", Math.round(Math.random()*3) + 3);
// console.log("TEST: ", Math.round(Math.random() * 2) + 2);
// console.log("TEST: ", Math.round(.4999999999999999));
// console.log("TEST: ", (Math.round(Math.random() * 2) + 6) / 10);
class AlienShip {
    constructor(name, enemy = USS_Assembly, hull = Math.round(Math.random() * 3) + 3, firepower = Math.round(Math.random() * 2) + 2, accuracy = (Math.round(Math.random()*2) + 6) / 10) {
        this.name = name;
        this.enemy = enemy;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    };

      fireLaser() {
        if (this.hull <= 0) {
            // console.log(`Congrats! You've defeated ${this.name}`);
            // enemyFighters.unshift();
            // console.log(`Your remaining hull strength is ${this.enemy.hull}`);
            // console.log("What's your next move?");
            // setTimeout(fireLaserBtn.classList.toggle, 2000, "hidden");
            // setTimeout(fleeBtn.classList.toggle, 2000, "hidden");
            return
        } else if (Math.random() < this.accuracy) {
            console.log(`You've been hit!`);
            this.enemy.hull -= this.firepower;
            console.log(`Your remaining hull strength is ${this.enemy.hull}`);
            this.enemy.fireLaser();
        } else {
            console.log(`Whew! ${this.name} missed you!`);
            console.log(`Your remaining hull strength is ${this.enemy.hull}`);
            this.enemy.fireLaser();
        };
    };
};
  

const USS_Assembly = new EarthShip("USS Assembly");

// const AlienShip1 = new AlienShip("AlienShip1");
// console.log("ALIENSHIP1's STATS: ", AlienShip1);

let enemyFighters = [];

for (i = 1; i <= 6; i++) {
    let alienShip = new AlienShip(`Alien Ship #${i}`);
    enemyFighters.push(alienShip);
};
// console.log("____ENEMY FIGHTERS LIST: ", enemyFighters);

currentCombatant = enemyFighters[0];
// console.log("____CURRENT COMBATANT: ", currentCombatant);

// console.log(`There's ${enemyFighters.length} enemies left!`);
// console.log(`The current combatant is ${currentCombatant.name}.`);
// console.log(`${currentCombatant.name}'s laser strength is ${currentCombatant.firepower}!`);
// console.log(`${currentCombatant.name}'s remaining hull strength is ${currentCombatant.hull}.`);

fireLaserBtn.addEventListener("click", ()=>engage());
fleeBtn.addEventListener("click", () => USS_Assembly.flee());

function engage() {
    console.log("____ENEMY FIGHTERS LIST: ", enemyFighters);
    console.log("____CURRENT COMBATANT: ", currentCombatant)
    console.log(`There's ${enemyFighters.length} enemies left!`);
    console.log(`The current combatant is ${currentCombatant.name}.`);
    console.log(`${currentCombatant.name}'s laser strength is ${currentCombatant.firepower}!`);
    console.log(`${currentCombatant.name}'s remaining hull strength is ${currentCombatant.hull}.`);
    console.log(`Engaging ${currentCombatant.name}!`);
    fireLaserBtn.classList.toggle("hidden");
    fleeBtn.classList.toggle("hidden");
    while (USS_Assembly.hull > 0 && currentCombatant.hull > 0) {
        USS_Assembly.fireLaser(currentCombatant);
        // if (USS_Assembly.hull <= 0) {
        //     console.log(`It was nice knowing you, captain. ${USS_Assembly.name} was destroyed.`);
        //     console.log("Game Over");
        //     return
        // } else 
        if (currentCombatant.hull <= 0) {
            console.log(`Congrats! You've defeated ${currentCombatant.name}`);
            enemyFighters = enemyFighters.splice(0,1);
            console.log(`Your remaining hull strength is ${USS_Assembly.hull}`);
            console.log("What's your next move?");
            setTimeout(()=>fireLaserBtn.className = "fireLaser", 2000);
            setTimeout(()=>fleeBtn.className = "flee", 2000);
        };
        currentCombatant.fireLaser();
        if (USS_Assembly.hull <= 0) {
            console.log(`It was nice knowing you, captain. ${USS_Assembly.name} was destroyed.`);
            console.log("Game Over");
            return
        }

    }
    // if (USS_Assembly.hull <= 0) {
    //     console.log(`It was nice knowing you, captain. ${USS_Assembly.name} was destroyed.`);
    //     console.log("Game Over");
    // } else if (currentCombatant.hull <= 0) {
    //     console.log(`Congrats! You've defeated ${currentCombatant.name}`);
    //     enemyFighters.unshift();
    //     console.log(`Your remaining hull strength is ${USS_Assembly.hull}`);
    //     console.log("What's your next move?");
    //     setTimeout(()=>fireLaserBtn.className = "fireLaser", 2000);
    //     setTimeout(()=>fleeBtn.className = "flee", 2000);
    // }
};