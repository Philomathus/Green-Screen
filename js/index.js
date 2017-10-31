var imgFG,
	 imgBG,
	 output;
	 
function uploadFG() {
	var canvasFG = document.getElementById("canvasObject1"),
		 fileFG = document.getElementById("fileObject1");
		 
	imgFG = new SimpleImage(fileFG);
	imgFG.drawTo(canvasFG);
}

function uploadBG() {
	var canvasBG = document.getElementById("canvasObject2"),
		 fileBG = document.getElementById("fileObject2");
		 
	imgBG = new SimpleImage(fileBG);
	imgBG.drawTo(canvasBG);
}

function checkValue() {
	if (imgFG == null || ! imgFG.complete()) {
		alert("Foreground Is Not Ready!");
	}
	if (imgBG == null || ! imgBG.complete()) {
		alert("Background Is Not Ready!");	
	}
}

function greenScreen() {
	
	checkValue();
	
	var canvasOutput = document.getElementById("canvasObject3");
	
	output = new SimpleImage(canvasOutput.width, canvasOutput.height);
	imgFG.setSize(canvasOutput.width, canvasOutput.height);
	imgBG.setSize(canvasOutput.width, canvasOutput.height);
	
	for (var pixel of imgFG.values()) {
	
		var x = pixel.getX(),
			 y = pixel.getY();
			 
		var BGpixel = imgBG.getPixel(x, y);
	
		if (pixel.getGreen() >= pixel.getRed() + pixel.getBlue()) {
			output.setPixel(x, y, BGpixel);
		} else {
			output.setPixel(x, y, pixel);		
		}
	}
	
	output.drawTo(canvasOutput);
}

function clearCanvas() {
	var canvasFG = document.getElementById("canvasObject1"),
		 canvasBG = document.getElementById("canvasObject2"),
		 canvasOutput = document.getElementById("canvasObject3"),
		 FG_ctx = canvasFG.getContext("2d"),
		 BG_ctx = canvasBG.getContext("2d"),
		 Output_ctx = canvasOutput.getContext("2d");
		 
	var fileFG = document.getElementById("fileObject1"),
		 fileBG = document.getElementById("fileObject2");
		 
	fileFG.value = null;
	fileBG.value = null;

	FG_ctx.clearRect(0, 0, canvasFG.width, canvasFG.height);
	BG_ctx.clearRect(0, 0, canvasBG.width, canvasBG.height);
	Output_ctx.clearRect(0, 0, canvasOutput.width, canvasOutput.height);
}