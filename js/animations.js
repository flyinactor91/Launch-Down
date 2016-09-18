
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