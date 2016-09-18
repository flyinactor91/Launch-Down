var gameClock;
var gameEntropy;
var levelVisibility;
var levelDamage;
var tick;

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
    if (levelVisibility <= 5) {
        document.getElementById("visibilityScore").src = "art/sprites/Green.png";
    } else if (levelVisibility <= 10) {
        document.getElementById("visibilityScore").src= "art/sprites/yellow.png";
    } else if (levelVisibility > 10) {
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
    var pcost = power.cost
    if (power.active) {
        return false;
    } else if (pcost > gameEntropy) {
        document.getElementById('entropyPoints').style.color = "#C00";
        return false;
    } else {
        gameEntropy -= pcost;
        levelVisibility += power.visibility;
        levelDamage += power.damage;
        return true;
    }
}

function powerButtonHandler(ptype, pname) {
    if (0 > gameClock) return;
    console.log(ptype, pname);
    if (handlePower(powers[ptype][pname])) {
        powers[ptype][pname].active = true;
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
    alert('Hi Murphy! Are you ready to make things go wrong?')
    gameEntropy = 100;
    playLevel()
}
