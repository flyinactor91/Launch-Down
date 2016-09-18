var gameClock;
var gameEntropy;
var levelVisibility;
var levelDamage;
var gameDifficulty;
var gamePoints;
var tick;

//Scoring functions

function isScrubbed(power) {
    var visCutoff = (power.visibility*10 + levelVisibility*5) * gameDifficulty;
    console.log('(', power.visibility, '* 10 +', levelVisibility, '* 5 ) *', gameDifficulty, '=', visCutoff);
    var rand = Math.random();
    console.log(rand, '<', visCutoff/100, rand < visCutoff/100);
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

function launchSuccess() {
    var dmgCutoff = levelDamage / gameDifficulty;
    console.log(levelDamage, '/', gameDifficulty, '=', dmgCutoff);
    var rand = Math.random();
    console.log(rand, '<', dmgCutoff/20, rand < dmgCutoff/20);
    if (rand < dmgCutoff/20) {
        console.log('Rocket Explosion');
        return false;
    } else {
        console.log('Launch Success');
        return true;
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

    //console.log(minute + ':' + second);
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
    if (gameClock == 3) setFire('block');
}

function setFire(set) {
    document.getElementById('rocket_canvas').style.display = set;
}

function animateLaunch() {
    /*
    animate here
    */
    setTimeout(function() {levelEndHandler(0);}, 500);
}

function animateExplosion() {
    /*
    animate here
    */
    setTimeout(function() {levelEndHandler(1);}, 3000);
}

function liftoff() {
    console.log('LIFTOFF');
    if (launchSuccess()) {
        gameDifficulty += .15;
        //calling setTimeout here will call a-func n-miliseconds from this point
        animateLaunch();
    } else {

        gameDifficulty += .2;
        gamePoints += 3;
        updateVictory(gamePoints);
        animateExplosion();
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
    if (handlePower(buttonPower)) {
        buttonPower.active = true;
        gameEntropy -= buttonPower.cost;
        playSample(buttonPower.sound)
        if (isScrubbed(buttonPower)) {
            gameDifficulty += .1;
            gamePoints += 1;
            updateVictory(gamePoints);
            levelEndHandler(2);
        }
        // update animation state
        document.getElementById(powers[ptype][pname].animationName).style.animationPlayState = 'running';
    }
    updatePowerVisuals();
};

//Primary game loop functions

function levelEndHandler(result) {
    if (result == 0) { //launch
        alert("Oh no! The rocket launch successfully");
    } else if (result == 1) { //explode
        alert("Congratulations! The launch team has a lot of work to do");
    } else { //scrub
        alert("Command has decided to scrub the launch. You'll have to be sneakier than that");
    }
    if (gameEntropy >= 6) { // 6 is currently the lowest playable cost in the demo
        alert("Time for another launch");
        playLevel();
    } else {
        alert("Game over! Your final score is " + gamePoints);
        throw new Error("Game over exit");
    }
}

function resetLevel() {
    clearInterval(tick);
    gameClock = 10;
    levelVisibility = 0;
    levelDamage = 0;
    for (ptype in powers) {
        for (pname in powers[ptype]) {
            powers[ptype][pname].active = false;
            try {
                document.getElementById(powers[ptype][pname].animationName).style.animationPlayState = 'paused';
            } catch (e){}
        }
    }
    setFire('none');
    updateTimeVisuals();
    updatePowerVisuals();
};

function playLevel() {
	document.getElementById('ui').style.visibility = 'visible';
	document.getElementById('title').style.visibility = 'hidden';
    resetLevel();
    tick = setInterval(timeHandler, 1000);
};

function playgame() {
	document.getElementById('title').style.visibility = 'visible';

    gameEntropy = 100;
    gamePoints = 0;
    gameDifficulty = .4;
}
