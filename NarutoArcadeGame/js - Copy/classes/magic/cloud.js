class Cloud extends Magic {
	constructor(options) {
		//default values
		super(Object.assign({
			x: 0, y: 0,
			w: 56, h: 37,
			vx: 8, vy: 0,
			dmg: 1, dmg_multiplier: 1.5,
			imageSrc: "images/Magic/fireball/fireball.png"
		}, options));
		if(this.position == "l") this.x -= 50;
		else if(this.position == "r") this.x += 20;
		
		this.starter_w = this.w;
		
		//check who started the skill
		if(this.player == "p1"){
			this.player_hit = player2;
			this.dmg = player2.dmg + this.dmg;
			this.player_def = player2.def;
			this.other_player = "p2";
		}
		else if(this.player == "p2"){
			this.player_hit = player1;
			this.player_def = player1.def;
			this.other_player = "p1";
		}
	}
	update(){
		if(this.player == "p1"){
			player1.magics = player1.magics.Filter(function(B){
				if(B.w < B.starter_w + 200){
					codes[LEFT_P1] = codes[RIGHT_P1] = false;	//make commands unable for player 1 (moving)
					return true;
				}
				else{
					return false;
				}
			});
		}
		else if(this.player == "p2"){
			player2.magics = player2.magics.Filter(function(B){
				if(B.w < B.starter_w + 200){
					codes[LEFT_P2] = codes[RIGHT_P2] = false; //make commands unable for player 2 (moving)
					return true;
				}
				else{
					return false;
				}
			});
		}
		
		if(this.position == "l"){
			if(this.w < this.starter_w + 200) {
				this.w += this.vx;
				this.x -= this.vx;
			}
		}
		else{
			if(this.w < this.starter_w + 200) {
				this.w += this.vx;
			}
		}
		
		//reduce hp on hit
		if(this.collides(this.player_hit)){
			if(this.player_def < this.dmg){
				this.health = document.getElementById("health_" + this.other_player);
				this.health.value -= (this.dmg / this.dmg); //remove 1 hp from health if you have higher attack then the opponent defense
			}
		}
	}
}
