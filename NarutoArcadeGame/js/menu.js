
PAUSED = true;

alert("welcome to Naruto Arcade Game, please choose your map and character");

var pl = 1;
var arena = prompt("insert the map (1/2/3/4)");

//map/arena
if(arena == 1){
	stage.image.src = "images/Arena/arena1.png";
	stage.bg_music = new Audio("sounds/Background/bg.mp3");
	PAUSED = false;
}
else if(arena == 2){
	stage.image.src = "images/Arena/arena2.png";
	stage.bg_music = new Audio("sounds/Background/bg.mp3");
}
else if(arena == 3){
	stage.image.src = "images/Arena/arena3.png";
	stage.bg_music = new Audio("sounds/Background/bg.mp3");
}
else if(arena == 4){
	stage.image.src = "images/Arena/arena4.png";
	stage.bg_music = new Audio("sounds/Background/bg.mp3");
}
//player check (if player 1 or player 2)					TODO shortcut this code
for(var i = 1; i < 3; i++){
	var character = prompt("insert character (player " + i + ") \n 1 -> sasuke \n 2 -> obito \n 3 -> madara \n 4 -> Rock Lee\n");
	if(character == 1){
		if(i == 1) player1 = new Sasuke({player: "p1", x: 200});
		else if(i == 2) player2 = new Sasuke({player: "p2", x: 1000});
	}
	else if(character == 2){
		if(i == 1) player1 = new Obito({player: "p1", x: 200});
		else if(i == 2) player2 = new Obito({player: "p2", x: 1000});
	}
	else if(character == 3){
		if(i == 1) player1 = new Madara({player: "p1", x: 200});
		else if(i == 2) player2 = new Madara({player: "p2", x: 1000});
	}
	else if(character == 4){
		if(i == 1) player1 = new Rocklee({player: "p1", x: 200});
		else if(i == 2) player2 = new Rocklee({player: "p2", x: 1000});
	}
}
PAUSED = false;

run(0);