import Border from "../gameObjects/borders.js";
import Palas from "../gameObjects/palas.js";

export default class Scene_play extends Phaser.Scene{
    constructor(){
        super({key: 'Scene_play'});
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

        // ESCENARIO
        this.add.image(this.gameWidth/2, this.gameHeight / 2, "separator");
        this.border_superior = new Border(this, this.gameWidth / 2, 40, 'border');
        this.border_inferior = new Border(this, this.gameWidth / 2, 360, 'border');

        //INTERFAZ DE USUARIO:
        this.UI_Score_P1 =  this.add.text(20, 4, this.Score_P1, {font: '28px black', fill: '#ffffff'});
        this.UI_Score_P2 =  this.add.text(this.gameWidth - 35, 4, this.Score_P2, {font: '28px black', fill: '#ffffff'});

        //JUGADORES
        this.left_pallete = new Palas(this, 10,this. gameHeight / 2, "left_pallete");
        this.right_pallete = new Palas(this, this.gameWidth - 10, this.gameHeight / 2, "right_pallete");
        

        //-- CONTROLES:
        this.cursor = this.input.keyboard.createCursorKeys(); // Controles del Jugador 1;
        this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // Controles del Jugador 2
        this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        //ELEMENTOS INTERACTIVOS
        this.ball = this.physics.add.image(this.gameWidth / 2, this.gameHeight / 2, "ball");
        this.ball.setCollideWorldBounds(true); //Colisiona con los límites del mundo;
        this.physics.world.setBoundsCollision(false, false, true, true); // Deshabilita el rebote contra los lados, dejando sólo habilitado el rebote con los limites superior e inferior.
        this.ball.setBounce(1); // Rebota, y la velocidad del rebote es igual al 100% (1) de la velocidad previa al impacto.
        this.ball.setVelocity(-200, 0); // Velocidad y dirección inicial del a bola al empezar el juego.

        //FÍSICAS:
        this.BallBoucers = this.add.group();
        this.BallBoucers.add(this.left_pallete);
        this.BallBoucers.add(this.right_pallete);
        this.BallBoucers.add(this.border_inferior);
        this.BallBoucers.add(this.border_superior);

        this.physics.add.collider(this.ball, this.BallBoucers, this.palleteBounce,null, this);
        this.physics.add.collider(this.left_pallete, this.border_superior);
        
    }

    palleteBounce(){
        this.ball.setVelocityY(Phaser.Math.Between(-120, 120));
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
        if(this.cursor.down.isDown){
            this.right_pallete.body.setVelocityY(300);
        }
        else if(this.cursor.up.isDown){
            this.right_pallete.body.setVelocityY(-300);
        }
        else{
            this.right_pallete.body.setVelocity(0);
        }

        // JUGADOR 2:
        if(this.cursor_S.isDown){
            this.left_pallete.body.setVelocityY(300)
        }
        else if (this.cursor_W.isDown){
            this.left_pallete.body.setVelocityY(-300);
        }else{
            this.left_pallete.body.setVelocityY(0);
        }
    }

    Restart = () => {
        this.ball.setVelocityY(0);
        if(this.ball.x < 0){ 
            this.Score_P2 ++;
        }else{
            this.Score_P1 ++;
        }
        this.ball.setPosition(this.gameWidth / 2, this.gameHeight / 2);
        this.IsReseting = false;
    }
}