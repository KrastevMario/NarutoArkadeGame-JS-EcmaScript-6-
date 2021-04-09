
var canv=document.getElementById('stage');
var ctx = canv.getContext('2d');//Si scrive così per forza

//GLOBAL VAIABLES
FLOOR = 441; //variable to say where is the floor on the map
PAUSED = false; //pause the game
WIN = "";

//declare frames
var player1Sprites = new Array(74);
for(var i = 0; i <= 74; i++){
	player1Sprites[i] = new Image();
	player1Sprites[i].src = "images/player" + i + ".svg";
}
//end declare

var timerDiv;
function ShowTime(time){
	if (!timerDiv) timerDiv = document.getElementById("timer");
	var sec = Math.trunc(time /1000);
	var mil = Math.trunc(time % 1000).toString().padStart(3, '0');
	timerDiv.innerHTML= `${sec}:${mil}`;
}
