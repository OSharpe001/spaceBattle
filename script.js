const fireLaserBtn = document.querySelector(".fire-laser");
const retreatBtn = document.querySelector(".retreat");
const resetBtn = document.querySelector(".reset-game");
const missionBriefing = document.querySelector(".mission-briefing");
const firstGameStartText = document.querySelector(".first-game");
// UNTIL FURTHER UPDATES, THEIR WILL BE SIX ALIEN SHIPS
let initialEnemyCount = 6;

// CLASS FOR CREATING AN EARTHSHIP OBJECT
class EarthShip {
    constructor(shipName, hull = 20, firepower = 5, accuracy = 0.7) {
      this.name = shipName;
      this.hull = hull;
      this.firepower = firepower;
      this.accuracy = accuracy;
    };

    fireLaser(enemy) {
        // AFTER PRESSING THE "Fire Laser" BUTTON...
        // CONSOLE LOGS AND ALERT TO DISPLAY CURRENT STATUS OF CURRENT ENEMY BEFORE "ENGAGMENT"
        console.log(`${enemy.name}'s laser strength is ${enemy.firepower}!`);
        console.log(`${enemy.name}'s remaining hull strength is ${enemy.hull}.`);
        console.log(`Engaging ${enemy.name}!`);
        window.alert(`${enemy.name}'s laser strength is ${enemy.firepower}!\n${enemy.name}'s remaining hull strength is ${enemy.hull}.\nEngaging ${enemy.name}!`);

        // "Math.random()" GETS A RANDOM DECIMAL NUMBER BETWEEN 0.0 AND 1.0
        if (Math.random() < this.accuracy) {
            // IF THE RANDOM NUMBER WAS LOWER THAN THE EARTHSIP'S ACCURACY, THE LASER HITS THE CURRENT ENEMY
            // CONSOLE LOG AND ALERT TO DISPLAY THE FACT THAT THE LASER HIT THE ENEMY AND HOW MUCH DAMAGE IT CAUSED
            console.log(`The ${this.name} has hit ${enemy.name}'s craft causing ${this.firepower} damage!`);
            window.alert(`The ${this.name} has hit ${enemy.name}'s craft causing ${this.firepower} damage!`);
            // AFTER LOGGING THE STATUS (THAT THE ALIEN SHIP WAS HIT), WE SUBTRACT THE USS_Assembly's FIREPOWER FROM THE CURRENT ALIEN'S HULL STRENGTH
            enemy.hull -= this.firepower;

            // IF THE ALIEN ENEMY WASN'T DESTROYED AFTER THE LASER STRIKE HIT THEM...
            if (enemy.hull > 0) {
                // CONSOLE LOG AND ALERT TO DISPLAY THE CURRENT ENEMY'S REMAINING HULL STRENGTH
                console.log(`Captain, ${enemy.name}'s hull strength is now ${enemy.hull}.`);
                window.alert(`Captain, ${enemy.name}'s hull strength is now ${enemy.hull}.`);
                // CALLIING THE CURRENT ENEMY'S "fireLaser" METHOD
                enemy.fireLaser();

            // IF THE ENEMY WAS DESTROYED AFTER THE LASER STRIKE HIT...
            } else {
                // CONSOLE LOG TO DISPLAY THAT THE CURRENT ALIEN SHIP WAS DEFEATED
                console.log(`Congrats Captain! You've defeated ${enemy.name}.`);
                // "enemyFighters.shift()" TAKES THE CURRENT ENEMY OUT OF THE "enemyFighters" ARRAY
                enemyFighters.shift();
                // "currentCombatant = enemyFighters[0]" CHANGES THE "CURRENT ENEMY" TO THE NEW FIRST ALIEN SHIP OBJECT IN THE "enemyFighters" ARRAY
                currentCombatant = enemyFighters[0];

                // IF THEIR ARE MORE ALIEN SHIP OBJECTS IN THE "enemyFighters" ARRAY...
                if (enemyFighters.length > 0) {
                    // CONSOLE LOG TO DISPLAY HOW MANY ALIEN SHIPS ARE LEFT IN THE "enemyFighters" ARRAY
                    console.log(`Captain, there's ${enemyFighters.length} enemies left!`);
                    // ALERT TO DISPLAY THAT THE CURRENT ALIEN SHIP WAS DEFEATED AND THE AMOUNT OF ALIEN SHIPS LEFT IN THE "enemyFighters" ARRAY
                    window.alert(`Congrats Captain! You've defeated ${enemy.name}.\nThere's ${enemyFighters.length} enemies left!`);
                };

                // IF THEIR ARE ONE OR MORE ALIEN SHIP OBJECTS IN THE "enemyFighters" ARRAY AFTER DEFEATING THE PRIOR ALIEN SHIP YOU ARE GIVEN A CHANCE TO FIGHT THE NEXT ENEMY OR RETREAT
                if (currentCombatant) {
                    // CONSOLE LOGS AND ALERT TO DISPLAY THE EARTH SHIP'S REMAINING HULL STRENGTH
                    console.log(`Captain, our remaining hull strength is ${this.hull}`);
                    console.log("What's the next move, Sir?");
                    console.log("--------------------------------------------");
                    window.alert(`Captain, our remaining hull strength is ${this.hull}\nWhat's the next move, Sir?`);
                    // THE RETREAT BUTTON IS MADE AVAILABLE ONLY AFTER DEFEATING THE FIRST ALIEN SHIP AND EVERY TIME, THEREAFTER, THAT ANAOTHER ALIEN SHIP IS DEFEATED (AS LONG AS THEIR ARE MORE ALIEN SHIPS TO FIGHT)
                    retreatBtn.className = "retreat button";

                // IF ALL ENEMY SHIPS ARE DEFEATED...
                } else {

                    // IF THE USS_Assembly STILL HAS OVER 20 "HULL" VALUE A SPECIAL MESSAGE APPEARS TO CONGRATULATE YOUR FLAWLESS VICTORY
                    if (this.hull >= 20) {
                        // CONSOLE LOGS AND ALERT FOR "FLAWLESS VICTORY" AND GAME "WIN" CONDITION
                        console.log(`The ${this.name} returns with a flawless victory!`);
                        console.log(`You're bound to get promoted after that display!`);
                        console.log('Earth is safe for another day. . .');
                        setTimeout(() => window.alert(`The ${this.name} returns  with a flawless victory!\nYou're bound to get promoted after that display!\nEarth is safe for another day. . .`), 50);
                    } else {
                        // CONSOLE.LOGS AND ALERTS TO DISPLAY THAT PLAYER HAS WON THE GAME (IF PLAYER TOOK DAMAGE)
                        console.log(`The ${this.name} returns triumphant!`);
                        console.log('Earth is safe for another day. . .');
                        setTimeout(() => window.alert(`The ${this.name} returns triumphant!\nEarth is safe for another day. . .`), 50);
                    };
                    // HIDING THE "Fire Laser" AND "Retreat" BUTTONS SINCE THE PLAYER HAS WON THE GAME (AT LEAST THE FIRST ROUND, FOR NOW...)
                    fireLaserBtn.classList.toggle("hidden");
                    retreatBtn.classList.toggle("hidden");
                    // TWO SECONDS AFTER ALERT IS EXITED, THE RESET BUTTON APPEARS
                    setTimeout(() => {resetBtn.classList.toggle("hidden")}, 2000);
                    // --THE PLAYER HAS THE OPTION TO RESET THE GAME AND PLAY AGAIN--
                };
            };

        // IF THE USS_Assembly's LASER MISSES THE CURRENT ENEMY...
        } else {
            // CONSOLE.LOG AND ALERT THE "LASER MISSED IT'S TARGET" STATUS
            console.log(`Captain, we missed the alien ship!\nWe need better weapons...`);
            window.alert(`Captain, we missed the alien ship!\nWe need better weapons...`);
            // CALLS THE CURRENT ENEMY'S "fireLaser" METHOD
            enemy.fireLaser();
        };
    };

