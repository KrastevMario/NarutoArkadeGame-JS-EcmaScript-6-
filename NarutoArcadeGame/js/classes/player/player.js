class Player{
	constructor(attributes){
		this.x = 0;this.y = FLOOR;
		this.h = 54;this.w = 30;
		this.vx = 0;this.vy = 1;
		this.max_vx = 2;
		this.def = 10; this.dodge = 10;
		this.time = 0;
		this.jumping = "false";
		this.position = "r";
		this.hp = 100; this.mp = 100;
		this.imageSrc = "";
		this.mp_regenerate = 3;
		this.mp_regenerate_cooldown = 1000;
		this.time_atk = 0;
		this.dmgTaken = 0;
		this.icon_draw_distance = 0;
		this.gravity = 2;
		this.gravity_pos = "up";
		this.jumping = false;
		this.dmg = 25;
		this.hair_imageSrc_right = "";
		this.hair_imageSrc_left = "";
		this.frameLP = 12; this.frameRP = 1; //left | right frames
		this.player = "";
		this.name = "";
		this.mana = 100;
		this.health = 100;
		this.allow_jump = true;
		
		//magics cooldown
		this.magic1_cooldown = 0;
		this.shuriken_cooldown = -2000;
		
		//sound effects
					//hit sound declare
			this.hit_sound = new Audio("sounds/Hit/hit.mp3");
			this.hit_sound.volume = 0.4;

		Object.assign(this,attributes);

		this.image =  new Image();
		this.image.src = this.imageSrc;

		// let that = this;
		// this.magics = magics;
		// magics.forEach(function(magic) {
			// magic.setPlayer(that);
		// });
		this.magics = new List();
		this.powerups = new List();
		
		//put the name in html
		document.getElementById(this.player + "_name").innerHTML = this.name;
		
		//change the values of the bars
					//mana
		document.getElementById("mana_" + this.player).value = this.mana;
		document.getElementById("mana_" + this.player).max = this.mana;
		this.mana = document.getElementById("mana_" + this.player);
					//health
		document.getElementById("health_" + this.player).value = this.health;
		document.getElementById("health_" + this.player).max = this.health;
		this.health = document.getElementById("health_" + this.player);
	}
	update(time){
		this.magics.visit(function(x){x.update(time)});
		this.powerups.visit(function(x){x.update(time)});

		this.check_collisions_magics();
		
		//out of arena filter
		this.y += this.gravity;
		if(this.y > FLOOR){
			this.y = FLOOR;
			this.gravity_pos = "up";
			this.vy = 8;
			this.jumping = false;
		}
		if(this.x < 0) this.x = 0;
		if(this.y < 0) this.y = 0;
		if(this.x > 1240) this.x = 1240;
		
		this.mana_regenerate(time);
	}
	
	mana_regenerate(time){
		if(time - this.mp_regenerate_cooldown > 1000){
			document.getElementById("mana_" + this.player).value += this.mp_regenerate;
			this.mp_regenerate_cooldown = time;
		}
	}
	
	declare_name(){
		//put the name in html
		document.getElementById(this.player + "_name").innerHTML = this.name;
	}
	
	check_collisions_magics(){
		//if out from arena
		this.magics = this.magics.Filter(function(B){
			return B.x < 1280;
		});
		this.magics = this.magics.Filter(function(B){
			return B.x > 0;
		});
		this.magics = this.magics.Filter(function(B){
			return B.y < 1000;
		});
		//remove the list on hit
		let that = this;
		this.magics = this.magics.Filter(function(x){
			let result = true;
			if(that.player == "p1"){
				if (player2.collides(x)){
					result = false;
				}
			}
			else if(that.player == "p2"){
				if(player1.collides(x)){
					result = false;
				}
			}
		return result;
		});
		//end remove (i suppose it is understandable what i did)
	}
	//movements
	move_left(time){
		this.position = "l";
		this.speeding(time);
		this.x -= this.vx;
		this.image = player1Sprites[this.frameLP];
		this.frameLP++;
		if(this.frameLP == 22){
			this.frameLP = 12;
		}
	}
	move_right(time){
		this.position = "r";
		this.speeding(time);
		this.x += this.vx;
		this.image = player1Sprites[this.frameRP];
		this.frameRP++;
		if(this.frameRP == 12){
			this.frameRP = 1;
		}
	}
	jump(time){
		if(this.jumping == true){
			this.speeding(time);
			this.vy *= .96; //change this if you want to change the jump height 
			this.y -= this.vy;
		}
	}
	movements(time, player){
		if(player == "p2"){
			//move
			if(!codes[ATTACK_P2]){	//if player is not attacking
									//[left arrow]
				if(codes[LEFT_P2]){
					this.move_left(time);
				}
									//[right arrow]
				else if(codes[RIGHT_P2]){
					this.move_right(time);
				}

				
									//[up arrow]
				if(codes[JUMP_P2] && this.allow_jump){
					if(this.jumping == false){
						this.jumping = true;
						this.gravity_pos = "up";
					}
				}
					
				if(codes[SKILL1_P2]){
					this.useMagic1(time);
				}
				if(codes[SKILL2_P2]){
					this.useMagic2(time);
				}
				
				if(codes[SHURIKEN_P2]){
					this.useShuriken(time);
				}
				
				if(codes[POWERUP1_P2]){
					this.usePowerup1(time);
					codes[POWERUP1_P2] = !codes[POWERUP1_P2];
				}
				
				if(codes[POWERUP2_P2]){
					this.usePowerup2(time);
					codes[POWERUP2_P2] = !codes[POWERUP2_P2];
				}
			}
								//hit [ENTER]
			if(codes[ATTACK_P2]){
				this.vx *= 0.92;
				//check the position of the player
				if(this.position == "r") this.x += this.vx;
				else this.x -= this.vx;
				//hit
				this.hit(time, 2);
			}
			
						//if buttons released reset speed
			if(!codes[RIGHT_P2] && !codes[LEFT_P2] && !codes[ATTACK_P2] && !codes[SHURIKEN_P2]){
				this.reset_speed(time);
			}
			
			//end move
		}
		else if(player == "p1"){
			//move
			if(!codes[ATTACK_P1]){
								//[A]
				if(codes[LEFT_P1]){
					this.move_left(time);
				}
									//[D]
				else if(codes[RIGHT_P1]){
					this.move_right(time);
				}
									//[W]
				if(codes[JUMP_P1] && this.allow_jump){
					if(this.jumping == false){
						this.jumping = true;
						this.gravity_pos = "up";
					}
				}
									//hit [SPACE]
					
				if(codes[SKILL1_P1]){
					this.useMagic1(time);
				}
				if(codes[SKILL2_P1]){
					this.useMagic2(time);
				}
				if(codes[POWERUP1_P1]){
					this.usePowerup1(time);
					codes[POWERUP1_P1] = !codes[POWERUP1_P1];
				}
				if(codes[POWERUP2_P1]){
					this.usePowerup2(time);
					codes[POWERUP2_P1] = !codes[POWERUP2_P1];
				}
				if(codes[SHURIKEN_P1]){
					this.useShuriken(time);
				}
			}
			//end move
			if(codes[ATTACK_P1]){
				this.vx *= 0.92;
				//check the position of the player
				if(this.position == "r") this.x += this.vx;
				else this.x -= this.vx;
				
				//use hit
				this.hit(time, 1);
			}
			//if buttons released reset speed
			if(!codes[LEFT_P1] && !codes[RIGHT_P1] && !codes[ATTACK_P1] && !codes[SHURIKEN_P1]){
				this.reset_speed(time);
			}
		}
	}
	reset_speed(time){
		this.image = player1Sprites[0];
		this.vx = 0;
	}
	//end move

	useMagic1() {
		
	}
	useMagic2() {
		
	}
	usePowerup1() {
		
	}
	usePowerup2() {
		
	}
	useShuriken(){
		
	}
	
	//hit
	hit(time, player){
		//if attack is not on cooldown (if the last attack was used more than 1 second ago --> hit again
		if(time - this.time_atk > 1000){
			
			//variables to globally use with 2 players (default for an arcade game)
			if(player == 1){		//if player 1 calls HIT, then use player 1 variables
				var pl = player1;	//if you want to create more characters than 2 at the same time in the arena, create variables, modify the variables and add some statements
				var p2 = player2;
				var h1 = 1;
				var h2 = 2;
				
				var p2x = player2.x;
				var p2d = player2.def;
			}
			else if(player == 2){			//else player 2 called HIT so we use player 2 variables (for hit)
				var pl = player2;
				var p2 = player1;
				var h1 = 2;
				var h2 = 1;
				
				var p2x = player1.x;
				var p2d = player1.def;
			}
			if(this.position == "r"){
				this.image = player1Sprites[33];
				
				if(this.x < p2x){		//if you are not with your back against the opponent
                    if (this.collidesHit(p2)){
						//reduce hp
						let health = document.getElementById("health_p" + h2);
						if(this.dmg > p2d) health.value -= (this.dmg - p2d); 
						this.hit_sound.play();
					}
				}
			}
			else if(this.position == "l"){
				this.image = player1Sprites[41];
				
				if(this.x > p2x){
                    if (this.collidesHit(p2)){
						//reduce hp
						let health = document.getElementById("health_p" + h2);
						if(this.dmg > p2d) health.value -= (this.dmg - p2d); 
						this.hit_sound.play();
					}
				}
			}
			this.time_atk = time;
		}
		//image after attack
		if(time - this.time_atk > 200 && this.position == "r"){
			this.image = player1Sprites[26];
		}
		else if(time - this.time_atk > 200 && this.position == "l"){
			this.image = player1Sprites[36];
		}
	}
	//end hit
	
	
	draw(time){
		ctx.drawImage(this.image,this.x,this.y,this.w,this.h);
		//ctx.strokeRect(this.x, this.y, this.w, this.h);	//remove this comment to see the SIZE of each player
		
		this.magics.visit(function(x){x.draw(time)});
		this.icon_draw_distance = 0;
		let that = this;
		this.powerups.visit(function(x){
			x.icon_draw_distance = that.icon_draw_distance;
			that.icon_draw_distance += 60;
			x.draw(time);
		});
	}
	
	speeding(time){
		if(this.jumping == true && this.vx > this.max_vx / 1.6) this.vx = this.max_vx / 1.6;		//control the speed in air
		if(this.position == "r"){	//position
			if(this.jumping == true && this.vx < this.max_vx / 1.6) this.vx += 0.2;	//if in air, max speed 
			else if(this.jumping == false && this.vx < this.max_vx) this.vx += 0.2;	//if at ground max speed 
		}
		if(this.position == "l"){
			if(this.jumping == true && this.vx < this.max_vx / 1.6) this.vx += 0.2;
			else if(this.jumping == false && this.vx < this.max_vx) this.vx += 0.2;
		}
	}
	
	collides(B){
		return !(B.x+B.w < this.x || this.x + this.w < B.x
						||B.y+B.h < this.y || this.y + this.h < B.y);
    }
    collidesHit(B) {
        return !(B.x + B.w + 25 < this.x || this.x + this.w + 25 < B.x //this = player1 ---- B = player2 || this = player2 ---- B = player1     (+25 pixels for a better experience)
            || B.y + B.h < this.y || this.y + this.h < B.y);
    }
	stop(time){
		
	}
	/* TODO: FINISH
	showDamageTaken(time, dmg){
		var pShowY = this.y + this.h + 10;
		var pShowX = this.x + this.w + 10;
		this.dmgTaken = dmg;
		
		ctx.font="30px Comic Sans MS";
		ctx.fillStyle = "red";
		ctx.textAlign = "center";
		ctx.fillText("player 1 wins (" + player1.name + ")", canv.width/2, canv.height/2);
	}
	dmgTimer(time){
		this.waiter = time;
		if(this.waiter )
	}
	*/
}