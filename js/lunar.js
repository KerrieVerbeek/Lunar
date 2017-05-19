//alert("Hellooooo!");

//vars for all images used in game 

var gameArea = document.getElementById('myGameArea');

var gameRect = gameArea.getBoundingClientRect();  //tells program the size of the div

var gameAreaHeight = Math.round(gameRect.bottom - gameRect.top); //tell program hiehg tof div

var gameAreaWidth = Math.round(gameRect.right - gameRect.left); //tells program width of div

//alert("Game Area Width is " + gameAreaWidth + " and game Area Height is " + gameAreaHeight);

var landerImage = document.getElementById('lander');
landerImage.style.position = "absolute";  //makes it to it is always in line (same as with rest of the position absoulute comands)
landerImage.style.zIndex = "2"; // makes the image go to the front (higher number = in front)

var targetImage = document.getElementById('target');
targetImage.style.position = "absolute";
targetImage.style.zIndex = "1";

var flameImage = document.getElementById('flame');
flameImage.style.position = "absolute";
flameImage.style.zIndex = "0"; 
flameImage.style.display = "none";

var buLanderImage = document.getElementById('buLander');
buLanderImage.style.position = "absolute";
buLanderImage.style.zIndex = "0";
buLanderImage.style.display = "none";

var moonImage = document.getElementById("theMoon");
moonImage.style.zIndex = "0"; 
moonImage.style.bottom = "0";
moonImage.style.left = "0";
moonImage.style.right = "0";
moonImage.style.top = "0";
moonImage.style.width = "100%";


// 

var landerX = 0; //(x coordinate of lander)
var landerY = 0; //(y coordinate of lander)
var landerDX = 0; //change in x (velocity X)
var landerDY = 0; // change in y (velocity Y)
var landerWidth = 110; 

var targetX = 0; 
var targetY = 0;
var crashed = false;
var moving = false; 
var id;


//for the flame

var flameX;
var flameY;


// did hit target??

function checkForWin() {

	var didIWin = false;

	if ( Mat.abs(landerX - targetX) < 10) {

		if(targetY - (landerY + 80) , 10) {

			if( Math.abs(landerDY < 5)) {

				didIWin = true; 
			}
		}

	}


	return didIWin; 

}



function setFlamePosition() {

	flameX = landerX + 40;
	flameY = landerY + 80;
	flameImage.style.top = flameY + 'px';
	flameImage.style.left = flameX + 'px';
}



function showFlame() {

	flameImage.style.display = "block";

}



function hideFlame() {

	flameImage.style.display = "none";

}


function setLanderAndTarget() { //resets everything 

	crashed = false;
	landerImage.style.display = "block";
	buLanderImage.style.display = "none";

	landerY = 0;
	landerX = Math.round(gameAreaWidth/2);
	landerDY = 6;
	landerImage.style.left = landerX + 'px'; 
	landerImage.style.top = landerY + 'px'; 
	setFlamePosition(); // to move flame




	//code to set the target 
	targetY = gameAreaHeight -40;
	targetX = Math.round(Math.random() * (gameAreaWidth - landerWidth));

	targetImage.style.left = targetX + 'px';
	targetImage.style.top = targetY + 'px'; 

}



 function resetAnimation() {
 	clearInterval(id);
 	landerDY = 0;
 	setLanderAndTarget(); 


 }

function startAnimation() {
	id = setInterval(frame, 40);
	landerDY = 6; 
	moving = true;
}

function showFlame() {

	flameImage.style.display = "block";
}

function hideFlame() {
	flameImage.style.display = "none";
}



function moveLander() {


	//move

	if(moving === true) {


	if(moving === true) {
	landerX = landerX + landerDX;
	landerY = landerY + landerDY;
	//added to accelerate the decent
	landerDY += 1;

	//this checks the x location

	if( landerX <= 0 && landerDX < 0) {
		lander = 0; 
		landerDX = 0;
	}

	if ( landerX > gameAreaWidth - landerWidth && landerDX > 0) {
		landerX = gameAreaWidth - landerWidth;
		landerDX = 0;
	}

	//this checks the y location
	if(landerY >= gameAreaHeight - landerWidth) {
		landerY = gameAreaHeight - landerWidth; 

		if(landerDY > 2) {
			crashed = true;
			landerDX = 0;
		}


		landerDY = 0; 
		landerDX = 0;

	}


	if(crashed === false) {

			// draw
	console.log("Hi landerX and Y are " + landerX + ", " + landerY);

	landerImage.style.left = landerX + 'px'; //(left = x value)
	landerImage.style.top = landerY + 'px';
	setFlamePosition(); // to move flame


	} else {
		moving = false;
		landerImage.style.display = "none"; 
		hideFlame();
		buLanderImage.style.left = landerX + 'px';
		buLanderImage.style.top = landerY + 'px';
		buLanderImage.style.display = "block"; 
	}
} else {
	moving = false;
	alert("YAY YOU WON!!");
}
}
}

function frame() {
	//console.log("hi from frame");
	moveLander(); 
}



setLanderAndTarget(); 

//temporary test of flame 

//showFlame();

document.getElementById('reset').onclick = resetAnimation;
document.getElementById('start').onclick = startAnimation;

//anonymous function 
document.onkeydown = function(e) {

	//alert("hi you pressed the key with code" + e.keyCode)
	//key codes:
	//38 = up
	//40 = down 
	//39 = right
	//37 = left
	//32 is the space bar


	//protections 
	//if([32, 37, 38, 39, 40].indextOf(e.keyCode) > -1) {
	//	e.preventDefault();
	//}

	switch(e.keyCode) {

		case 32: 
			//alert("Pushing the spacebar");


		break;


		//left 
		case 37:
			//alert("Pushing the left arrow");

			landerDX += -1; 
			showFlame();

		break; 


		//up 
		case 38: 
			//alert("Pushing the up arrow");
			landerDY -= 16;
			showFlame();

		break;


		//right
		case 39: 
			//alert("Pushing right arrow");

			landerDX += 1;
			showFlame();

		break;


		//down
		case 40: 
			//alert("Pushing the down arrow");

		break;


	}
};

//on Key up
//Another annonymous function
document.onKey = function(e) {

	switch(e.keyCode){

		case 32: 
			//spacebar


		break;

		case 37: 
			//left arrow

			//landerDX = 0;
			hideFlame();


		break;
		
		case 38: 
			//up arrow

		break;


		case 39: 
			//right arrow

			//landerDX = 0;
			hideFlame();


		break;

	
		case 40: 
			//down arrow

		break;
	

	

	}

};



