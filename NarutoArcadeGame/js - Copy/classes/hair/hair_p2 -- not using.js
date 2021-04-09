class Hair_p2 extends Hair{
	constructor(attributes) {
		//default values
		super(Object.assign({
			x: player1.x, y: player1.y,
			position: player1.position,
			h: 40, w: 42,
			imageSrc_left: "images/Hair/hair_p2_0.png",
			imageSrc_right: "images/Hair/Reversed/hair_p2_0_reversed.png"
		}, attributes));
	}
	update(time){
		if(player2.position == "l"){
			this.x = player2.x - 2;
			this.y = player2.y + 0;
			this.image = this.image_left;
		}
		else{
			this.x = player2.x ;
			this.y = player2.y - 2;
			this.image = this.image_right;
		}
	}
	draw(time){
		super.draw(time);
	}
	stop(time){
		
	}
}