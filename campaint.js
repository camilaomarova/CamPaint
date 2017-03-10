var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

context.lineWidth = 5;

var down = false; //mouse

canvas.addEventListener('mousemove', draw); //whenever mouse moves -> draw!!

function select(){
	canvas.addEventListener('mousemove', drawRect);

	canvas.addEventListener('mousedown', function(){
	down = true;
	context.beginPath();
	context.moveTo(xPos, yPos);	
	canvas.addEventListener("mousemove", drawRect);
});

}

canvas.addEventListener('mousedown', function(){
	down = true;
	context.beginPath();
	context.moveTo(xPos, yPos);	
	canvas.addEventListener("mousemove", draw);
});

canvas.addEventListener('mouseup', function(){
	down = false;
});

function drawRect(e){
	xPos = e.clientX - canvas.offsetLeft;
	yPos = e.clientY - canvas.offsetTop;

	if(down == true){
		context.rect(xPos, yPos);
		context.stroke();
	}
}

function draw(e){ //высчитываем
	xPos = e.clientX - canvas.offsetLeft;
	yPos = e.clientY - canvas.offsetTop;

	if(down == true){
		context.lineTo(xPos, yPos);
		context.stroke();
	}
}

function changeColor(color){
		context.strokeStyle = color;
}

function clearCanvas(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function changeBrushSize(size){
	context.lineWidth = size;
}


function triggerClick(){
	document.getElementById('file').click();
}

document.getElementById('file').addEventListener('change', function(e){
  var temp = URL.createObjectURL(e.target.files[0]); //create url for file that will specify as its parametr
  var image = new Image();
  image.src = temp;

  image.addEventListener('load', function(){
    context.drawImage(image, 0, 0);
  })

  function drawImage(image) {
        

        var imageData = context.getImageData(x, y, canvas.width, canvas.height);
        var data = imageData.data;

        for(var i = 0; i < data.length; i += 4) {
          // red
          data[i] = 255 - data[i];
          // green
          data[i + 1] = 255 - data[i + 1];
          // blue
          data[i + 2] = 255 - data[i + 2];
        }

        context.putImageData(imageData, canvas.width, canvas.height);
  }
});



var ClickMode = {
    Paint: 0,
    Fill: 1
};
var mouseDown = false;
var currentMode = ClickMode.Paint;
var ctx = $('#canvas').get(0).getContext('2d');
var lastPoint = {x: 0, y: 0};

$('#canvas').mousedown(function(event){
    if (currentMode == ClickMode.Paint)
    {
        mouseDown = true;
        lastPoint.x = event.offsetX;
        lastPoint.y = event.offsetY;
    }
    else
        floodFill(event.offsetX, event.offsetY, 255, 255);
    return false;
}).mousemove(function(event){
    if (mouseDown)
    {
        ctx.beginPath();
                ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        
        lastPoint.x = event.offsetX;
        lastPoint.y = event.offsetY;
    }
}).mouseup(function(){
    mouseDown = false;
    return false
});

$('a').click(function(){
    var mode = $(this).attr('href').slice(1);
    switch(mode)
    {
        case "fill":
            currentMode = ClickMode.Fill;
            break;
       case "clear":
            ctx.clearRect(0, 0, 800, 450);
       case "paint":
            currentMode = ClickMode.Paint;
                        break;
    }
    return false;
});
function floodFill(x, y, color, borderColor){
    var imageData = ctx.getImageData(0, 0, 800, 450);
    var width = imageData.width;
    var height = imageData.height;
    var stack = [[x, y]];
    var pixel;
    var point = 0;
    while (stack.length > 0)
    {   
        pixel = stack.pop();
        if (pixel[0] < 0 || pixel[0] >= width)
            continue;
        if (pixel[1] < 0 || pixel[1] >= height)
            continue;
        
        // Alpha
        point = pixel[1] * 4 * width + pixel[0] * 4 + 3;
          // Если это не рамка и ещё не закрасили
        if (imageData.data[point] != borderColor && imageData.data[point] != color)
        {
            // Закрашиваем
            imageData.data[point] = color;
            
            // Ставим соседей в стек на проверку
            stack.push([
                pixel[0] - 1,
                pixel[1]
            ]);
            stack.push([
                pixel[0] + 1,
                pixel[1]
            ]);
            stack.push([
                pixel[0],
                pixel[1] - 1
            ]);
            stack.push([
                pixel[0],
                pixel[1] + 1
                            ]);
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function filtBright() {
    var imgData = context.getImageData(0, 0, 800, 450);
    var data = imgData.data;

        for(var i = 0; i < data.length; i += 4) {
          var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
          // red
          data[i] = brightness;
          // green
          data[i + 1] = brightness;
          // blue
          data[i + 2] = brightness;
        }

    context.putImageData(imgData, 0, 0);
}

function filtGray() {
    var imgData = context.getImageData(0, 0, 800, 450);
    var data = imgData.data;

        for (var i=0; i<data.length; i+=4) {
         var brightness = 0.78 * data[i] + 0.85 * data[i + 1] + 0.78 * data[i + 2];
          // red
          data[i] = brightness;
          // green
          data[i + 1] = brightness;
          // blue
          data[i + 2] = brightness;
        }

    context.putImageData(imgData, 0, 0);
}

function filtMary() {
    var imageData = context.getImageData(0, 0, 800, 450);
    var data = imageData.data;

        for (j=0; j<imageData.width; j++)
    {
      for (i=0; i<imageData.height; i++)
      {
         // index: red, green, blue, alpha, red, green, blue, alpha..etc.
         var index=(i*4)*imageData.width+(j*4);
         var red=imageData.data[index];
         var alpha=imageData.data[index+3];

         // set the red to the same
         imageData.data[index]=red;

         // set the rest to black
         imageData.data[index+1]=0;
         imageData.data[index+2]=0;
         imageData.data[index+3]=alpha;
       }
     }

    context.putImageData(imageData, 0, 0);
}



function filtViolet() {
  var imageData = context.getImageData(0, 0, 800, 450);
    var data = imageData.data;

       for (j=0; j<imageData.width; j++)
    {
      for (i=0; i<imageData.height; i++)
      {
         // index: red, green, blue, alpha, red, green, blue, alpha..etc.
         var index=(i*4)*imageData.width+(j*4);
         
         imageData.data[index+1]=0;
       }
     }

    context.putImageData(imageData, 0, 0);
}

function filtNevidimka() {
  var imageData = context.getImageData(0, 0, 800, 450);
    var data = imageData.data;

       for (j=0; j<imageData.width; j++)
    {
      for (i=0; i<imageData.height; i++)
      {
         // index: red, green, blue, alpha, red, green, blue, alpha..etc.
         var index=(i*4)*imageData.width+(j*4);
         

         imageData.data[index+1]=imageData.data[index+1] * 7;
         imageData.data[index+2]=imageData.data[index+2] * 8;
         imageData.data[index+3]=imageData.data[index+3] * 0.0722;
       }
     }

    context.putImageData(imageData, 0, 0);
}

function filtRetro() {
  var imageData = context.getImageData(0, 0, 800, 450);
    var data = imageData.data;

      for (var i = 0; i < data.length; i += 4) {
          data[i] = 255 - (((255 - data[i]) * (255 - imageData.data[i])) / 255);
          data[i + 1] = 255 - (((255 - data[i + 1]) * (250 - imageData.data[i + 1])) / 255);
          data[i + 2] = 255 - (((255 - data[i + 2]) * (250 - imageData.data[i + 2])) / 255);
          data[i + 3] = 255 - (((255 - data[i + 3]) * (250 - imageData.data[i + 3])) / 255);
        }

    context.putImageData(imageData, 0, 0);
}


function filtHustl() {
  var imgData = context.getImageData(0, 0, 800, 450);
    var sp = imgData.data;
    var mult = 0.5;

    var ll = function(orig, mean){
      var dif = Math.abs(orig - mean) * mult;
      dif = orig > mean ? -dif : dif;
      return orig + dif;
    };
    for(var i = 0; i < imgData.data.length; i+=4){
      var mean = (sp[i] + sp[i+1] + sp[i+2])/3;
      sp[i] = ll(sp[i], mean);
      sp[i+1] = ll(sp[i+1], mean);
      sp[i+2] = ll(sp[i+2], mean);
    }


    context.putImageData(imgData, 0, 0);
}
