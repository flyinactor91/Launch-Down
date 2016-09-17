(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var img = require('./img.js')
module.exports = {
  "human_factor_button" : img(0)
  ,"mechanic_button" : img(1)
  ,"thunder_button" : img(2)
  ,"background" : img(3)
  ,"ui" : img(4)
  ,"cloud" : img(5)
}

},{"./img.js":3}],2:[function(require,module,exports){
module.exports = [
  "art/sprites/human_factor_button.png"
  ,"art/sprites/mechanic_button.png"
  ,"art/sprites/thunder_button.png"
  ,"art/sprites/background.png"
  ,"art/sprites/ui.png"
  ,"art/sprites/cloud.png"
]

},{}],3:[function(require,module,exports){
var imgsrc = require("./img-src.js")

module.exports = function(index) {
  var image = new Image()
      image.src = imgsrc[index]
  return image
}
},{"./img-src.js":2}],4:[function(require,module,exports){
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

},{"./art/js/images.js":1,"canvas-fit":5}],5:[function(require,module,exports){
var size = require('element-size')

module.exports = fit

var scratch = new Float32Array(2)

function fit(canvas, parent, scale) {
  var isSVG = canvas.nodeName.toUpperCase() === 'SVG'

  canvas.style.position = canvas.style.position || 'absolute'
  canvas.style.top = 0
  canvas.style.left = 0

  resize.scale  = parseFloat(scale || 1)
  resize.parent = parent

  return resize()

  function resize() {
    var p = resize.parent || canvas.parentNode
    if (typeof p === 'function') {
      var dims   = p(scratch) || scratch
      var width  = dims[0]
      var height = dims[1]
    } else
    if (p && p !== document.body) {
      var psize  = size(p)
      var width  = psize[0]|0
      var height = psize[1]|0
    } else {
      var width  = window.innerWidth
      var height = window.innerHeight
    }

    if (isSVG) {
      canvas.setAttribute('width', width * resize.scale + 'px')
      canvas.setAttribute('height', height * resize.scale + 'px')
    } else {
      canvas.width = width * resize.scale
      canvas.height = height * resize.scale
    }

    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'

    return resize
  }
}

},{"element-size":6}],6:[function(require,module,exports){
module.exports = getSize

function getSize(element) {
  // Handle cases where the element is not already
  // attached to the DOM by briefly appending it
  // to document.body, and removing it again later.
  if (element === window || element === document.body) {
    return [window.innerWidth, window.innerHeight]
  }

  if (!element.parentNode) {
    var temporary = true
    document.body.appendChild(element)
  }

  var bounds = element.getBoundingClientRect()
  var styles = getComputedStyle(element)
  var height = (bounds.height|0)
    + parse(styles.getPropertyValue('margin-top'))
    + parse(styles.getPropertyValue('margin-bottom'))
  var width  = (bounds.width|0)
    + parse(styles.getPropertyValue('margin-left'))
    + parse(styles.getPropertyValue('margin-right'))

  if (temporary) {
    document.body.removeChild(element)
  }

  return [width, height]
}

function parse(prop) {
  return parseFloat(prop) || 0
}

},{}]},{},[4]);
