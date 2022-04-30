export default class Scene_GameOver extends Phaser.Scene{
    constructor(){
        super({key: 'Scene_gameOver'});
        
    }

    init(data){
        this.score_P1 = data.score_P1;
        this.score_P2 = data.score_P2;
        console.log(this.score_P1);
        console.log(this.score_P2);
    }

    create(){
        const GAME_WIDTH =  this.sys.game.config.width;
        const GAME_HEIGHT = this.sys.game.config.height;
        let winner = (this.score_P1 > this.score_P2) ? "PLAYER 1 WINS" : "PLAYER 2 WINS";
        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 30, winner, {fontFamily: 'MyFonta', fontSize: 48}).setOrigin(0.5, 0.5);
        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30, `${this.score_P1} - ${this.score_P2}`, {fontFamily: 'MyFonta', fontSize: 24}).setOrigin(0.5, 0.5);

        this.KeyToMenu = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.KeyToRestart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.add.text(10, GAME_HEIGHT - 20, 'RETURN TO MENU [ESC]', {fontFamily: 'MyFonta', fontSize:16, color: '#808080'})
        this.add.text(GAME_WIDTH - 10, GAME_HEIGHT - 20, 'RESTART GAME [ENTER]', {fontFamily: 'MyFonta', fontSize:16, color: '#808080'}).setOrigin(1, 0);
        
    }

    update(){
        if(this.KeyToMenu.isDown){
            this.scene.start('Scene_menu');
        }else if(this.KeyToRestart.isDown){
            this.scene.start('Scene_play');
        }
    }
}