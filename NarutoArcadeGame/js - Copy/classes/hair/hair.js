class Hair{
	constructor(attributes){
		this.x = 0;this.y = 0;
		this.h = 0;this.w = 0;
		this.position = "";
		this.player = "";

		Object.assign(this,attributes);

		this.image_left =  new Image();
		this.image_left.src = this.imageSrc_left;
		this.image_right =  new Image();
		this.image_right.src = this.imageSrc_right;
	}
	update(time){
		
	}
	draw(time){
		ctx.drawImage(this.image,this.x,this.y,this.w,this.h);
	}
}