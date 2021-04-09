class Fireball extends Magic {
	constructor(options) {
		//default values
		super(Object.assign({
			x: 0, y: 0,
			w: 56, h: 37,
			vx: 8, vy: 0,
			dmg: 20, dmg_multiplier: 1.5,
			imageSrc: "images/Magic/fireball/fireball.png"
		}, options));
		if(this.position == "l") this.x -= 50;
		else if(this.position == "r") this.x += 20;
		
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
		if(this.position == "l"){
			this.x -= this.vx;
		}
		else{
			this.x += this.vx;
		}
		
		//reduce hp on hit
		if(this.collides(this.player_hit)){
			let health = document.getElementById("health_" + this.other_player);
			health.value -= (this.dmg - this.player_def); 
		}
	}
}