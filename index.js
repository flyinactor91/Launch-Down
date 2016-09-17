document.title = "LaunchDown"
var fit = require('canvas-fit')
  var canvas = document.body.appendChild(document.createElement('canvas'))
  window.addEventListener('resize', fit(canvas), false)
  var ctx = canvas.getContext('2d')


var images = require("./art/js/images.js")

var UI_ratio = 611/808 //bottom bar
var buttons = {}

document.addEventListener('click', getRelativeCoords, false);

function distance(x1,y1,x2,y2){
  var dx = x2 - x1 + buttons.height/2 //offset (image center is top left)
  var dy = y2 - y1 + buttons.height/2
  return Math.sqrt(dx*dx + dy*dy)
}

function getRelativeCoords(event) {
    console.log( { x: event.offsetX, y: event.offsetY } )
    var x = event.offsetX
    var y = event.offsetY
    for(var i = 0; i < buttons.pos.length; i++){
      var bx = buttons.pos[i][0]
      var by = buttons.pos[i][1]
      console.log([bx, by, distance(x,y, bx, by)])
      if(distance(x,y, bx, by) < buttons.height/2){ //height is diameter
        console.log("CLICKED!")
      }

    }
}

function updateButtons(){
  buttons.height = (1-UI_ratio)*canvas.height
  buttons.spacing = canvas.width - 3 * buttons.height
  buttons.pos = [[buttons.spacing/4, UI_ratio*canvas.height]
  , [2*buttons.spacing/4 + buttons.height, UI_ratio*canvas.height]
  , [3*buttons.spacing/4 + 2*buttons.height, UI_ratio*canvas.height]]
}

function drawButtons(){
  ctx.drawImage(images.human_factor_button, buttons.pos[0][0], buttons.pos[0][1], buttons.height, buttons.height)
  ctx.drawImage(images.mechanic_button,  buttons.pos[1][0], buttons.pos[1][1], buttons.height, buttons.height)
  ctx.drawImage(images.thunder_button, buttons.pos[2][0], buttons.pos[2][1], buttons.height, buttons.height)
}

function render(){
  ctx.clearRect(0,0, canvas.width, canvas.height)
  ctx.drawImage(images.ui, 0, 0, canvas.width, canvas.height)
  updateButtons()
  drawButtons()
  window.requestAnimationFrame(render)
}
render()
