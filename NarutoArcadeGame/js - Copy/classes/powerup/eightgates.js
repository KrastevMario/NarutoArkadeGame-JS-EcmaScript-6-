//Red aura
class Eightgates extends Powerup {
	constructor(options) {
		//default values
		super(Object.assign({
			x: 0, y: 0,
			w: 76, h: 137,
			vx: 8, vy: 0,
			dmg: 25,
			//buffs of powerup
			player_atk_multiplicator: 2,
			player_def_multiplicator: 1.5,
			player_speedX_multiplicator: 3,
			max_vx_multiplicator: 1.6,
			//end buffs
			imageSrc: "images/Powerup/gates_aura_0.png",
			iconSrc: "images/Powerup/Icon/eightgates.png",
			value: "eightgates"
		}, options));
		
		super.check_position(20,50);	//function(position of center -x, position at center -y)
		
		this.declare_icon_items();
		
		//check who started the skill and give him buffs
		if(this.player == "p1"){
			this.x = player1.x - 18;
			this.y = player1.y - 35;
			player1.dmg *= this.player_atk_multiplicator;
			player1.def *= this.player_def_multiplicator;
			player1.vx *= this.player_speedX_multiplicator;
			player1.max_vx *= this.max_vx_multiplicator;
			this.other_player = "p2";
			this.player_powerups = player1.powerups;
			this.player_powerups_filter = player1.powerups.Filter;
			
		}
		else if(this.player == "p2"){
			this.x = player2.x - 18;
			this.y = player2.y - 35;
			player2.dmg *= this.player_atk_multiplicator;
			player2.def *= this.player_def_multiplicator;
			player2.vx *= this.player_speedX_multiplicator;
			player2.max_vx *= this.max_vx_multiplicator;
			this.other_player = "p1";
			this.player_powerups = player2.powerups;
			this.player_powerups_filter = player2.powerups.Filter;
		}
	}
	update(){
		if(this.position == "l"){
			//change picture with left
		}
		else{
			//change picture with right
		}
		
		//check who started the skill
		if(this.player == "p1"){
			this.x = player1.x - 18;
			this.y = player1.y - 35;
		}
		else if(this.player == "p2"){
			this.x = player2.x - 18;
			this.y = player2.y - 35;
		}
	}
	deactivate(){
		//check who started the skill
		let that = this;
		
		if(this.player == "p1"){
			player1.dmg /= this.player_atk_multiplicator;
			player1.def /= this.player_def_multiplicator;
			player1.vx /= this.player_speedX_multiplicator;
			player1.max_vx /= this.max_vx_multiplicator;
			player1.powerups = player1.powerups.Filter(function(B){
				return B.value != that.value;
			});
		}
		else if(this.player == "p2"){
			player2.dmg /= this.player_atk_multiplicator;
			player2.def /= this.player_def_multiplicator;
			player2.vx /= this.player_speedX_multiplicator;
			player2.max_vx /= this.max_vx_multiplicator;
			player2.powerups = player2.powerups.Filter(function(B){
				return B.value != that.value;
			});
		}

	}
}