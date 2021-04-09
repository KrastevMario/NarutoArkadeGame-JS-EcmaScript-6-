//lists magic --> launchable objects
class Magic{
	constructor(attributes){
		this.x = 0;this.y = 0;
		this.h = 0;this.w = 0;
		this.dmg = 0; this.mana = 0;
		this.position = ""; this.time = 0;
		this.player = "";

		Object.assign(this,attributes);
		
		this.image =  new Image();
		this.image.src = this.imageSrc;
		
	}
	update(time){
		
	}
	draw(time){
		ctx.drawImage(this.image,this.x,this.y,this.w,this.h);
	}
	collides(B){
		return !(B.x+B.w < this.x || this.x + this.w < B.x
						||B.y+B.h < this.y || this.y + this.h < B.y);
	}
}