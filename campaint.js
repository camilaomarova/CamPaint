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



//filters
/*
var process = function(filterCallback, canvas){
  var imgData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
  var tmp = filterCallback(imgData.data);
  draw(canvas, tmp);
};



var filters = {
  inverse: function(imgData){
    var sp = imgData;
    var ll = function(vl){
      return 255 - vl;
    };
    for(var i = 0; i < imgData.length; i+=4){
      sp[i] = ll(sp[i]);
      sp[i+1] = ll(sp[i+1]);
      sp[i+2] = ll(sp[i+2]);
    }
    return sp;
  },

  noise: function(imgData){
    var sp = imgData;
    var coefficient = 0.02;
    var ll = function(vl){
      var g_VALUE = Math.random()*100;
      if(g_VALUE <= coefficient*100){
        if(Math.floor(Math.random()*25) == 2)
          return 255;
        else
          return vl;
      }
      return vl;
    };

    for(var i = 0; i < imgData.length; i+=4){
      sp[i] = ll(sp[i]);
      sp[i+1] = ll(sp[i+1]);
      sp[i+2] = ll(sp[i+2]);
    }
    return sp;
  },

  treshold: function(imgData){
    var sp = imgData;
    var ll = function(vl){
    	return vl>128?0:255;
    };
    for(var i = 0; i < imgData.length; i+=4){
      var mean = (sp[i] + sp[i+1] + sp[i+2])/3;
      sp[i] = ll(mean);
      sp[i+1] = ll(mean);
      sp[i+2] = ll(mean);
    }
    return sp;
  }
};



 $('.js-button-action').click(function(){
    var filter = $(this).data('filter');
    process(filters[filter], $('#canvas')[0]);
  });*/