    // THE RETREAT METHOD IS NOT EXACTLY A "LOSE" SITUATION BUT FOR NOW, IT IS A "GAME OVER" SITUATION
    retreat() {
        // HIDE THE "Fire Laser" AND THE "Retreat" BUTTONS
        fireLaserBtn.classList.toggle("hidden");
        retreatBtn.classList.toggle("hidden");
        // CONSOLE LOGS AND ALERTS "GAME OVER"
        console.log(`Game Over!`);
        setTimeout(() => window.alert("Game Over"), 50);
        // TWO SECONDS AFTER THE "GAME OVER" ALERT IS EXITED, THE "Reset Game" BUTTON APPEARS
        setTimeout(() => resetBtn.className = "reset-game button", 2000);
    };
};

class AlienShip {
    // ENEMY=> I HARDCODED THE "USS_Assembly" AS THE ENEMY FOR ALL ALIEN SHIPS.
    // HULL=> REGARDING THE "+3", THAT THREE WOULD BE THE LOWEST POSSIBLE VALUE. THE "Math.round(Math.random() * 3)" FUNCTION GIVES THE HULL THE VALUE OF 6 AS THE HIGHEST POSSIBLE HULL STRENGTH
    // FIREPOWER=> REGARDING THE "+2", THAT TWO WOULD BE THE LOWEST POSSIBLE VALUE. THE "Math.round(Math.random() * 2)" FUNCTION GIVES IT THE VALUE OF 4 AS THE HIGHEST POSSIBLE FIREPOWER
    // ACCURACY=> REGARDING THE "+6", THAT SIX WOULD BE THE LOWEST POSSIBLE VALUE. THE "Math.round(Math.random() * 6)" FUNCTION GIVES IT THE VALUE OF 8 AS THE HIGHEST POSSIBLE ACCURACY, WHICH IS THEN DIVIDED BY TEN (THE RANGE IS NOW BETWEEN 0.6 AND 0.8)
    constructor(name, enemy = USS_Assembly, hull = Math.round(Math.random() * 3) + 3, firepower = Math.round(Math.random() * 2) + 2, accuracy = (Math.round(Math.random() * 2) + 6) / 10) {
        this.name = name;
        this.enemy = enemy;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    };

