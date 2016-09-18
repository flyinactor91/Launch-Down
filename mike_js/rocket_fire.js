function particle(){
  //x, vx, y, vy, t
  return [canvas.width/2 + (0.5 - Math.random())*5, (0.5 - Math.random())*2,
    0, (0.5-Math.random())*6+8, Math.random()*500]
    // canvas.height/4, (0.5-Math.random())*10+15, Math.random()*500]
}

var arr = Array(1000)
for(var i = 0; i < arr.length; i++){
  arr[i] = particle()
}

function drawCircle(cx, cy, r, end, t){
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, 2 * Math.PI, false)
  ctx.fillStyle = 'rgba(255,'
  +Math.min(Math.floor(end*20/t, 255))+','
  +Math.min(Math.floor(end*5/t, 255))+','
  +0.04*end/t+')'
  // ctx.fillStyle = 'rgba(250,150,20,0.3)'
  ctx.fill()
  // ctx.stroke()
}

function updateDrawArr(){
  var end = arr.length/50
  for(var i = 0; i < arr.length; i++){
    arr[i][4] += 1
    if(arr[i][4] > arr.length/50){
      arr[i] = particle()
    } else{
      arr[i][0] += arr[i][1]
      arr[i][2] += arr[i][3]
    }
    drawCircle(arr[i][0], arr[i][2], 10, end, arr[i][4])
  }
}

function render(){
  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = "rgba(0,0,0,0.1)"
  ctx.fillRect(0,0, canvas.width, canvas.height)
  ctx.globalCompositeOperation = 'lighter'
  updateDrawArr()
  var ImageData = ctx.getImageData(0,0,canvas.width,canvas.height);
  for(var i = 0;i < canvas.height; i++)
     for(var j = 0; j < canvas.width; j++)
        ImageData.data[((i*(canvas.width*4)) + (j*4) + 3)] *=
        ImageData.data[((i*(canvas.width*4)) + (j*4) + 0)]*
        ImageData.data[((i*(canvas.width*4)) + (j*4) + 1)]/(255)
  ctx.putImageData(ImageData,0,0);//put image data back
  window.requestAnimationFrame(render)
}
render()
