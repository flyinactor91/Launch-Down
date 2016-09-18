var gameclock;
var levelVisibility;
var levelDamage;
var powerset;
var tick;

//Time-based handler functions

function updateTime() {
    var minute = Math.floor(gameclock / 60);
    var second = gameclock % 60;

    if(minute<0){minute = "00"}
    else if(minute<10){minute = "0" + minute}
    
    if(second<0){second = "00"}    
    else if(second<10){second = "0" + second}

    console.log(minute + ':' + second);
    document.getElementById('clock').innerHTML = 'T-' + minute + ':' + second;
};

function rocketStatus() {
    var rstat = getRocketStatus(gameclock);
    if (rstat != null) {
        document.getElementById('rocketstatus').innerHTML = rstat;
    }
};

function liftoff() {
    console.log('LIFTOFF');
};

function timeHandler() {
    //set clock
    updateTime();
    rocketStatus();
    gameclock -= 1;
    //If time has run out, stop interval and run liftoff code
    if (0 > gameclock) {
        clearInterval(tick);
        liftoff();
    }
};

//Power-based handler functions

// checks player visibility on button click
function changeImage(Vis) {
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
   
// pass this function to each update type function
function updateEntrophy(Ent) {
    document.getElementById('entrophyUsed').innerHTML = Ent;
};

function powerHandler(ptype) {
    if (0 > gameclock) return;
    console.log(ptype);
};

//Primary game loop functions

function resetLevel() {
    gameclock = 90;
    levelVisibility = 0;
    levelDamage = 0;
    powerset = powers;
};

function playLevel() {
    resetLevel();
    var tick = setInterval(timeHandler, 1000);
};

function playgame() {
    playLevel();
}