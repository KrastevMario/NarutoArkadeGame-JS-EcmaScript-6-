class Obito extends Player{
	constructor(attributes, magics) {
		//default values
		super(Object.assign({
			name: "Obito",
			x: 1000,
			h: 74, w: 40,
			imageSrc: "images/player0.svg",
			player: "p2",
			mana: 100,		//the max mana + spawn mana
			health: 100,
			dmg: 5,
			def: 1.5,
			
			//mana consumption
			powerup1_consumption: 5,
			powerup2_consumption: 5,
			magic1_consumption: 5,
			magic2_consumption: 0.5
		}, attributes));
		super.declare_name();
		//create the character's hair
		this.hair_p2 = new Obito_hair({player: this.player});

		//the cooldown of the skills --> put it on the max at first so the user can immediately use that skill
		this.magic1_cooldown = -3000;
		
		//mana consumption 
		this.powerup1_mp = 25;
	}
	update(time){
		
		super.jump(time);
		super.update(time);
		super.movements(time, this.player);
		
		//hair player 2
		this.hair_p2.update(time);
		
	}
	draw(time){
		super.draw(time);
		this.hair_p2.draw(time);
		this.powerups.visit(function(x){x.draw(time)});
	}
	stop(time){
		
	}
	useMagic1(time){
		if(this.mana.value > this.magic1_consumption){
			if(time - this.magic1_cooldown > 3000){
				this.magics.push(new Fireball({
					player_main: this,
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
		if(this.mana.value > this.magic2_consumption){
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
	usePowerup1(time){
		if(this.mana.value > this.powerup1_consumption){
			if(!this.powerup1_active){
                this.powerups.push(new ThreeTomoeSharingan({
					//player: this,
					x: this.x,
					y: this.y,
					position: this.position,
                    player: this.player,
				}));
				this.powerup1_active = true;
				this.mana.value -= this.powerup1_consumption;
			}
			else{
				this.powerup1_active = false;
				this.powerups.visit(function(x){
                    if (x.value == "Sharingan3Tomoe") x.deactivate()
				});
			}
		}
	}
	usePowerup2(time){
		if(this.mana.value > this.powerup2_consumption){
			if(!this.powerup2_active){
				this.powerups.push(new Susanoo_first_stage({
					//player: this,
					x: this.x,
					y: this.y,
					position: this.position,
					player: this.player
				}));
				this.powerup2_active = true;
				this.mana.value -= this.powerup2_consumption;
			}
			else{
				this.powerup2_active = false;
				this.powerups.visit(function(x){
					if(x.value == "Susanoo_first_stage") x.deactivate()
				});
			}
		}
	}
}