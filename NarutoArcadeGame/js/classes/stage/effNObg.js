class Eff extends Sprite{
	constructor(options, magics) {
		//default values
		super(Object.assign({
			imageSrc: "",
			h: 720, w: 1280
		}, options));
	}
	stop(time){
	}
	update(time){
	}
	
	draw(time){
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
	}
}