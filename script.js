const fireLaserBtn = document.querySelector(".fire-laser");
const retreatBtn = document.querySelector(".retreat");
const resetBtn = document.querySelector(".reset-game");
const startingStory = document.querySelector(".story");
const firstGameStartText = document.querySelector(".first-game");
let initialEnemyCount = 6;

class EarthShip {
    constructor(shipName, hull = 20, firepower = 5, accuracy = 0.7) {
      this.name = shipName;
      this.hull = hull;
      this.firepower = firepower;
      this.accuracy = accuracy;
    };

    fireLaser(enemy) {
        console.log(`${enemy.name}'s laser strength is ${enemy.firepower}!`);
        console.log(`${enemy.name}'s remaining hull strength is ${enemy.hull}.`);
        console.log(`Engaging ${enemy.name}!`);
        window.alert(`${enemy.name}'s laser strength is ${enemy.firepower}!\n${enemy.name}'s remaining hull strength is ${enemy.hull}.\nEngaging ${enemy.name}!`);
        let chance = Math.random();
        if (chance < this.accuracy) {
            console.log(`The ${this.name} has hit ${enemy.name}'s craft causing ${this.firepower} damage!`);
            window.alert(`The ${this.name} has hit ${enemy.name}'s craft causing ${this.firepower} damage!`);
            enemy.hull -= this.firepower;
            if (enemy.hull > 0) {
                console.log(`Captain, ${enemy.name}'s hull strength is now ${enemy.hull}.`);
                window.alert(`Captain, ${enemy.name}'s hull strength is now ${enemy.hull}.`);
                enemy.fireLaser();
            } else {
                console.log(`Congrats Captain! You've defeated ${enemy.name}.`);
                enemyFighters.shift();
                currentCombatant = enemyFighters[0];
                if (enemyFighters.length > 0) {
                    console.log(`Captain, there's ${enemyFighters.length} enemies left!`);
                    window.alert(`Congrats Captain! You've defeated ${enemy.name}.\nThere's ${enemyFighters.length} enemies left!`);
                };
                if (currentCombatant) {
                    console.log(`Captain, our remaining hull strength is ${this.hull}`);
                    console.log("What's the next move, Sir?");
                    console.log("--------------------------------------------");
                    window.alert(`Captain, our remaining hull strength is ${this.hull}\nWhat's the next move, Sir?`);
                    retreatBtn.className = "retreat button";
                } else {
                    if (this.hull >= 20) {
                        console.log(`The ${this.name} returns with a flawless victory!`);
                        console.log(`You're bound to get promoted after that display!`);
                        console.log('Earth is safe for another day. . .');
                        setTimeout(() => window.alert(`The ${this.name} returns  with a flawless victory!\nYou're bound to get promoted after that display!\nEarth is safe for another day. . .`), 50);
                    } else {
                        console.log(`The ${this.name} returns triumphant!`);
                        console.log('Earth is safe for another day. . .');
                        setTimeout(() => window.alert(`The ${this.name} returns triumphant!\nEarth is safe for another day. . .`), 50);
                    };
                    fireLaserBtn.classList.toggle("hidden");
                    retreatBtn.classList.toggle("hidden");
                    setTimeout(() => {resetBtn.classList.toggle("hidden")}, 2000);
                };
            };
        } else {
            console.log(`Captain, we missed the alien ship!\nWe need better weapons...`);
            window.alert(`Captain, we missed the alien ship!\nWe need better weapons...`);
            enemy.fireLaser();
        };
    };

    retreat() {
        fireLaserBtn.classList.toggle("hidden");
        retreatBtn.classList.toggle("hidden");
        console.log(`Game Over!`);
        setTimeout(() => window.alert("Game Over"), 50);
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
            console.log(`We've been hit!`);
            this.enemy.hull -= this.firepower;
            if (this.enemy.hull > 0) {
                console.log(`Captain, our remaining hull strength is ${this.enemy.hull}`);
                window.alert(`We've been hit!\nOur remaining hull strength is ${this.enemy.hull}`);
                this.enemy.fireLaser(currentCombatant);
            } else {
                fireLaserBtn.classList.toggle("hidden");
                retreatBtn.classList.toggle("hidden");
                console.log(`The ${this.enemy.name} has failed! Earth is doomed!`);
                console.log("Game Over");
                setTimeout(()=>window.alert(`The ${this.enemy.name} has failed! Earth is doomed!\nGame Over`), 50);
                setTimeout(() => resetBtn.className = "reset-game button", 2000);
            };
        } else {
            console.log(`Whew! ${this.name} missed us!`);
            console.log(`Captain, our remaining hull strength is still at ${this.enemy.hull}`);
            window.alert(`Whew! ${this.name} missed us!\nOur remaining hull strength is still at ${this.enemy.hull}`);
            this.enemy.fireLaser(currentCombatant);
        };
    };
};

const USS_Assembly = new EarthShip("USS Assembly");

const enemyFighters = [];

for (let i = 1; i <= initialEnemyCount; i++) {
    let alienShip = new AlienShip(`Alien Ship #${i}`);
    enemyFighters.push(alienShip);
};

let currentCombatant = enemyFighters[0];

fireLaserBtn.addEventListener("click", () => USS_Assembly.fireLaser(currentCombatant));
retreatBtn.addEventListener("click", () => USS_Assembly.retreat());
resetBtn.addEventListener("click", () => window.location = "index.html");

// PROMPT SECTION (ONLY REGARDS TO STARTING THE GAME)
let sillyResponse=0;
const startGame = () => {
    let startGamePrompt = window.prompt("Are you ready to begin?");
    startGamePrompt = startGamePrompt.toLowerCase();
    if (startGamePrompt === "y" || startGamePrompt === "yes") {
        setTimeout(()=>startingStory.classList.add("hidden"), 1000);
        setTimeout(()=>firstGameStartText.classList.toggle("hidden"), 1500);
        setTimeout(()=>firstGameStartText.classList.toggle("hidden"), 5500);
        setTimeout(() => fireLaserBtn.classList.toggle("hidden"), 6000);
    } else if (sillyResponse >= 3) {
        window.alert(`Do you think this is a game, Captain?!? (🤣🤣🤣)\nThe WHOLE WORLD is depending on you, right now!\nThere's no going back or "playing the fool"!\nNow let's go tan some alien hide!`);
        sillyResponse = 0;
        setTimeout(()=>startGame(), 6000);
    } else if (!startGamePrompt) {
        sillyResponse++;
        window.alert(`Don't ignore your responsiblities, Captain!\nType "y" or "yes" to start game.`);
        setTimeout(()=>startGame(), 6000);
    } else {
        if (startGamePrompt === "n" || startGamePrompt === "no") {
            sillyResponse++;
            window.alert("We know that this is an arduous mission but the world needs you, Captain and time is of the essence!\nWe'll give you a few more seconds to temper your nerves...");
            setTimeout(()=>startGame(), 6000);
        } else {
            sillyResponse++;
            window.alert('Type "y" or "yes" to start game.');
            setTimeout(()=>startGame(), 6000);
        };
    };
};
setTimeout(()=>startGame(), 6000);
