var myBox = document.getElementById("center")
var x;
var y;
var myBack = document.getElementById("background")
var myCount = 0
var scream = new Audio('/sound/scream.mp3');
function moveCamera(event){
	x = event.clientX - 300;
	y = event.clientY - 200;
	myBox.style.left = x+"px";
	myBox.style.top = y+"px";
	
}

function darkJump(){
	if(myCount <= 10){
		myBack.style.backgroundImage = "url(https://vignette.wikia.nocookie.net/vsbattles/images/a/a3/Black-windows_542931.jpg/revision/latest/scale-to-width-down/640?cb=20150317090032)";
		setTimeout("lightUp()", 1000);
		myCount += 1
	}
	else if(myCount > 10){
		myBox.style.backgroundImage = "url(http://images6.fanpop.com/image/photos/34300000/The-Exorcist-the-exorcist-34303456-500-381.gif)"
		scream.play()
		setTimeout("popUp()", 1000)
	}
}

function lightUp(){
	myBack.style.backgroundImage = "url(https://images2.alphacoders.com/801/80110.jpg)";
	setTimeout("darkJump()", 5000);
	myCount += 1
}

function popUp(){
	myBack.style.backgroundImage = "url(http://images6.fanpop.com/image/photos/34300000/The-Exorcist-the-exorcist-34303456-500-381.gif)";
	myBack.style.backgroundSize = "contain";
	scream.play()
}
lightUp();

//setInterval(function(){}, 1000)