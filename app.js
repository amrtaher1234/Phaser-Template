"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path='./phaser.d.ts'/>
var Example;
(function (Example) {
    var InitPhaser = /** @class */ (function (_super) {
        __extends(InitPhaser, _super);
        function InitPhaser() {
            var _this = this;
            var config = {
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
            };
            _this = _super.call(this, config) || this;
            _this.scene.run("LevelOne");
            console.log('started');
            return _this;
            // this.start();
        }
        return InitPhaser;
    }(Phaser.Game));
    Example.InitPhaser = InitPhaser;
    var LevelOne = /** @class */ (function (_super) {
        __extends(LevelOne, _super);
        function LevelOne() {
            return _super.call(this, { key: "LevelOne" }) || this;
        }
        LevelOne.prototype.preload = function () {
            // this.load.setBaseURL('./assets');
            this.load.image('sky', 'assets/sky.jpg');
            this.load.image('ground', 'assets/ground.png');
            this.load.spritesheet('dude', 'assets/dude-sprite.png', { frameWidth: 21, frameHeight: 35 });
            this.load.spritesheet('run', 'assets/run.png', { frameWidth: 23, frameHeight: 34 });
        };
        LevelOne.prototype.create = function () {
            this.player = this.physics.add.sprite(300, window.innerHeight - 200, 'dude');
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
            this.platforms.create(400, 568, 'ground').setScale(0.2, 0.08).refreshBody();
            console.log(this.platforms.getFirst());
            this.platforms.create(600, 400, 'ground').setScale(0.08).refreshBody();
            this.platforms.create(50, 250, 'ground').setScale(0.08).refreshBody();
            this.platforms.create(750, 220, 'ground').setScale(0.08).refreshBody();
            this.physics.add.collider(this.player, this.platforms);
        };
        LevelOne.prototype.update = function () {
            if (this.cursors.right.isDown) {
                this.player.x += 1;
                this.player.flipX = false;
                this.player.play('run', true);
            }
            else if (this.cursors.left.isDown) {
                this.player.flipX = true;
                this.player.x -= 1;
                this.player.play('run', true);
            }
            else {
                this.player.play('idle', true);
            }
            if (this.cursors.up.isDown && this.player.body.touching.down) {
                console.log(1);
                this.player.setVelocityY(-230);
            }
        };
        return LevelOne;
    }(Phaser.Scene));
    Example.LevelOne = LevelOne;
})(Example || (Example = {}));
window.onload = function () {
    new Example.InitPhaser();
};
//# sourceMappingURL=app.js.map