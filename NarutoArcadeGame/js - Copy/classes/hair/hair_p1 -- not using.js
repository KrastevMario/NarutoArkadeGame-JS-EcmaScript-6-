class Hair_p1 extends Hair{
	constructor(attributes) {
		//default values
		super(Object.assign({
			x: player1.x, y: player1.y,
			player: "p1",
			position: player1.position,
			h: 54, w: 50,
			imageSrc_left: "images/Hair/hair0.png",
			imageSrc_right: "images/Hair/Reversed/hair0_reversed.png"
		}, attributes));
	}
	update(time){
		if(player1.position == "l"){
			this.x = player1.x - 2;
			this.y = player1.y - 14;
			this.image = this.image_left;
		}
		else{
			this.x = player1.x - 8;
			this.y = player1.y - 14;
			this.image = this.image_right;
		}
	}
	draw(time){
		super.draw(time);
	}
	stop(time){
		
	}
}