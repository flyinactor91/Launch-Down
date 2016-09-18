var gameClock;
var gameEntropy;
var levelVisibility;
var levelDamage;
var gameDifficulty;
var tick;

//Scoring functions

function isScrubbed(power) {
    var visCutoff = (power.visibility*10 + levelVisibility*5) * gameDifficulty;
    console.log('(', power.visibility, '* 10 +', levelVisibility, '* 5 ) *', gameDifficulty, '=', visCutoff);
    var rand = Math.random();
    console.log(rand, visCutoff/100, rand < visCutoff/100);
    if (rand < visCutoff/100) {
        console.log('Scrubbed')
        return true;
    } else {
        console.log('Unnoticed');
        levelVisibility += power.visibility;
        levelDamage += power.damage;
        return false;
    }
}

//Time-based handler functions

function updateTime() {
    var minute = Math.floor(gameClock / 60);
    var second = gameClock % 60;

    if(minute<0){minute = "00"}
    else if(minute<10){minute = "0" + minute}

    if(second<0){second = "00"}
    else if(second<10){second = "0" + second}

    console.log(minute + ':' + second);
    document.getElementById('clock-minute').innerHTML = minute;
    document.getElementById('clock-second').innerHTML = second;
};

function updateRocketStatus() {
    var rstat = getRocketStatus(gameClock);
    if (rstat != null) {
        document.getElementById('rocketstatus').innerHTML = rstat;
    }
};

function updateTimeVisuals() {
    updateTime();
    updateRocketStatus();
    document.getElementById('entropyPoints').style.color = 'gold';
}

function liftoff() {
    console.log('LIFTOFF');
    gameDifficulty += .3;
    if (gameEntropy >= 6) { // 6 is currently the lowest playable cost in the demo
        alert("Time for another launch");
        playLevel();
    } else {
        alert("Game over! We're too lazy to calculate your score");
    }
};

function timeHandler() {
    updateTimeVisuals();
    gameClock -= 1;
    //If time has run out, stop interval and run liftoff code
    if (0 > gameClock) {
        clearInterval(tick);
        liftoff();
    }
};

//Power-based handler functions

// checks player visibility on button click
function updateVisibility(Vis) {
    if (levelVisibility <= 3) {
        document.getElementById("visibilityScore").src = "art/sprites/Green.png";
    } else if (levelVisibility <= 6) {
        document.getElementById("visibilityScore").src= "art/sprites/yellow.png";
    } else if (levelVisibility > 6) {
        document.getElementById("visibilityScore").src= "art/sprites/Red.png";
    }
}

function updateDamage(damage) {
    damage *= 10;
    if (damage > 100) damage = 100;
    document.getElementById('damagebar').style.width = damage+"%"
    if (damage > 75) {
        document.getElementById('damagebar').style.background = "#FF0000 "
    } else if (damage > 50) {
        document.getElementById('damagebar').style.background = "#FF7000 "
    } else if (damage > 25) {
        document.getElementById('damagebar').style.background = "#FFF700 "
    } else {
        document.getElementById('damagebar').style.background = "#5DFF00 "
    }
}

// pass this function to each update type function
function updateEntropy(Ent) {
    document.getElementById('entropyPoints').innerHTML = Ent;
}

function updateVictory(Victory) {
	document.getElementById('victoryPoints').innerHTML = Victory;
}

function updatePowerVisuals() {
    updateDamage(levelDamage);
    updateVisibility(levelVisibility);
    updateEntropy(gameEntropy);
}

function handlePower(power) {
    if (power.active) {
        return false;
    } else if (power.cost > gameEntropy) {
        document.getElementById('entropyPoints').style.color = "#C00";
        return false;
    } else {
        return true;
    }
}

function powerButtonHandler(ptype, pname) {
    if (0 > gameClock) return;
    console.log(ptype, pname);
    var buttonPower = powers[ptype][pname];
        playSample(buttonPower.sound)
    if (handlePower(buttonPower)) {
        buttonPower.active = true;
        gameEntropy -= buttonPower.cost;
        if (isScrubbed(buttonPower)) {
            alert("Command has decided to scrub the launch. You'll have to be sneakier than that")
            gameDifficulty += .1;
            playLevel();
        }
        // update animation state
        document.getElementById(powers[ptype][pname].animationName).style.animationPlayState = 'running';
    }
    updatePowerVisuals();
};

//Primary game loop functions

function resetLevel() {
    gameClock = 90;
    levelVisibility = 0;
    levelDamage = 0;
    for (ptype in powers) {
        for (pname in powers[ptype]) {
            powers[ptype][pname].active = false;
        }
    }
    updateTimeVisuals();
    updatePowerVisuals();
	gameVictory = 10;
	updateVictory(gameVictory);
};

function playLevel() {
    resetLevel();
    tick = setInterval(timeHandler, 1000);
};

function playgame() {
	document.getElementById('title').style.visibility = 'visible';
    alert('Hi Murphy! Are you ready to make things go wrong?')
	document.getElementById('ui').style.visibility = 'visible';
	document.getElementById('title').style.visibility = 'hidden';
    gameEntropy = 100;
    gameDifficulty = .5;
    playLevel()
}
