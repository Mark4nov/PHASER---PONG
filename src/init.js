import Bootloader from "./bootloader.js";
import Scene_play from "./scenes/scene_play.js";
import Scene_Menu from "./scenes/scene_menu.js";
import Scene_GameOver from "./scenes/scene_gameOver.js";

const config = {
    width: 640,
    height: 400,
    backgroundColor: '#2d2d2d',
    parent: "contenedor", //ES EL DIV QUE ESTA EN INDEX.HTML
    physics:{
        default: "arcade"
    },
    scene: [
        Bootloader,
        Scene_Menu,
        Scene_play,
        Scene_GameOver,
    ]
}

new Phaser.Game(config)