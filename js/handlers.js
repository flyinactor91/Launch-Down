var gameclock = 10;

function updateTime() {
    var minute = Math.floor(gameclock / 60);
    var second = gameclock % 60;

    if(minute<0){minute = "00"}
    else if(minute<10){minute = "0" + minute}
    
    if(second<0){second = "00"}    
    else if(second<10){second = "0" + second}

    console.log(minute + ':' + second);
    document.getElementById('clock').innerHTML = 'T-' + minute + ':' + second;
    gameclock -= 1;
}

function liftoff() {
    console.log('LIFTOFF');
}

function timeHandler() {
    //set clock
    updateTime();
    //If time has run out, stop interval and run liftoff code
    if (0 > gameclock) {
        clearInterval(tick);
        liftoff();
    }
}

function powerHandler(ptype) {
    if (0 > gameclock) return;
    console.log(ptype);
}

var tick = setInterval(timeHandler, 1000);