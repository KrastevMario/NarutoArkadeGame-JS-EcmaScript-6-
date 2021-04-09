class Obito_hair extends Hair{
	constructor(attributes) {
		//default values
		super(Object.assign({
			player: "p2",
			h: 40, w: 42,
			imageSrc_left: "images/Hair/hair_p2_0.png",
			imageSrc_right: "images/Hair/Reversed/hair_p2_0_reversed.png"
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
			this.x = this.px - 2;
			this.y = this.py + 0;
			this.image = this.image_left;
		}
		else{
			this.x = this.px;
			this.y = this.py - 2;
			this.image = this.image_right;
		}
	}
	draw(time){
		super.draw(time);
	}
	stop(time){
		
	}
}