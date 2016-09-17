var gameclock = 90;

function updateTime() {
    var minute = Math.floor(gameclock / 60);
    var second = gameclock % 60;

    if(minute<0){minute = "00"}
    else if(minute<10){minute = "0" + minute}
    
    if(second<0){second = "00"}    
    else if(second<10){second = "0" + second}

    console.log(minute + ':' + second);
    document.getElementById('clock').innerHTML = 'T-' + minute + ':' + second;
}

function rocketStatus() {

}

function liftoff() {
    console.log('LIFTOFF');
}

function timeHandler() {
    //set clock
    updateTime();
    gameclock -= 1;
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


// checks player visibility on button click


    function changeImage(Vis) {
        if (Vis <= 5){
            var State = 0;
        }
        else if (Vis < 10)
            {var State = 1;}
        else if (Vis => 10)
            {var State = 2;}

        switch (State){
            case 0:
                document.getElementById('visibilityScore').innerHTML = "GOOD";
                // document.getElementById("imageid").src="../template/save.png";
                break;
            case 1:
                document.getElementById('visibilityScore').innerHTML = "MEH";
                // document.getElementById("imageid").src="../template/save.png";
                break;
            case 2:
                document.getElementById('visibilityScore').innerHTML = "BAD";
                // document.getElementById("imageid").src="../template/save.png";
                break;
        }
};
   
// pass this function to each update type function
   function updateEntrophy(Ent) {
       document.getElementById('entrophyUsed').innerHTML = Ent;
   }
