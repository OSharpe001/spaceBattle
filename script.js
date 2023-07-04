const fireLaserBtn = document.querySelector(".fire-laser");
const retreatBtn = document.querySelector(".retreat");
const resetBtn = document.querySelector(".reset-game");
const startingStory = document.querySelector(".story");
// let captainName;
// let captainName = startGame();
// let captainName = setTimeout(()=>startGame(), 8000);

class EarthShip {
    constructor(shipName, /*captain = captainName,*/ hull = 20, firepower = 5, accuracy = 0.7) {
      this.name = shipName;
    //   this.captain = captain;
      this.hull = hull;
      this.firepower = firepower;
      this.accuracy = accuracy;
    };

    fireLaser(enemy) {
        // console.log(`Captain ${this.captain}.There's ${enemyFighters.length} enemies left!`);
        console.log(`Captain, there's ${enemyFighters.length} enemies left!`);
        // console.log(`The current combatant is ${currentCombatant.name}.`);
        console.log(`${enemy.name}'s laser strength is ${enemy.firepower}!`);
        console.log(`${enemy.name}'s remaining hull strength is ${enemy.hull}.`);
        console.log(`Engaging ${enemy.name}!`);
        fireLaserBtn.classList.toggle("hidden");
        if (enemyFighters.length < 6) {
            retreatBtn.classList.toggle("hidden");
        };
        // retreatBtn.classList.toggle("hidden");
        let chance = Math.random();
        if (chance < this.accuracy) {
            console.log(`The ${this.name} has hit ${enemy.name}'s craft causing ${this.firepower} damage!`);
            enemy.hull -= this.firepower;
            if (enemy.hull > 0) {
                // console.log(`Captain ${this.captain}, ${enemy.name}'s hull strength is now ${enemy.hull}.`);
                console.log(`Captain, ${enemy.name}'s hull strength is now ${enemy.hull}.`);
                enemy.fireLaser();
            } else {
                // console.log(`Congrats Captain ${this.captain}! You've defeated ${enemy.name}`);
                console.log(`Congrats Captain! You've defeated ${enemy.name}`);
                enemyFighters.shift();
                currentCombatant = enemyFighters[0];
                if (currentCombatant) {
                    // console.log(`Captain ${this.captain}, our remaining hull strength is ${this.hull}`);
                    console.log(`Captain, our remaining hull strength is ${this.hull}`);
                console.log("What's the next move, Sir?");
                console.log("--------------------------------------------");
                setTimeout(() => {fireLaserBtn.className = "fire-laser button"; retreatBtn.className = "retreat button"}, 2000);
                } else {
                    // console.log(`Captain ${this.captain} of the ${this.name} returns triumphant!`);
                    console.log(`The ${this.name} returns triumphant!`);
                    console.log('Earth is safe for another day. . . ');
                    setTimeout(() => resetBtn.classList.toggle("hidden"), 2000);
                };
            };
        } else {
            // console.log(`Captain ${this.captin}, we missed the alien ship!\nWe need better weapons...`);
            console.log(`Captain, we missed the alien ship!\nWe need better weapons...`);
            enemy.fireLaser();
        };
    };

    retreat() {
        fireLaserBtn.classList.toggle("hidden");
        retreatBtn.classList.toggle("hidden");
        // console.log(`The aliens have broken through Earth's defenses!`);
        console.log(`Game Over!`);
        setTimeout(() => resetBtn.className = "reset-game button", 2000);
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
                // console.log(`Captain ${this.enemy.captain}, our remaining hull strength is ${this.enemy.hull}`);
                console.log(`Captain, our remaining hull strength is ${this.enemy.hull}`);
                this.enemy.fireLaser(currentCombatant);
            } else {
                // console.log(`Captain ${this.enemy.captain} of the ${this.enemy.name} has failed! Earth is doomed!`);
                console.log(`The ${this.enemy.name} has failed! Earth is doomed!`);
                console.log("Game Over");
                setTimeout(() => resetBtn.className = "reset-game button", 2000);
            };
        } else {
            console.log(`Whew! ${this.name} missed us!`);
            // console.log(`Captain ${this.enemy.captain}, our remaining hull strength is stll at ${this.enemy.hull}`);
            console.log(`Captain, our remaining hull strength is stll at ${this.enemy.hull}`);
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

fireLaserBtn.addEventListener("click", () => USS_Assembly.fireLaser(currentCombatant));
retreatBtn.addEventListener("click", () => USS_Assembly.retreat());
resetBtn.addEventListener("click", () => window.location = "index.html");

let sillyResponse=0;
const startGame = () => {
    // sillyResponse=0;
    startGamePrompt = window.prompt("Are you ready to begin?");
    if (sillyResponse >= 2) {
        window.alert(`Do you think this is a game, Captain?!? (🤣🤣🤣)\nThe WHOLE WORLD is depending on you, right now!\nThere's no going back or "playing the fool"!\nNow let's go tan some alien hide!`);
        sillyResponse = 0;
        setTimeout(()=>startGame(), 8000);
    } else if (!startGamePrompt) {
        sillyResponse++;
        window.alert(`Don't ignore your responsiblities, Captain!\nType "y" or "yes" to start game.`);
        setTimeout(()=>startGame(), 8000);
    } else {
        startGamePrompt = startGamePrompt.toLowerCase();
        if (startGamePrompt === "y" || startGamePrompt === "yes") {
            // captainName = getName();
            setTimeout(startingStory.classList.add("hidden"), 1000);
            setTimeout(() => fireLaserBtn.classList.toggle("hidden"), 2000);
            // console.log("getName(): ", captainName);
            // var captainName = captainName;
            // return captainName;
        } else if (startGamePrompt === "n" || startGamePrompt === "no") {
            sillyResponse++;
            window.alert("We know that this is an arduous mission but the world needs you, Captain and time is of the essence!\nWe'll give you a few more seconds to temper your nerves...");
            setTimeout(()=>startGame(), 8000);
        } else {
            sillyResponse++;
            window.alert('Type "y" or "yes" to start game.');
            setTimeout(()=>startGame(), 8000);
        };
    };
};
setTimeout(()=>startGame(), 8000);

// const getName = () => {
//     captainNamePrompt = window.prompt("What's your name, Captain?");
//     if (!captainNamePrompt) {
//         alert("We'll need to know what name to place on your medals,... (or tombstone)...");
//         getName();
//     } else {
//         console.log("captainNamePrompt: ", captainNamePrompt)
//         captainName = captainNamePrompt;
//         return captainNamePrompt;
//     };
// };

// console.log(`There's ${enemyFighters.length} enemies left!`);
// console.log(`The current combatant is ${currentCombatant.name}.`);
// console.log(`${currentCombatant.name}'s laser strength is ${currentCombatant.firepower}!`);
// console.log(`${currentCombatant.name}'s remaining hull strength is ${currentCombatant.hull}.`);
