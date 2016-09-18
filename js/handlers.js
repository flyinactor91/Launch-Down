var gameClock;
var gameEntropy;
var levelVisibility;
var levelDamage;
var levelPowers;
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
}

function liftoff() {
    console.log('LIFTOFF');
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


// image animation function and mapping

var animationMappings = {
    "Environment": {"start":["0px", "0px"], "end":["400px", "400px"],},
    "Mechanical": {"start":["0px", "0px"], "end":["400px", "400px"],},
    "Human": {"start":["0px", "0px"], "end":["400px", "400px"],},
}



function animate(button) {
    document.getElementById(button).style.visibility = 'visible';
    var elem = document.getElementById(button);
    var begin = animationMappings[button]["start"];
    var end = animationMappings[button]["end"];
    var id = setInterval(frame, 12);
    function frame() {
        if (begin == end) {
        clearInterval(id);
        } else {
        begin++;
        elem.style.top = begin + 'px';
        elem.style.left = begin + 'px';
        }
  }
}




// checks player visibility on button click
function updateVisibility(Vis) {
    if (levelVisibility <= 5) {
        document.getElementById('visibilityScore').innerHTML = "GOOD";
        // document.getElementById("imageid").src="../template/save.png";
    } else if (levelVisibility <= 10) {
        document.getElementById('visibilityScore').innerHTML = "MEH";
        // document.getElementById("imageid").src="../template/save.png";
    } else { //if (levelVisibility > 10) {
        document.getElementById('visibilityScore').innerHTML = "BAD";
        // document.getElementById("imageid").src="../template/save.png";
    }
};

function updateDamage(damage) {
    if (damage > 100) damage = 100;
    document.getElementById('damagebar').style.width = damage+"%"
    if(damage>75){
        document.getElementById('damagebar').style.background = "#FF0000 "}
    else if(damage>50){
        document.getElementById('damagebar').style.background = "#FF7000 "}
    else if(damage>25){
        document.getElementById('damagebar').style.background = "#FFF700 "}
    else {
        document.getElementById('damagebar').style.background = "#5DFF00 "}
}

// pass this function to each update type function
function updateEntropy(Ent) {
    document.getElementById('entropyPoints').innerHTML = Ent;
};

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
        document.getElementById('entropyPoints').style.backgroundColor = "red";
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
    if (handlePower(levelPowers[ptype][pname])) {
        levelPowers[ptype][pname].active = true;
    }
    updatePowerVisuals();
};

//Primary game loop functions

function resetLevel() {
    gameClock = 90;
    gameEntropy = 70
    levelVisibility = 0;
    levelDamage = 0;
    levelPowers = powers;
    updateTimeVisuals();
    updatePowerVisuals();
};

function playLevel() {
    resetLevel();
    tick = setInterval(timeHandler, 1000);
};

function playgame() {
    playLevel();
}
