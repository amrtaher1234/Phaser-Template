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
            this.load.setBaseURL('http://labs.phaser.io');
            this.load.image('sky', 'assets/skies/space3.png');
            this.load.image('logo', 'assets/sprites/phaser3-logo.png');
            this.load.image('red', 'assets/particles/red.png');
            this.load.image('bullet', 'assets/games/invaders/bullet.png');
        };
        LevelOne.prototype.create = function () {
            this.sprite = this.physics.add.sprite(400, 0, 'logo');
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
            this.logo2.setBounce(1, 1);
            this.logo2.setCollideWorldBounds(true);
            this.logo.setCollideWorldBounds(true);
            this.physics.add.collider(this.logo, [this.logo2, this.logo, this.sprite]);
            emitter.startFollow(this.logo);
        };
        LevelOne.prototype.update = function () {
            this.sprite.y += 5;
            this.logo.setVelocityX(this.logo.body.velocity.x);
            this.logo.addListener('click', function () {
                console.log('idl');
            });
        };
        return LevelOne;
    }(Phaser.Scene));
    Example.LevelOne = LevelOne;
})(Example || (Example = {}));
window.onload = function () {
    new Example.InitPhaser();
};
//# sourceMappingURL=app.js.map