    fireLaser() {
        // "Math.random()" GETS A RANDOM DECIMAL NUMBER BETWEEN 0.0 AND 1.0
        if (Math.random() < this.accuracy) {
            // IF THE RANDOM NUMBER WAS LOWER THAN THE CURRENT ALIEN FIGHTER'S ACCURACY, THE LASER HITS THE USS_Assembly
            console.log(`We've been hit!`);
            // AFTER LOGGING THE STATUS (THAT THE EARTH SHIP WAS HIT), WE SUBTRACT THE CURRENT ALIEN'S FIREPOWER FROM THE USS_Assembly's HULL STRENGTH
            this.enemy.hull -= this.firepower;
            // "THIS.ENEMY.HULL" KEEPS TRACK OF THE USS_Assembly's HULL STRENGTH FOR STATUS MESSAGES AND POSSIBLE "LOSE GAME" STATE
            if (this.enemy.hull > 0) {
                // IF USS_Assembly IS NOT DESTROYED WE FIRST DISPLAY THE STATUS CHANGES
                console.log(`Captain, our remaining hull strength is ${this.enemy.hull}`);
                window.alert(`We've been hit!\nOur remaining hull strength is ${this.enemy.hull}`);
                // "this.enemy.fireLaser(currentCombatant)" CALLS THE EARTHSHIP'S (USS_Assembly) METHOD TO FIRE THEIR LASER AT THE CURRENT ALIEN SHIP
                this.enemy.fireLaser(currentCombatant);
            } else {
                // IF THE USS_Assembly WAS DESTROYED AFTER THE LAST LASER STRIKE, THE "FIRE LASER" AND "RETREAT" BUTTONS ARE HIDDEN..
                fireLaserBtn.classList.toggle("hidden");
                retreatBtn.classList.toggle("hidden");
                // WE THEN CONSOLE.LOG  AND ALERT THE "LOSE GAME" STATE
                console.log(`The ${this.enemy.name} has failed! Earth is doomed!`);
                console.log("Game Over");
                setTimeout(()=>window.alert(`The ${this.enemy.name} has failed! Earth is doomed!\nGame Over`), 50);
                // AFTER A FEW SECONDS, THE OPTION TO RESET THE GAME APPEARS
                setTimeout(() => resetBtn.className = "reset-game button", 2000);
            };
        } else {
            // IF THE CURRENT ALIEN SPACE CRAFT LASER MISSED THE USS_Assembly WE FIRST CONSOLE.LOG AND ALERT THE STATUS
            console.log(`Whew! ${this.name} missed us!`);
            console.log(`Captain, our remaining hull strength is still at ${this.enemy.hull}`);
            window.alert(`Whew! ${this.name} missed us!\nOur remaining hull strength is still at ${this.enemy.hull}`);
            // "this.enemy.fireLaser(currentCombatant)" CALLS THE USS_Assembly's FIRE LASER METHOD TO FIRE UPON THE CURRENT ALIEN SHIP
            this.enemy.fireLaser(currentCombatant);
        };
    };
};

