document.title = "LaunchDown"
var fit = require('canvas-fit')
  var canvas = document.body.appendChild(document.createElement('canvas'))
  window.addEventListener('resize', fit(canvas), false)
  var ctx = canvas.getContext('2d')

var images = require("./art/js/images.js")

// var thunder = new Audio('art/Sounds/Thunder_HD-Mark_DiAngelo-587966950.mp3')

var audioContext = new AudioContext()
// wait 100ms for sample to download/decode
var startTime = audioContext.currentTime + 0.2

function playSample(file_name){
  //'art/Sounds/Thunder_HD-Mark_DiAngelo-587966950.mp3'
  getSample(file_name, function play (buffer) {
    var player = audioContext.createBufferSource()
    player.buffer = buffer
    player.connect(audioContext.destination)
    player.start(startTime)
  })
}

function getSample(url, cb) {
  var request = new XMLHttpRequest()
  request.open('GET', url)
  request.responseType = 'arraybuffer'
  request.onload = function () {
    audioContext.decodeAudioData(request.response, cb)
  }
  request.send()
}

function drawCircle(cx, cy, r){
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, 2 * Math.PI, false)
  ctx.fillStyle = 'rgba(0,0,0,0.4)'
  ctx.fill()
  ctx.stroke()
}

var UI_ratio = 611/808 //bottom bar
var buttons = {}
  buttons.tips = ['smiley', 'mechanics', 'thunder']

function distance(x1,y1,x2,y2){
  var dx = x2 - x1 + buttons.height/2 //offset (image center is top left)
  var dy = y2 - y1 + buttons.height/2
  return Math.sqrt(dx*dx + dy*dy)
}

document.addEventListener('mousemove', getRelativeCoords, false)
document.addEventListener('click', function(e){
  mouse = event
  clickButton(getButton())
}, false)

var mouse = {}
function getRelativeCoords(event) {
    // console.log( { x: event.offsetX, y: event.offsetY } )
    mouse = event
}

function checkHover(){
  var i = getButton()
  if(i >= 0){
      var bx = buttons.pos[i][0]
      var by = buttons.pos[i][1]
      drawCircle(bx + buttons.height/2, by + buttons.height/2, buttons.height/2)
      ctx.font="20px Georgia";
      ctx.fillText(buttons.tips[i], mouse.offsetX, mouse.offsetY)
      //tooltip
  }
}
function getButton(){
  var x = mouse.offsetX
  var y = mouse.offsetY
  for(var i = 0; i < buttons.pos.length; i++){
    var bx = buttons.pos[i][0]
    var by = buttons.pos[i][1]
    if(distance(x,y, bx, by) < buttons.height/2){ //height is diameter
      return i
    }
  }
  return -1
}

function clickButton(i){
  switch(i){
    case 2:
      playSample('art/Sounds/Thunder_HD-Mark_DiAngelo-587966950.mp3')
      break;
    default:
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
  checkHover()
  window.requestAnimationFrame(render)
}
render()
//npm install
//budo index.js
