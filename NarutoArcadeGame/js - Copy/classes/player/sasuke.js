class Sasuke extends Player{
	constructor(attributes, magics) {
		//default values
		super(Object.assign({
			name: "Sasuke",
			x: 200,
			h: 74, w: 40,
			imageSrc: "images/player0.svg",
			player: "p1",
			mana: 100,		//the max mana + spawn mana
			health: 200,
			dmg: 15,
			def: 4,
			
			
			//mana consumption
			magic1_consumption: 5,
			magic2_consumption: 1
		}, attributes), magics);
		
		super.declare_name();
		
		//create the character's hair
		this.hair_p1 = new Sasuke_hair({player: this.player});
		
		//the cooldown of the skills --> put it on the max at first so the user can immediately use that skill
		this.magic1_cooldown = -3000;
		
		//mana consumption 
		this.magic1_mp = 25;
		this.magic2_mp = 3;
		this.powerup1_mp = 5;
		
	}
	update(time){
		super.jump(time);
		super.update(time);
		super.movements(time, this.player);
		
		//hair player 1	
		this.hair_p1.update(time);
		
	}
	draw(time){
		super.draw(time);
		this.hair_p1.draw(time);
		this.powerups.visit(function(x){x.draw(time)});	//it will draw after the hair (so the hair wont be buggy)
	}
	stop(time){
		
	}
	
	useMagic1(time){
		if(this.mana.value > this.magic1_mp){
			if(time - this.magic1_cooldown > 3000){
				this.magics.push(new Fireball({
					//player: this,
					x: this.x,
					y: this.y + 10,
					position: this.position,
					player: this.player
				}));
				
				this.mana.value -= this.magic1_consumption;
				
				this.magic1_cooldown = time;
			}
		}
	}
	useMagic2(time){
		if(this.mana.value > this.magic2_mp){
			this.magics.push(new Cloud({
				magics: this,
				x: this.x,
				y: this.y + 10,
				position: this.position,
				player: this.player
			}));
			
			this.mana.value -= this.magic2_consumption;
		}
	}
	useShuriken(time){
		if(time - this.shuriken_cooldown > 2000){
			if(this.position == "r"){
				this.image = player1Sprites[33];
			}
			else if(this.position == "l"){
				this.image = player1Sprites[38];
			}
			
			this.magics.push(new Shuriken({
				player_main: this,
				x: this.x,
				y: this.y + 25,
				position: this.position,
				player: this.player
			}));
			
			this.shuriken_cooldown = time;
		}
		//image after shuriken
		if(time - this.shuriken_cooldown > 200 && this.position == "r"){
			this.image = player1Sprites[26];
		}
		else if(time - this.shuriken_cooldown > 200 && this.position == "l"){
			this.image = player1Sprites[36];
		}
	}
	
	usePowerup1(time){	//susanoo create skill
		if(!this.powerup1_active){
			if(this.mana.value > this.powerup1_mp){
				this.powerups.push(new Susanoo_first_stage({
					//player: this,
					x: this.x,
					y: this.y,
					position: this.position,
					player: this.player
				}));
				this.powerup1_active = true;
				this.mana.value -= this.magic1_consumption;
			}
		}
		else{
			this.powerup1_active = false;
			this.powerups.visit(function(x){
				if(x.value == "Susanoo_first_stage") x.deactivate()
			});
		}
	}
}