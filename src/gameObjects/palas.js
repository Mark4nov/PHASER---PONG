class Palas extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, spriteName){
        super(scene, x, y, spriteName);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.immovable = true;
        this.body.setCollideWorldBounds(true);
    }
}

export default Palas;