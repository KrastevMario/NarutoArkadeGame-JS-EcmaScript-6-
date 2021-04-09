//Red aura
class Susanoo_second_stage extends Powerup {
	constructor(options) {
		//default values
		super(Object.assign({
			x: 0, y: 0,
			w: 306, h: 374,
			vx: 8, vy: 0,
			dmg: 25, hit: 0.2, shield_active: false,
			mana_consumption: 0.1, 
			//buffs of powerup
			player_atk_multiplicator: 2,
			player_def_multiplicator: 4,
			player_speedX_multiplicator: 1,
			max_vx_multiplicator: 1,
			//end buffs
			imageSrc: "images/Powerup/susanoo_madara.png",
			ShieldSrc: "images/Powerup/amaterasu_shield.png",
			iconSrc: "images/Powerup/Icon/madara_starting_susanoo.png",
			value: "Susanoo_second_stage",
			
			meteor_mana_consumption: 30,
			meteor_cooldown: -2000
			
		}, options));
		this.image_shield = new Image();
		this.image_shield.src = this.ShieldSrc;
		
		super.check_position(20,50);
		this.declare_icon_items();

						//TODO make a variable to hold the values to remove from player X, Y
		//check who started the skill and give him buffs
		if(this.player == "p1"){
			this.x = player1.x - 134;
			this.y = player1.y - 289;
			player1.dmg *= this.player_atk_multiplicator;
			player1.def *= this.player_def_multiplicator;
			player1.vx *= this.player_speedX_multiplicator;
			player1.max_vx *= this.max_vx_multiplicator;
			this.other_player = "p2";
			this.player_powerups = player1.powerups;
			this.player_powerups_filter = player1.powerups.Filter;
			
		}
		else if(this.player == "p2"){
			this.x = player2.x - 134;
			this.y = player2.y - 289;
			player2.dmg *= this.player_atk_multiplicator;
			player2.def *= this.player_def_multiplicator;
			player2.vx *= this.player_speedX_multiplicator;
			player2.max_vx *= this.max_vx_multiplicator;
			this.other_player = "p1";
			this.player_powerups = player2.powerups;
			this.player_powerups_filter = player2.powerups.Filter;
		}
	}
	update(time){
		if(this.position == "l"){
			//change picture with left
		}
		else{
			//change picture with right
		}
		
		//check who started the skill
		if(this.player == "p1"){
			this.x = player1.x - 134;
			this.y = player1.y - 289;
			if(codes[ATTACK_P1]) this.attack_1(time);
			else this.shield_active = false;
		}
		else if(this.player == "p2"){
			this.x = player2.x - 134;
			this.y = player2.y - 289;
			if(codes[ATTACK_P2]) this.attack_1(time);
			else this.shield_active = false;
		}
	}
	draw(time){
		super.draw(time);
		if(this.shield_active) ctx.drawImage(this.image_shield,this.x,this.y,this.w,this.h);
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
	attack_1(time){
		/*
		this.mana = document.getElementById("mana_" + this.player);
		if(this.mana.value >= this.mana_consumption){
			this.shield_active = true;
			this.mana.value -= (this.mana_consumption); 
			if(this.player == "p1"){
				if(this.collides(player2)){
					this.health = document.getElementById("health_" + this.other_player);
					this.health.value -= (this.hit); 
					//the damage will be fixed and it wont be affected by the other player defense
				}
			}
			else if(this.player == "p2"){
				if(this.collides(player1)){
					this.health = document.getElementById("health_" + this.other_player);
					this.health.value -= (this.hit); 
				}
			}
			ctx.drawImage(this.image_shield,this.x,this.y,this.w,this.h);
		}
		*/
		this.mana = document.getElementById("mana_" + this.player);
		if(time - this.meteor_cooldown > 2000){
			if(this.mana.value >= this.meteor_mana_consumption){
				this.mana.value -= (this.meteor_mana_consumption); 
				if(this.player == "p1")
					player1.magics.push(new Meteor({player: this.player, x: this.x}));
				else if(this.player == "p2"){
					player2.magics.push(new Meteor({player: this.player, x: this.x}));
				}
				this.mana.value -= this.meteor_mana_consumption;
				
				this.meteor_cooldown = time;
			}
		}
	}
}