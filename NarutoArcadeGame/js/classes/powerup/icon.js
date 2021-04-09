class Icon{
	constructor(attributes){
		this.x = 0;this.y = 0;
		this.h = 0;this.w = 0;
		this.position = "";
		this.player = "";
		this.iconSrc = "";
		this.icon_x_p1 = 20; this.icon_y_p1 = 80; //position of icon image
		this.icon_x_p2 = 1200; this.icon_y_p2 = 80; 
		this.icon_w = 50; this.icon_h = 50;
		this.icon_draw_distance = 0;

		Object.assign(this,attributes);

		this.image =  new Image();
		this.image.src = this.iconSrc;
	}
	update(time){
		
	}
	draw(time, distance){
		if(this.player == "p1"){
			ctx.drawImage(this.image,this.icon_x_p1 + distance,this.icon_y_p1,this.icon_w,this.icon_h);
		}else if(this.player == "p2"){
			ctx.drawImage(this.image,this.icon_x_p2 - distance,this.icon_y_p2,this.icon_w,this.icon_h);
		}
	}
}