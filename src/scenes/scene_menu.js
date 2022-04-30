export default class Scene_Menu extends Phaser.Scene{
    constructor(){
        super({key: 'Scene_menu'});
        
    }

    create(){
        const GAME_WIDTH =  this.sys.game.config.width;
        const GAME_HEIGHT = this.sys.game.config.height;
        this.add.text( GAME_WIDTH / 2, GAME_HEIGHT / 2 - 50, "PONG", { fontSize: 144, align: 'center', fontFamily:'MyFonta'}).setOrigin(0.5, 0.5);
        this.add.text( GAME_WIDTH / 2, GAME_HEIGHT / 2 + 50, "PRESS ANY KEY TO PLAY", { fontSize: 30, align: 'center', fontFamily:'MyFonta'}).setOrigin(0.5, 0.5);
        this.input.keyboard.on('keydown', () => { this.scene.start("Scene_play", {gameMode: 'SINGLEPLAYER'}) });
    }
}