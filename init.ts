/// <reference path='./phaser.d.ts'/>
module Example{
    
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
         particles : any;
         logo!: Phaser.Physics.Arcade.Image;
         logo2!: Phaser.Physics.Arcade.Image;
         sprite!: Phaser.Physics.Arcade.Sprite;
         tile! :any;
         platforms!:Phaser.Physics.Arcade.StaticGroup;
         player! : Phaser.Physics.Arcade.Sprite;
         cursors!: Phaser.Input.Keyboard.CursorKeys;
         constructor() {
             super({key : "LevelOne"})
         }
         preload(){
        // this.load.setBaseURL('./assets');
        this.load.image('sky', 'assets/sky.jpg');
        this.load.image('ground', 'assets/ground.png');

        this.load.spritesheet('dude', 
        'assets/dude-sprite.png',
        { frameWidth: 21, frameHeight: 35 },
    );
    this.load.spritesheet('run' , 'assets/run.png' , {frameWidth : 23 , frameHeight : 34});
        
         }
         create() {
            this.player = this.physics.add.sprite(300, window.innerHeight-200, 'dude');
            this.player.setBounce(12);
            this.player.setCollideWorldBounds(true);
            this.player.setScale(2.4);
            this.anims.create({
                key: 'idle',
                frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 7 }),
                frameRate: 20,
                repeat: -1
            });
            this.anims.create({
                key: 'run',
                frames: this.anims.generateFrameNumbers('run', { start: 0, end: 7 }),
                frameRate: 20,
                repeat: -1
            });
            this.player.play('idle');
            
            this.cursors = this.input.keyboard.createCursorKeys();
            this.platforms = this.physics.add.staticGroup();
            this.platforms.create(400, 568, 'ground').setScale(0.2 , 0.08).refreshBody();
            console.log(this.platforms.getFirst());
            this.platforms.create(600, 400, 'ground').setScale(0.08).refreshBody();
            this.platforms.create(50, 250, 'ground').setScale(0.08).refreshBody();
            this.platforms.create(750, 220, 'ground').setScale(0.08).refreshBody();

            this.physics.add.collider(this.player, this.platforms);


         }
         update() {
            if (this.cursors.right!.isDown)
            {
                this.player.x+=1;
                this.player.flipX = false;
                this.player.play('run' , true);
            }
           
            else if(this.cursors.left!.isDown) {
                this.player.flipX = true;
                this.player.x-=1;
                this.player.play('run' , true);
            }
            else{ 
                this.player.play('idle' , true);
            }

            if (this.cursors.up!.isDown && this.player.body.touching.down)
{               
                console.log(1)
                this.player.setVelocityY(-230);
}
        }
     }
     }
     


window.onload = () => {
    new Example.InitPhaser();
};