// CREATING THE USS_Assembly OBJECT AS AN "EARTHSHIP" WITH THE NAME OF "USS Assembly"
const USS_Assembly = new EarthShip("USS Assembly");

// SETTING UP THE ARRAY THAT WILL HOLD THE ALL OF THE "alienShip" OBJECTS
const enemyFighters = [];

// FOR LOOP TO CREATE (IN THIS CASE) 6 ALIEN SPACESHIP OBJECTS AND PLACING THEM IN THE "enemyFighters" ARRAY
for (let i = 1; i <= initialEnemyCount; i++) {
    // EACH NEW "alienShip" OBJECT HAS A SLIGHTLY DIFFERENT NAME, BASED ON THE CURRENT ITERATION OF THE LOOP
    let alienShip = new AlienShip(`Alien Ship #${i}`);
    enemyFighters.push(alienShip);
};

// MAKING THE CURRENT ALIEN FIGHTER THE FIRST OBJECT IN THE "enemyFighters" ARRAY
let currentCombatant = enemyFighters[0];

// SETTING UP THE ON-SCREEN BUTTONS TO CALL THE METHODS IN THE EARTHSHIP CLASS
fireLaserBtn.addEventListener("click", () => USS_Assembly.fireLaser(currentCombatant));
retreatBtn.addEventListener("click", () => USS_Assembly.retreat());
// SETTING UP THE ON-SCREEN  RESET BUTTON TO REFRESH THE PAGE
resetBtn.addEventListener("click", () => window.location = "index.html");

// --PROMPT SECTION (ONLY REGARDS TO STARTING THE GAME)--
// "sillyResponse" => KEEPING TRACK OF THE AMOUNT OF TIMES THE PLAYER DOESN'T RESPOND WITH A "YES" OR "Y"
let sillyResponse=0;

