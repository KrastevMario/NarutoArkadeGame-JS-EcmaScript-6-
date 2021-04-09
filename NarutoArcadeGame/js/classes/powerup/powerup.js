//using lists because it is easier to manage than normal objects (like the class Player)
//you can use "extends Magic" for the power up classes but i made this class so if you want to change something, you change only the power ups, not the magics
class Powerup{
	constructor(attributes){
		this.x = 0;this.y = 0;
		this.h = 0;this.w = 0;
		this.dmg = 0; this.mana = 0;
		this.position = ""; this.time = 0;
		this.player = ""; this.value = "";	//the value is used to declare the power up
		this.player_atk_multiplicator = 1;
		this.player_def_multiplicator = 1;
		this.player_speedX_multiplicator = 1;
		this.max_vx_multiplicator = 1;
		this.icon_x_p1 = 20; this.icon_y_p1 = 80; //position of icon image
		this.icon_x_p2 = 1200; this.icon_y_p2 = 80; 
		this.icon_w = 50; this.icon_h = 50;
        this.icon_draw_distance = 0;
        this.imageBackground = "";
        this.backgroundChangeTimer = -0;

		Object.assign(this,attributes);
		
		this.image =  new Image();
		this.image.src = this.imageSrc;
		
		this.powerup_icon = new Image();
        this.powerup_icon.src = this.iconSrc;

        if (this.imageBackground != "" && this.imageBackground !== undefined) {
            this.image_Background = new Image();
            this.image_Background.src = this.imageBackground;

            this.stageLinkImg = stage.image.src;
            this.stage_image_src = new Image();
            this.stage_image_src.src = this.stageLinkImg;
        }
		
		this.create_icon_list();
	}
	update(time){

	}
	draw(time){
		//draw powerup
		ctx.drawImage(this.image,this.x,this.y,this.w,this.h);
		//draw icon
		let that = this;
		this.icons.visit(function(x){ 
			if(that.player == "p1"){
				x.draw(that.time, that.icon_draw_distance);
			}
			else if(that.player == "p2"){
				x.draw(that.time, that.icon_draw_distance);
			}
        });

        //////////////////////////////////ADJUST?/////////////////////////////
        if (this.image_Background != "" && this.image_Background !== undefined) {
            if (time - this.backgroundChangeTimer > 0) {
                [stage.image, this.image_Background] = [this.image_Background, stage.image];
                this.backgroundChangeTimer = time;
            }
        }
	}
	collides(B){	//it may be used for some powerups(for example, you become on fire and you can use this to burn your enemy when he comes near you)
		return !(B.x+B.w < this.x || this.x + this.w < B.x
						||B.y+B.h < this.y || this.y + this.h < B.y);
	}
	check_position(X, Y){
		if(this.position == "l") this.x -= X;
		else if(this.position == "r") this.x += Y;
	}
	check_player(){
		if(this.player == "p1"){
			return true;
		}else if(this.player == "p2"){
			return false;
		}else return undefined;
	}
	create_icon_list(){
		this.icons = new List();
	}
	declare_icon_items(){
		this.icons.push(new Icon({iconSrc: this.iconSrc, player: this.player}));
	}
}