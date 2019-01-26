/// <reference path='./phaser.d.ts'/>
module Example {

    export class InitPhaser extends Phaser.Game {
        constructor() {
            let config = {
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                scene: [new LevelOne()],
                banner: true,
                title: 'Example',
                url: 'https://updatestage.littlegames.app',
                version: '1.0.0',
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 300 },
                        debug: false
                    }
                },

            }
            super(config);
            this.scene.run("LevelOne")
            console.log('started');
            // this.start();
        }
    }
    export class LevelOne extends Phaser.Scene {
        particles: any;
        logo!: Phaser.Physics.Arcade.Image;
        logo2!: Phaser.Physics.Arcade.Image;
        sprite!: Phaser.Physics.Arcade.Sprite;
        tile!: any;
        platforms!: Phaser.Physics.Arcade.StaticGroup;
        cursors!: Phaser.Input.Keyboard.CursorKeys;
        hero!: Player;
        apples!: Phaser.Physics.Arcade.Group;

        constructor() {
            super({ key: "LevelOne" })
        }
        preload() {
            // this.load.setBaseURL('./assets');
            this.load.image('sky', 'assets/sky.jpg');
            this.load.image('ground', 'assets/ground.png');
            this.load.image('apple', 'assets/apple.png');
            this.load.spritesheet('jump', 'assets/jump.png', { frameWidth: 17, frameHeight: 34 });
            this.load.spritesheet('land', 'assets/land.png', { frameWidth: 17, frameHeight: 35 });

            this.load.spritesheet('dude',
                'assets/dude-sprite.png',
                { frameWidth: 21, frameHeight: 35 },
            );
            this.load.spritesheet('run', 'assets/run.png', { frameWidth: 23, frameHeight: 34 });

        }
        create() {

            this.hero = new Player(this, innerWidth / 2 - 100, innerHeight / 2, 'dude');

            this.cursors = this.input.keyboard.createCursorKeys();

            this.platforms = this.physics.add.staticGroup();
            this.platforms.create(400, 568, 'ground').setScale(0.2, 0.08).refreshBody();
            this.platforms.create(600, 400, 'ground').setScale(0.08).refreshBody();
            this.platforms.create(50, 250, 'ground').setScale(0.08).refreshBody();
            this.platforms.create(750, 220, 'ground').setScale(0.08).refreshBody();

            this.apples = this.physics.add.group({
                key: 'apple',
                repeat: 1,
                setXY: { x: 170, y: 0, stepX: 70 }
            });
          
            this.apples.children.iterate( (child : Phaser.Physics.Arcade.Sprite) => {
                child.setScale(0.05); 
                child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));   
            } , ()=> {

            })

            this.physics.add.overlap(this.hero ,  this.apples , (p , s)=> {
                s.destroy(); 
            })
            // this.apples.children.iterate(function (child : Phaser.Physics.Arcade.Body) {

            //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            
            // });

            this.physics.add.collider(this.hero, [this.platforms]);
            this.physics.add.collider(this.apples , this.platforms); 
        }
        update() {
            this.hero.handleInput(this.cursors);
        }
    }
    export class Player extends Phaser.Physics.Arcade.Sprite {
        constructor(scene: Phaser.Scene, x: number, y: number, path: string) {
            super(scene, x, y, path, 0);

            scene.add.existing(this);
            scene.physics.world.enable(this);

            this.setCollideWorldBounds(true);
            this.setScale(2.4);

            if (scene.anims.get('idle') == null) {
                scene.anims.create({
                    key: 'idle',
                    frames: scene.anims.generateFrameNumbers('dude', { start: 0, end: 7 }),
                    frameRate: 20,
                    repeat: -1
                });
            }
            if (scene.anims.get('run') == null) {
                scene.anims.create({
                    key: 'run',
                    frames: scene.anims.generateFrameNumbers('run', { start: 0, end: 7 }),
                    frameRate: 20,
                    repeat: -1
                });
            }
            if (scene.anims.get('jump') == null) {
                scene.anims.create({
                    key: 'jump',
                    frames: scene.anims.generateFrameNumbers('jump', { start: 0, end: 1 }),
                    frameRate: 5,
                });
            }
            if (scene.anims.get('land') == null) {
                scene.anims.create({
                    key: 'land',
                    frames: scene.anims.generateFrameNumbers('land', { start: 0, end: 1 }),
                    frameRate: 5,
                });
            }
        }

        handleInput(cursors: Phaser.Input.Keyboard.CursorKeys) {
            if (this.body.velocity.y < 0) {
                this.play('jump', true);
            }
            else if (this.body.velocity.y > 0) {
                this.play('land', true);
            }

            if (cursors.right!.isDown) {
                this.x += 1;
                this.flipX = false;
                this.play('run', true);
            }

            else if (cursors.left!.isDown) {
                this.flipX = true;
                this.x -= 1;
                this.play('run', true);
            }
            else if (cursors.up!.isDown && this.body.touching.down) {

                this.setVelocityY(-350);
            }
            else {
                if (this.body.touching.down)
                    this.play('idle', true);
            }
        }
    }
}



window.onload = () => {
    new Example.InitPhaser();
};