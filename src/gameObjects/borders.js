class Border extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, spriteName){
        super(scene, x, y, spriteName);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.immovable = true;
    }
}

export default Border;