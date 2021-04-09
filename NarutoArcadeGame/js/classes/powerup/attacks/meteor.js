class Meteor extends Magic{
	constructor(options){
		super(Object.assign({
			x: 0, y: 0,
			w: 250, h: 250,
			vx: 8, vy: 0,
			position: "", player: "",
			dmg: 20, dmg_multiplier: 1.5,
			imageExplosionLink: "images/Magic/meteor/explosion.png",
			imageSrc: "images/Magic/meteor/meteor.png",
			
			explosion_time_on_stage: 2000
		}, options));

		this.image =  new Image();
		this.image.src = this.imageSrc;

		if(this.player == "p1"){
			if(player1.position == "l")
				this.x = this.x + 10 - this.w/1.2;
			else
				this.x = this.x - 10 + this.w/1.2;
			
		}else if(this.player == "p2"){
			if(player2.position == "l")
				this.x = this.x + 10 - this.w/1.2;
			else
				this.x = this.x - 10 + this.w/1.2;
		}
		
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
	update(time){
		this.y += 2;
		if(this.x > 1200) this.x = 1200 - this.w/2;
		if(this.x < 0) this.x = 0 + this.w/2;
		
		if(this.y == FLOOR){
			//this.getExplosionEffect();
		}
		
		//reduce hp on hit
		if(this.collides(this.player_hit)){
			let health = document.getElementById("health_" + this.other_player);
			health.value -= (this.dmg - this.player_def); 
			
		}
	}
	draw(time, distance){
		ctx.drawImage(this.image,this.x,this.y,this.w,this.h);
		//drawExplosionEffect(time);
	}
	getExplosionEffect(){
		this.imageExplosion =  new Image();
		this.imageExplosion.src = this.imageExplosionLink;

	}
	drawExplosionEffect(){
		
	}
}