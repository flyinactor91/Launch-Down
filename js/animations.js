
var animationMappings = {

}




function unhide(img) {
    document.getElementById(img).style.visibility = 'visible';

}

function myMove(start, end) {
    document.getElementById(img).style.visibility = 'visible';
    var elem = document.getElementById("animate");   
    var pos = start;
    var id = setInterval(frame, 5);
    function frame() {
        if (pos == position) {
        clearInterval(id);
        } else {
        pos++; 
        elem.style.top = pos + 'px'; 
        elem.style.left = pos + 'px'; 
        }
  }
}