class Shuriken extends Magic {
	constructor(options) {
		//default values
		super(Object.assign({
			x: 0, y: 0,
			w: 37, h: 37,
			vx: 10, vy: 0,
			dmg: 5,
			imageSrc: "images/Magic/shuriken/shuriken0.gif",
			imageAlt: "images/Magic/shuriken/shuriken1.gif",
			
			time_changeImg: 0
		}, options));
		if(this.position == "l") this.x -= 50;
		else if(this.position == "r") this.x += 20;
		
		this.imageNew = new Image();
		this.imageNew.src = this.imageAlt;

	}
	update(time){
		
		if(time - this.time_changeImg > 50){
			[this.image, this.imageNew] = [this.imageNew, this.image];
			this.time_changeImg = time;
		}

		if(this.position == "l"){
			this.x -= this.vx;
		}
		else{
			this.x += this.vx;
		}
		
		//check who started the skill
		if(this.player == "p1"){
			var player_hit = player2;
			var player_def = player2.def;
			var other_player = "p2";
		}
		else if(this.player == "p2"){
			var player_hit = player1;
			var player_def = player1.def;
			var other_player = "p1";
		}
		
		//reduce hp on hit
		if(this.collides(player_hit)){
			let health = document.getElementById("health_" + other_player);
			if(this.dmg > player_def) health.value -= (this.dmg - player_def); 
		}
	}
}