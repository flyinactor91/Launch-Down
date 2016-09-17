var seconds = 90;

function updateTime() {
    var minute = Math.floor(seconds / 60);
    var second = seconds % 60;
    console.log(minute + ':' + second);
    document.getElementById('clock').innerHTML = minute + ':' + second;
    seconds -= 1;
}

function timeHandler() {
    //set clock
    updateTime();
}

var tick = setInterval(timeHandler, 1000);