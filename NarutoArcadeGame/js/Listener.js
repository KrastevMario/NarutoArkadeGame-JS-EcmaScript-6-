//keyboard input listener

codes = new Array();

// key events
document.body.addEventListener("keydown", function (e) {
    codes[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    codes[e.keyCode] = false;
});


//KEYBOARD OPTIONS (GLOBAL VARIABLES)

	//player 1 controls
		//move
	//W = 87;
	JUMP_P1 = 87;
	//A = 65;
	LEFT_P1 = 65;
	//S = 83;
	CHAKRA_P1 = 83;
	//D = 68;
	RIGHT_P1 = 68;
		//attack
	//SPACE = 32;
	ATTACK_P1 = 32;
		//skills
	//F = 70;	//first skill
	SKILL1_P1 = 70
	//G = 71; //second skill
	SKILL2_P1 = 71; //second skill
	//E = 69; //shuriken/kunai throw
	SHURIKEN_P1 = 69; //shuriken/kunai throw
	//R = 82; //powerup
	POWERUP1_P1 = 82; //powerup
	//Q = 81; //powerupII
	POWERUP2_P1 = 81; //powerupII
	
	
	//player 2 controls
		//move
	//LEFT_ARROW = 37;
	LEFT_P2 = 37;
	//RIGHT_ARROW = 39;
	RIGHT_P2 = 39;
	//UP_ARROW = 38;
	JUMP_P2 = 38;
	//DOWN_ARROW = 40;
	CHAKRA_P2 = 40;
		//attack
	//ENTER = 13;
	ATTACK_P2 = 13;
		//skills
	//L = 76;	//first skill
	SKILL1_P2 = 76;	//first skill
	//K = 75; //second skill
	SKILL2_P2 = 75; //second skill
	//I = 73;	//shuriken
	SHURIKEN_P2 = 73;	//shuriken
	//O = 79; //buff skill (power up)
	POWERUP1_P2 = 79; //buff skill (power up)
	//U = 85; //buff skill (power up II)
	POWERUP2_P2 = 85; //buff skill (power up II)
	
	//Menu buttons
	P = 80;
	
	