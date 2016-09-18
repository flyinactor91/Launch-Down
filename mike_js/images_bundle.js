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
images = require("../art/js/images.js")

},{"../art/js/images.js":1}]},{},[4]);
