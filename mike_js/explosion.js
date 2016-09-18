function particle(){
  //x, vx, y, vy, t
  return [ecanvas.width/2 + (0.5 - Math.random())*2, (0.5 - Math.random())*2,
    // 0, (0.5-Math.random())*6+8, Math.random()*500]
    ecanvas.height/2, (0.5-Math.random())*10, Math.random()*500]
}

var arr = Array(1000)
for(var i = 0; i < arr.length; i++){
  arr[i] = particle()
}

function drawCircle(cx, cy, r, end, t){
  ectx.beginPath()
  ectx.arc(cx, cy, r, 0, 2 * Math.PI, false)
  ectx.fillStyle = 'rgba(255,'
  +Math.min(Math.floor(end*20/t, 255))+','
  +Math.min(Math.floor(end*5/t, 255))+','
  +0.04*end/t+')'
  // ectx.fillStyle = 'rgba(250,150,20,0.3)'
  ectx.fill()
  // ectx.stroke()
}

function updateDrawArr(dx, dy, r){
  var end = arr.length/50
  for(var i = 0; i < arr.length; i++){
    arr[i][4] += 1
    if(arr[i][4] > arr.length/50){
      arr[i] = particle()
    } else{
      arr[i][0] += arr[i][1]
      arr[i][2] += arr[i][3]
    }
    drawCircle(arr[i][0] + dx, arr[i][2] + dy, r, end, arr[i][4])
  }
}

function render(){
  // if(!hidden){}
  ectx.globalCompositeOperation = 'source-over'
  ectx.fillStyle = "rgba(0,0,0,0.1)"
  ectx.fillRect(0,0, ecanvas.width, ecanvas.height)
  ectx.globalCompositeOperation = 'lighter'
  updateDrawArr(0, 0, 4)
  var ImageData = ectx.getImageData(0,0,ecanvas.width,ecanvas.height);
  for(var i = 0;i < ecanvas.height; i++)
     for(var j = 0; j < ecanvas.width; j++)
        ImageData.data[((i*(ecanvas.width*4)) + (j*4) + 3)] *=
        ImageData.data[((i*(ecanvas.width*4)) + (j*4) + 0)]*
        ImageData.data[((i*(ecanvas.width*4)) + (j*4) + 1)]/(255)
  ectx.putImageData(ImageData,0,0);//put image data back
  window.requestAnimationFrame(render)
}
render()
