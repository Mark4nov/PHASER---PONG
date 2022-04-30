import Palas from "../gameObjects/palas.js";
const ballVelocity_BASE = 200;
const ballVelocity_MAX = 600;
const MAX_SCORE = 5;

export default class Scene_play extends Phaser.Scene{
    constructor(){
        super({key: 'Scene_play'});
    }

    init(data){
        this.GameMode = data.gameMode;
    }

    preload(){
        console.log("INTO THE PLAYING");
    }

    create(){
        //VARIABLES:
        this.gameWidth = this.sys.game.config.width;
        this.gameHeight = this.sys.game.config.height;
        this.IsReseting = false;
        this.Score_P1 = 0;
        this.Score_P2 = 0;
        this.ballVelocity_CURRENT = ballVelocity_BASE;
    

        // ESCENARIO
        this.add.image(this.gameWidth / 2, this.gameHeight / 2, "separator").setScale(0.8);

        //INTERFAZ DE USUARIO:
        this.add.text(2, 2, 'W', {font: '12px bold', fill: '#808080'}).setOrigin(0, 0);
        this.add.text(2, this.gameHeight - 2, 'S', {font: '12px bold', fill: '#808080'}).setOrigin(0, 1);
        this.add.text(this.gameWidth /2, 2, `Until ${MAX_SCORE}`, {font: '12px bold', fill: '#808080'}).setOrigin(0.5, 0);
        this.UI_Score_P1 =  this.add.text(this.gameWidth /2 - 24, 24, this.Score_P1, {font: '32px bold', fill: '#ffffff'}).setOrigin(1, 0.5);
        this.UI_Score_P2 =  this.add.text(this.gameWidth /2 + 24, 24, this.Score_P2, {font: '32px bold', fill: '#ffffff'}).setOrigin(0, 0.5);

        //JUGADORES
        this.left_pallete = new Palas(this, 10,this. gameHeight / 2, "left_pallete").setScale(2);
        this.right_pallete = new Palas(this, this.gameWidth - 10, this.gameHeight / 2, "right_pallete").setScale(2);

        //-- CONTROLES:
        this.cursor = this.input.keyboard.createCursorKeys(); // Controles del Jugador 1;
        this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // Controles del Jugador 2
        this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        //ELEMENTOS INTERACTIVOS
        this.ball = this.physics.add.image(this.gameWidth / 2, this.gameHeight / 2, "ball").setScale(2);
        this.ball.setCollideWorldBounds(true); //Colisiona con los límites del mundo;
        this.physics.world.setBoundsCollision(false, false, true, true); // Deshabilita el rebote contra los lados, dejando sólo habilitado el rebote con los limites superior e inferior.
        this.ball.setBounce(1); // Rebota, y la velocidad del rebote es igual al 100% (1) de la velocidad previa al impacto.
        this.ball.setVelocity(this.ballVelocity_CURRENT, 0); // Velocidad y dirección inicial del a bola al empezar el juego.

        //FÍSICAS:
        this.PalletesGroup = this.add.group();
        this.PalletesGroup.add(this.left_pallete);
        this.PalletesGroup.add(this.right_pallete);

        this.physics.add.collider(this.ball, this.PalletesGroup, this.palleteBounce,null, this);
        this.physics.add.collider(this.left_pallete, this.border_superior);
        
    }

    palleteBounce(){
        this.ball.setVelocityY(Phaser.Math.Between(-120, 120));

        if(this.ballVelocity_CURRENT * 1.10 < ballVelocity_MAX){
            this.ballVelocity_CURRENT += ballVelocity_BASE * 0.10;
        }else{
            this.ballVelocity_CURRENT = ballVelocity_MAX;
        }

        this.ball.body.velocity.normalize().scale(this.ballVelocity_CURRENT);
    }

    update(){
        if((this.ball.x < 0 || this.ball.x > this.gameWidth) && this.IsReseting == false){
            this.IsReseting = true;
            this.time.delayedCall(1000, this.Restart);
        }

        this.InputManager();

        this.UI_Score_P1.setText(this.Score_P1);
        this.UI_Score_P2.setText(this.Score_P2);
    }

    InputManager(){

        // JUGADOR 1
        if(this.cursor_S.isDown){
            this.left_pallete.body.setVelocityY(400);
        }
        else if(this.cursor_W.isDown){
            this.left_pallete.body.setVelocityY(-400);
        }
        else{
            this.left_pallete.body.setVelocity(0);
        }

        // JUGADOR 2:
        if(this.GameMode == 'MULTIPLAYER'){
            if(this.curso.down.isDown){
                this.right_pallete.body.setVelocityY(400)
            }
            else if (this.cursor.up.isDown){
                this.right_pallete.body.setVelocityY(-400);
            }else{
                this.right_pallete.body.setVelocityY(0);
            }
        }else{
            this.right_pallete.body.setVelocityY(this.ball.body.velocity.y *  Phaser.Math.Between(0.75, 0.9));
        }
        
        
    }

    Restart = () => {
        this.left_pallete.y = this.gameHeight / 2;
        this.right_pallete.y = this.gameHeight / 2

        this.ball.setVelocityY(0);
        this.ballVelocity_CURRENT = ballVelocity_BASE;

        if(this.ball.x < 0){ 
            this.Score_P2 ++;
            this.ball.setVelocityX(ballVelocity_BASE  * - 1 );
        }else{
            this.Score_P1 ++;
            this.ball.setVelocityX(ballVelocity_BASE)
        }

        this.ball.setPosition(this.gameWidth / 2, this.gameHeight / 2);
        this.IsReseting = false;

        if(this.Score_P1 >= MAX_SCORE || this.Score_P2 >= MAX_SCORE){
            this.scene.start('Scene_gameOver', {score_P1: this.Score_P1, score_P2: this.Score_P2});
        }
    }
}