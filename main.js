window.addEventListener("DOMContentLoaded",function(){

  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')
  // console.log('context',context)
  
  let load_counter = 0
  
  const background = new Image()
  const shadow = new Image()
  const leafbefore = new Image()
  const leafafter = new Image()
  const flower = new Image()
  const cat = new Image()
  const banner = new Image()
  const start = new Image()
  const border = new Image()


  const layer_list = [
  {
    image: background,
    src: "./catimg/background.png",
    z_index: -2.25,
    position: { x: 0 ,y: 0 },
    blend: null,
    opacity: 1,
  },
  {
    'image': leafafter,
    'src': "./catimg/leafafter.png",
    'z_index': -2,
    'position': { x: 0 ,y: 0 },
    'blend': null,
    'opacity': 1,
  },
  {
    'image': shadow,
    'src': "./catimg/shadow.png",
    'z_index': -1.5,
    'position': { x: 0 ,y: 0 },
    'blend': null,
    'opacity': 1,
  },
  {
    'image': cat,
    'src': "./catimg/cat.png",
    'z_index': -1,
    'position': { x: 0 ,y: 0 },
    'blend': null,
    'opacity': 1,
  },
  {
    'image': leafbefore,
    'src': "./catimg/leafbefore.png",
    'z_index': -0.5,
    'position': { x: 0 ,y: 0 },
    'blend': null,
    'opacity': 1,
  },
  {
    'image': flower,
    'src': "./catimg/flower.png",
    'z_index': -0.25,
    'position': { x: 0 ,y: 0 },
    'blend': null,
    'opacity': 1,
  },
  {
    'image': border,
    'src': "./catimg/border.png",
    'z_index': 0,
    'position': { x: 0 ,y: 0 },
    'blend': null,
    'opacity': 1,
  },
  {
    'image': banner,
    'src': "./catimg/banner.png",
    'z_index': 1.5,
    'position': { x: 0 ,y: 0 },
    'blend': null,
    'opacity': 1,
  },
  {
    'image': start,
    'src': "./catimg/start.png",
    'z_index': 2.5,
    'position': { x: 0 ,y: 0 },
    'blend': null,
    'opacity': 0.9,
  },
  ]


  layer_list.forEach((layer,index)=>{
    layer.image.onload = function(){
      load_counter += 1
      if(load_counter >= layer_list.length){
        //更新動畫
        requestAnimationFrame(drawCanvas)
      }
    }
    layer.image.src = layer.src
  })

  function drawCanvas(){
    context.clearRect( 0 , 0, canvas.width, canvas.height )

    //旋轉
    let rotate_x = ( pointer.x * -0.15 ) + ( motion.x * 1.2)
    let rotate_y = ( pointer.y * -0.15 ) + ( motion.y * 1.2)

    canvas.style.transform = "rotate(" + rotate_x + "," + rotate_y + ")"


    layer_list.forEach((layer,index)=>{

      layer.position = getOffset(layer)
      
      if(layer.blend){
        context.globalCompositeOperation = layer.blend
      }else{
        context.globalCompositeOperation = 'normal'
      }
      //globalAlpha canvas 透明度
      context.globalAlpha = layer.opacity
      context.drawImage(layer.image, layer.position.x, layer.position.y )
      })
    requestAnimationFrame(drawCanvas)
  }

  //取得要設置的位置 
  function getOffset(layer){
    const touch_multiplier = 0.1
    const touch_offset_x = pointer.x * layer.z_index * touch_multiplier
    const touch_offset_y = pointer.y * layer.z_index * touch_multiplier

    const motion_multiplier = 2.5
    const motion_offset_x = motion.x * layer.z_index * motion_multiplier
    const motion_offset_y = motion.y * layer.z_index * motion_multiplier

    const offset = {
      x: touch_offset_x + motion_offset_x,
      y: touch_offset_y + motion_offset_x
    }
    // console.log("offset",offset)
    return offset
  }


  //計算滑鼠前後座標
  let moving = false
  const pointer_initial = {
    x: 0,
    y: 0
  }
  const pointer = {
    x: 0,
    y: 0
  }

  canvas.addEventListener('touchstart',pointStart)
  canvas.addEventListener('mousedown',pointStart)

  function pointStart(event){
    // console.log('start',event)

    moving = true
    if(event.type === 'touchstart'){
      pointer_initial.x = event.touches[0].clientX
      pointer_initial.y = event.touches[0].clientY
    }else if(event.type === 'mousedown'){
      pointer_initial.x = event.clientX
      pointer_initial.y = event.clientY
      //console.log('pointerinitail',pointer_initial)
    }
  }

  window.addEventListener('touchmove',pointerMove)
  window.addEventListener('mousemove',pointerMove)
  
  function pointerMove(event){
    // console.log('move',event)
    event.preventDefault() 
    if(moving === true){
      let current_x = 0
      let current_y = 0
      if( event.type === 'touchmove'){
        current_x = event.touches[0].clientX
        current_y = event.touches[0].clientY
      } else if(event.type === 'mousemove'){
        current_x = event.clientX
        current_y = event.clientY
      }
      pointer.x = current_x - pointer_initial.x 
      pointer.y = current_y - pointer_initial.y
      // console.log('pointer',pointer)
      // console.log('current_x',current_x)
    }
  }

// motion controls

//initialize varialbles for motion-based parallax
  const motion_initial = {
    x: null,
    y: null
  }
  const motion ={
    x: 0,
    y: 0
  }
 

  window.addEventListener('deviceorientation', (event) =>{
    //判斷是否為第一次    
    console.log(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);

    if( !motion_initial.x && !motion_initial.y ){
      motion_initial.x = event.beta
      motion_initial.y = event.gamma
     }

     if( window.orientation === 0){
      motion.x = event.gamma - motion_initial.y
      motion.y = event.beta - motion_initial.x
     }else if( window.orientation === 90 ){
      motion.x = event.beta - motion_initial.x
      motion.y = -event.gamma + motion_initial.y
     }else if( window.orientation === -90 ){
      motion.x = -event.beta + motion_initial.x
      motion.y = event.gamma - motion_initial.y
     }else{
      motion.x = -event.gamma + motion_initial.y
      motion.y = -event.beta + motion_initial.x
     }

  })


  window.addEventListener('touchend',()=>{
    enableMotion()
  })
  
  function enableMotion(){
    if(window.DeviceOrientationEvent){
      DeviceOrientationEvent.requestPermission()
    }
  }

})

