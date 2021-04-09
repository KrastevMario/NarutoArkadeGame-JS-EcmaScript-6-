//file after classes

//global variables 

var stage = new Stage();
//to change character modify the character's name at right
var player1 = new Obito({player: "p1", x: 200});			//create object and in "menu.js" modify it
var player2 = new Madara({ player: "p2", x: 1000 });

//timer settings for player1 (left)
RedrawTimerP1 = -0;
RedrawGlobalP1 = 0;
//timer settings for player2 (right)
RedrawTimerP2 = -0;
RedrawGlobalP2 = 0;
//Animation frame
AnimationPlaying = 0;

function run(time){
	if(codes[P]){
		console.log("in");
		PAUSED = !PAUSED;
		codes[P] = false;
	}
    if (!PAUSED) {

        //stage update
        stage.update(time);
        
        //update on timer
        if (time - RedrawTimerP1 >= RedrawGlobalP1 && AnimationPlaying == 0) {
		    //player 1
            player1.update(time);
            RedrawTimerP1 = time;
        }
        if (time - RedrawTimerP2 >= RedrawGlobalP2 && AnimationPlaying == 0) {
            //player 2
            player2.update(time);
            RedrawTimerP2 = time;
        }

        //draw everything
        stage.draw(time);
        player1.draw(time);
        player2.draw(time);

        requestAnimationFrame(run);
	}
	else{
		if(WIN == "p1"){
			ctx.font="30px Comic Sans MS";
			ctx.fillStyle = "red";
			ctx.textAlign = "center";
			ctx.fillText("player 1 wins (" + player1.name + ")", canv.width/2, canv.height/2);
		}
		else if(WIN == "p2"){
			ctx.font="30px Comic Sans MS";
			ctx.fillStyle = "red";
			ctx.textAlign = "center";
			ctx.fillText("player 2 wins " + "(" + player2.name + ")", canv.width/2, canv.height/2);
		}
		else{
			ctx.font="30px Comic Sans MS";
			ctx.fillStyle = "red";
			ctx.textAlign = "center";
            ctx.fillText("The game is PAUSED", canv.width / 2, canv.height / 2);
            requestAnimationFrame(run);
		}
	}
}


                /* theory TODO
While animation is playing, don't allow character update();
*/