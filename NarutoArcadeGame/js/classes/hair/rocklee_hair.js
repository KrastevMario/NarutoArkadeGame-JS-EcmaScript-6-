class Rocklee_hair extends Hair{
	constructor(attributes) {
		//default values
		super(Object.assign({
			player: "p1",
			h: 45, w: 50,
			imageSrc_left: "images/Hair/rocklee_hair.png",
			imageSrc_right: "images/Hair/Reversed/rocklee_hair_reversed.png"
		}, attributes));
	}
	update(time){
		
		//check which player have this hair
		if(this.player == "p1"){
			this.px = player1.x;
			this.py = player1.y;
		}
		else if(this.player == "p2"){
			this.px = player2.x;
			this.py = player2.y;
		}
		if(this.player == "p1"){
			this.x = this.px;
			this.y = this.py;
			this.position = player1.position;
		}
		else if(this.player == "p2"){
			this.x = this.px;
			this.y = this.py;
			this.position = player2.position;
		}
		//change the hair position
		if(this.position == "l"){
			this.x = this.px - 5;
			this.y = this.py - 13;
			this.image = this.image_left;
		}
		else{
			this.x = this.px - 4;
			this.y = this.py - 13;
			this.image = this.image_right;
		}
	}
	draw(time){
		super.draw(time);
	}
	stop(time){
		
	}
}