class Sprite{
	constructor(options, magics){
		//default value
		this.x = 0;this.y = 0;
		this.h = 0;this.w = 0;
		this.vx = 0;this.vy = 0;
		this.imageSrc = "";
		//Custom value
		Object.assign(this,options);
		//Sprite initialization
		this.image =  new Image();
		this.image.src = this.imageSrc;
        this.arenaEffectBG = new List();
        this.arenaEffects = new List();
	}
	update(time){
		this.x += this.vx;
		this.y += this.vy;
	}
	draw(time){
		ctx.drawImage(this.image,this.x,this.y,this.w,this.h);
	}
	
	collides(B){
		return !(B.x+B.w < this.x || this.x + this.w < B.x
						||B.y+B.h < this.y || this.y + this.h < B.y);
	}
	stop(time){
		
	}
}