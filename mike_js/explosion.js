function Eparticle(){
  //x, vx, y, vy, t
  var v = 15
  return [ecanvas.width/2 + (0.5 - Math.random())*2, (0.5 - Math.random())*v,
    // 0, (0.5-Math.random())*6+8, Math.random()*500]
    ecanvas.height/2, (0.5-Math.random())*v, Math.random()*500]
}

var Earr = Array(1000)
for(var i = 0; i < Earr.length; i++){
  Earr[i] = Eparticle()
}

function EdrawCircle(cx, cy, r, end, t){
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

function EupdateDrawArr(dx, dy, r){
  var end = Earr.length/50
  for(var i = 0; i < Earr.length; i++){
    Earr[i][4] += 1
    if(Earr[i][4] > Earr.length/50){
      Earr[i] = Eparticle()
    } else{
      Earr[i][0] += Earr[i][1]*Math.random()
      Earr[i][2] += Earr[i][3]*Math.random()
    }
    EdrawCircle(Earr[i][0] + dx, Earr[i][2] + dy, r, end, Earr[i][4])
  }
}

function Erender(){
  // if(!hidden){}
  ectx.globalCompositeOperation = 'source-over'
  ectx.fillStyle = "rgba(0,0,0,0.1)"
  ectx.fillRect(0,0, ecanvas.width, ecanvas.height)
  ectx.globalCompositeOperation = 'lighter'
  EupdateDrawArr(0, 0, 10)
  var ImageData = ectx.getImageData(0,0,ecanvas.width,ecanvas.height);
  for(var i = 0;i < ecanvas.height; i++)
     for(var j = 0; j < ecanvas.width; j++)
        ImageData.data[((i*(ecanvas.width*4)) + (j*4) + 3)] *=
        ImageData.data[((i*(ecanvas.width*4)) + (j*4) + 0)]*
        ImageData.data[((i*(ecanvas.width*4)) + (j*4) + 1)]/(255)
  ectx.putImageData(ImageData,0,0);//put image data back
  window.requestAnimationFrame(Erender)
}
Erender()
