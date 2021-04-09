class Stage extends Sprite{
	constructor(options, magics) {
		//default values
		super(Object.assign({
			imageSrc: "images/Arena/arena1.png",
			h: 720, w: 1280
		}, options));
		
		//backgroud music declare
		this.bg_music = new Audio("sounds/Background/bg.mp3");
		this.bg_music.loop = true;
		this.bg_music.volume = 0.3;
		this.bg_music.play();
	}
	stop(time){
	}
	update(time){
		this.bg_music.play();
		let hp_p1 = document.getElementById("health_p1");
		let hp_p2 = document.getElementById("health_p2");
		
		if(hp_p1.value <= 0){
			WIN = "p2";
			PAUSED = true;
		}
		else if(hp_p2.value <= 0){
			WIN = "p1";
			PAUSED = true;
		}
	}
	
	draw(time){
		ShowTime(time);
		ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
	}
}