// "startGame" FUNCTION => A PROMPT SYSTEM SET TO ALLOW THE PLAYER TO START THE GAME OR ENCOUNTER MORE PROMPTS
const startGame = () => {
    //  PROMPT TO SEE IF PLAYER IS READY TO START
    let startGamePrompt = window.prompt("Are you ready to begin?");
    // SETTING THE PROMPT ANSWER TO ALL LOWERCASE LETTERS
    startGamePrompt = startGamePrompt.toLowerCase();
    // IF PLAYER ANSWERS WITH A "y" OR "yes" (REGARDLESS OF CAPITALIZATION), THE GAME BEGINS
    if (startGamePrompt === "y" || startGamePrompt === "yes") {
        // AFTER THE PLAYER COMMITS TO PLAY => AFTER A SECOND, THE MISSION BRIEFING DISAPEARS
        setTimeout(()=>missionBriefing.classList.add("hidden"), 1000);
        // AFTER THE PLAYER COMMITS TO PLAY => AFTER A SECOND AND A HALF, THE STARTING TEXT APPEARS
        setTimeout(()=>firstGameStartText.classList.toggle("hidden"), 1500);
        // AFTER THE PLAYER COMMITS TO PLAY => AFTER FIVE AND AHALF SECONDS, THE STARTING TEXT DISAPPEARS
        setTimeout(()=>firstGameStartText.classList.toggle("hidden"), 5500);
        // AFTER THE PLAYER COMMITS TO PLAY =>  AFTER SIX SECONDS, THE "Fire Laser" BUTTON APPEARS
        setTimeout(() => fireLaserBtn.classList.toggle("hidden"), 6000);

    // IF THE PLAYER PREVIOUSLY REFUSED TO ANSWER "Y" OR "YES" THREE TIMES IN A ROW...
    } else if (sillyResponse >= 2) {
        // THE GAME "YELLS" AT THE PLAYER FOR WAISTING TIME
        window.alert(`Do you think this is a game, Captain?!? (🤣🤣🤣)\nThe WHOLE WORLD is depending on you, right now!\nThere's no going back or "playing the fool"!\nNow let's go tan some alien hide!`);
        // "sillyResponse = 0" RESETS THE COUNTER FOR THE AMOUNT OF TIMES THE PLAYER REFUSED TO ANSWER "Y" OR "YES"
        sillyResponse = 0;
        // SIX SECONDS AFTER THE PLAYER EXITS THE "YELLING" ALERT, THE "Start Game" PROMPT APPEARS AGAIN
        setTimeout(()=>startGame(), 6000);

    // IF THE PLAYER DOESNT ENTER ANY TEXT INTO THE PROMPT...
    } else if (!startGamePrompt) {
        // "sillyResponse++" ADDS 1 TO THE COUNTER OF HOW MANY TIMES THE PLAYER REFUSED TO ANSWER "Y" OR "YES"
        sillyResponse++;
        // ALERT TO PERSUADE THE PLAYER TO ANSWER "Y" OR "YES" TO THE NEXT PROMPT
        window.alert(`Don't ignore your responsiblities, Captain!\nType "y" or "yes" to start game.`);
        // SIX SECONDS AFTER THE PLAYER EXITS THE "PERSUASION" ALERT, THE "Start Game" PROMPT APPEARS AGAIN
        setTimeout(()=>startGame(), 6000);
    } else {
        // IF THE PLAYER ANSWERS "N" OR "NO"...
        if (startGamePrompt === "n" || startGamePrompt === "no") {
            // "sillyResponse++" ADDS 1 TO THE COUNTER OF HOW MANY TIMES THE PLAYER REFUSED TO ANSWER "Y" OR "YES"
            sillyResponse++;
            // ALERT TO PERSUADE THE PLAYER TO ANSWER "Y" OR "YES" TO THE NEXT PROMPT
            window.alert("We know that this is an arduous mission but the world needs you, Captain and time is of the essence!\nWe'll give you a few more seconds to temper your nerves...");
            // SIX SECONDS AFTER THE PLAYER EXITS THE "PERSUASION" ALERT, THE "Start Game" PROMPT APPEARS AGAIN
            setTimeout(()=>startGame(), 6000);

        // IF THE PLAYER ENTERS TEXT INTO THE PROMPT WHICH DOESN'T EQUATE TO "Y", "YES", "N" OR "NO"
        } else {
            // "sillyResponse++" ADDS 1 TO THE COUNTER OF HOW MANY TIMES THE PLAYER REFUSED TO ANSWER "Y" OR "YES"
            sillyResponse++;
            // ALERT TO PERSUADE THE PLAYER TO ANSWER "Y" OR "YES" TO THE NEXT PROMPT
            window.alert('Type "y" or "yes" to start game.');
            // SIX SECONDS AFTER THE PLAYER EXITS THE "PERSUASION" ALERT, THE "Start Game" PROMPT APPEARS AGAIN
            setTimeout(()=>startGame(), 6000);
        };
    };
};
// AUTOMATICALLY CALLS FOR THE "startGame" PROMPT TO APPEAR AFTER GIVING THE PLAYER SIX SECONDS TO READ THE MISSION BRIEFING
setTimeout(()=>startGame(), 6000);
