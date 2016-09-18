fit = require('canvas-fit')
canvas = document.body.appendChild(document.createElement('canvas'))
  window.addEventListener('resize', fit(canvas), false)
ctx = canvas.getContext('2d')
