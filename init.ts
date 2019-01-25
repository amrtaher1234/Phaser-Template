/// <reference path='./phaser.d.ts'/>
module Example{
    
    export class InitPhaser extends Phaser.Game {
        constructor() {
            let config = {
                type: Phaser.AUTO,
                width: window.innerWidth,
                height: window.innerHeight,
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
         constructor() {
             super({key : "LevelOne"})
         }
         preload(){
        this.load.setBaseURL('http://labs.phaser.io');
        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');
        
        this.load.image('bullet', 'assets/games/invaders/bullet.png');
         }
         create() {
            this.sprite = this.physics.add.sprite(400 , 0 , 'logo'); 
            this.tile = this.add.tileSprite(300, 450, 200, 100, 'red');

            var particles = this.add.particles('red');
    
            var emitter = particles.createEmitter({
                    speed: 100,
                    scale: { start: 1, end: 0 },
                    blendMode: 1, 
                });
                
                this.logo = this.physics.add.image(400, 100, 'logo');
                this.logo2 = this.physics.add.image(100, 400, 'logo');
                this.logo.setVelocity(100, 200);
                this.logo2.setVelocity(-100, -200);
                this.logo2.setBounce(1, 1);

                this.logo.setBounce(1, 1);
                this.logo2.setBounce(1,1);
                this.logo2.setCollideWorldBounds(true);
                this.logo.setCollideWorldBounds(true);
                this.physics.add.collider(this.logo , [this.logo2 , this.logo , this.sprite]);
        
            emitter.startFollow(this.logo);
         }
         update() {
             this.sprite.y +=5; 
             this.logo.setVelocityX(this.logo.body.velocity.x);
             this.logo.addListener('click' , () => { 
                 console.log('idl');
             })
        }
     }
     }
     


window.onload = () => {
    new Example.InitPhaser();
};