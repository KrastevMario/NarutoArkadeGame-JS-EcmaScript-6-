//Red aura
class ThreeTomoeSharingan extends Powerup {
    constructor(options) {
        //default values
        super(Object.assign({
            x: 0, y: 0,
            w: 38, h: 38,
            vx: 8, vy: 0,
            dmg: 25,
            //buffs of powerup
            player_atk_multiplicator: 1.2,
            player_def_multiplicator: 1.5,
            player_speedX_multiplicator: 1,
            max_vx_multiplicator: 1,
            sharinganBgCounter: 0,
            counterSharinganTime: 100,
            //end buffs
            imageSrc: "images/Powerup/sharingan3.gif",
            iconSrc: "images/Powerup/Icon/sharingan3.gif",
            imageBackground: "images/Sharingan/background.png",
            value: "Sharingan3Tomoe"
        }, options));

        super.check_position(20, 50);	//function(position of center -x, position at center -y)

        this.declare_icon_items();

        //create sharingan gif background
        this.bgSharingan = [];
        for (var i = 0; i <= 3; i++) {
            this.bgSharingan[i] = new Image();
            this.bgSharingan[i].src = "images/Sharingan/sharingan" + i + ".gif";
        }

        //check who started the skill and DRAW it on position X Y
        if (this.player == "p1") {
            this.x = player1.x - -0;
            this.y = player1.y - 46;
            RedrawTimerP2 -= 20;
            RedrawGlobalP2 += 20;
        }
        else if (this.player == "p2") {
            this.x = player2.x - 0;
            this.y = player2.y - 46;
            RedrawTimerP1 -= 20;
            RedrawGlobalP1 += 20;
        }

        //check who started the skill and give him buffs
        if (this.player == "p1") {
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
        else if (this.player == "p2") {
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
    update(time) {
        //check who started the skill and DRAW it on position X Y
        if (this.player == "p1") {
            this.x = player1.x - -0;
            this.y = player1.y - 46;
        }
        else if (this.player == "p2") {
            this.x = player2.x - 0;
            this.y = player2.y - 46;
        }

        if (time - this.counterSharinganTime > 100) {
            if (this.sharinganBgCounter < 3) {
                this.sharinganBgCounter++;
            } else { this.sharinganBgCounter = 0; }
            this.counterSharinganTime = time;
        }
        ctx.drawImage(this.bgSharingan[this.sharinganBgCounter], 550, 70, 150, 150);
    }
    deactivate() {
        //check who started the skill
        let that = this;

        if (this.player == "p1") {
            player1.dmg /= this.player_atk_multiplicator;
            player1.def /= this.player_def_multiplicator;
            player1.vx /= this.player_speedX_multiplicator;
            player1.max_vx /= this.max_vx_multiplicator;
            player1.powerups = player1.powerups.Filter(function (B) {
                return B.value != that.value;
            });
        }
        else if (this.player == "p2") {
            player2.dmg /= this.player_atk_multiplicator;
            player2.def /= this.player_def_multiplicator;
            player2.vx /= this.player_speedX_multiplicator;
            player2.max_vx /= this.max_vx_multiplicator;
            player2.powerups = player2.powerups.Filter(function (B) {
                return B.value != that.value;
            });
        }

        //return to normal game speed
        if (this.player == "p1") {
            RedrawTimerP2 += 20;
            RedrawGlobalP2 -= 20;
        }
        else if (this.player == "p2") {
            RedrawTimerP1 += 20;
            RedrawGlobalP1 -= 20;
        }

        stage.image = this.stage_image_src;
    }
}