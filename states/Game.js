var Game = function () {};




Game.prototype = {

    init: function () {
        this.obstacle = [
            {
                spriteName: 'cat',
                pos       : {
                    x: 105,
                    y: 180
                }
            },
            {
                spriteName: 'cat',
                pos       : {
                    x: 200,
                    y: 380
                }
            },
            {
                spriteName: 'cat',
                pos       : {
                    x: 320,
                    y: 280
                }
            }
        ];

        this.player      = null;
        this.playerSpeed = 150;
        this.usedObjects = [];

        game.onPause.add(function(){
            console.log('game pause');
            this.isPause = true;
        }, this);

        game.onResume.add(function(){
            this.isPause = false;
            this.createObjects(1000);
            console.log('game start');
        }, this);     
        
        this.points          = 0;
        this.obstacleSprites = [];
        this.hideTimer       = true;
    },

    preload: function () {},

    create: function () {
        
        // starting P2 physics system
        game.physics.startSystem(Phaser.Physics.P2JS);
        
        // setting a soft gravity...
        game.physics.p2.gravity.y = 150;
        
        // ... but a high restitution
        game.physics.p2.restitution = 0.3;

        // game.physics.p2.setImpactEvents(true);

        // setting physics world boundaries, only left and right (the first two 'true')
        game.physics.p2.setBoundsToWorld(true, true, false, false, false);

        this.stage.disableVisibilityChange = false;
        game.add.sprite(0, 0, 'splash-bg');

        this.createObstacle();
        this.createPlayer();

        this.gameText = game.add.text(10, 10, 'Punkty: ' + this.points, {
            font: "normal 20px Snubnose",
            fill: "#ffffff"
        });

        this.bloodEmiter = game.add.emitter(0, 0, 100);
        this.bloodEmiter.makeParticles('blood');
        this.bloodEmiter.gravity = 400;
        this.bloodEmiter.setAlpha(0.8, 0.3);

        this.objectGroup = game.add.group();

        this.createObjects(1000);


        var that           = this;
            this.indicator = new VisualTimer({
            game      : this.game,
            x         : 240,
            y         : 10,
            seconds   : 5,
            onComplete: function() {
                that.hideTimer   = true;
                that.playerSpeed = 150;
            }
        });       
        this.indicator.sprite.alpha = 1;
    },

    update: function() {

        if(this.player) {
            this.player.body.setZeroVelocity();

            if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                this.movePlayerLeft();
            } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)  || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                this.movePlayerRight();
            }  
        }

        if(this.hideTimer) {
            this.indicator.sprite.alpha = 0;
        } else {
            this.indicator.sprite.alpha = 1;
        }

        // for (var i = 0; i < this.obstacleSprites.length; i++) {
        //     this.obstacleSprites[i].body.rotateRight(5 + (4 * i) * (i * -1));
        // }
    },

    createObjects(time) {
        var that = this;

        setTimeout(function(){

            var newTime = that.randomIntFromInterval(500, 3000);
            that.createObject();

            if (that.isPause) {
                return;
            }            
            that.createObjects(newTime);
        }, time)
    },

    createObject(){
        var chossenObject = '';
        var randomInt     = this.randomIntFromInterval(1, 20);
        var object        = null;
        var randomPosX    = this.randomIntFromInterval(30, 370);
        var randomPosY    = this.randomIntFromInterval(-50, -150);
        var counter       = 0;

        if (randomInt <= 6) {
            chossenObject = 'boy';
        }

        if (randomInt > 7) {
            chossenObject = 'girl';
        }

        if (randomInt > 14) {
            chossenObject = 'sick';
        }

        if (randomInt > 15) {
            chossenObject = 'spaczenie';
        }

        if (randomInt > 17) {
            chossenObject = 'srg';
        }

        if (randomInt > 18) {
            chossenObject = 'towel';
        }


        if (this.objectGroup.countDead()) {
            this.objectGroup.forEachDead(function(item){

                if (chossenObject === item.data.name && counter === 0) {
                    
                    counter++;
                    object = item;
                    object.reset(randomPosX, randomPosY);
                    return false;                 
                }
            });
        }

        if (!object) {
            object = game.add.sprite(randomPosX, randomPosY, chossenObject);
            this.objectGroup.add(object);

            object.anchor.setTo(0.5);
            object.scale.setTo(.2);
            game.physics.p2.enable(object);
            object.data.name = chossenObject;

            object.checkWorldBounds = true;
            object.events.onOutOfBounds.add(function (objectOutOfBounds) {

                if(objectOutOfBounds.body.y > 400) {
                    objectOutOfBounds.kill(); 
                }
            });
        }        
    },

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    onObstacleHit(body) {
        var obj    = this;
        var parent = obj.parent;

        if(body){
            switch(body.sprite.data.name){
                case 'boy' : 
                case 'girl': 
                case 'sick': 
                    obj.this.bloodEmiter.x = (body.sprite.x + parent.x) / 2;
                    obj.this.bloodEmiter.y = (body.sprite.y + parent.y) / 2;

                    obj.this.bloodEmiter.start(true, 2000, null, 16);
                    break;
            }
        }
    },

    onPlayerHit(body) {      
        var color = '';
        var text  = '';

        if(body && this.player.y > body.y + 20){      
            switch(body.sprite.data.name){
                case 'boy': 
                    text  = '500 pkt';
                    color = '#7ba1cc';
                    this.updatePoints(500);
                    break;

                case 'girl': 
                    text  = '500 pkt';
                    color = '#be3560';
                    this.updatePoints(500);
                    break;

                case 'sick': 
                    text  = '5000 pkt';
                    color = '#e50000';
                    this.updatePoints(5000);
                    break;

                case 'towel': 
                    text             = 'Kocyk';
                    color            = '#bdbcbd';
                    this.hideTimer   = false;
                    this.playerSpeed = 50;
                    this.indicator.start();

                    break;

                case 'srg': 
                    text             = 'GENDER';
                    color            = '#db9c79';
                    this.hideTimer   = false;
                    this.playerSpeed = 400;
                    this.indicator.start();
                    break;

                case 'spaczenie': 
                    text  = 'Koniec';
                    color = '#cfa404';
                    
                    totalPoints = this.points;

                    setTimeout(function(){
                        game.state.start('GameOver', true, false, totalPoints);
                    }, 300)
                    break;
            }
            
            body.sprite.kill();

            new FloatingText(game, {
                text       : text,
                animation  : 'explode',
                textOptions: {
                    fontSize       : 32,
                    fill           : color,
                    stroke         : '#ffffff',
                    strokeThickness: 1,
                    wordWrap       : true,
                    wordWrapWidth  : 300,
                    font           : 'Snubnose'
                },
                x         : this.randomIntFromInterval(this.player.x - 5, this.player.x + 5),
                y         : this.randomIntFromInterval(this.player.y - 40, this.player.y - 50),
                timeToLive: 150
            });
        }
    },

    movePlayerLeft() {
        
        if (!(this.player.x < this.player.width / 2)) {
            this.player.body.velocity.x -= this.playerSpeed;
        }
    },

    movePlayerRight() {
        

        if (!(this.player.x > game.world.width - this.player.width / 2)) {
            this.player.body.velocity.x += this.playerSpeed;
        }
    },


    updatePoints(value) {
        this.points += value;
        this.gameText.setText('Punkty: ' + this.points);
    },


    createObstacle: function () {
        var i = 0;

        for(i; i < this.obstacle.length; i++) {
            var item = this.obstacle[i];

            var obstacleSprite = game.add.sprite(item.pos.x, item.pos.y, item.spriteName);
            obstacleSprite.anchor.setTo(0.5);
            obstacleSprite.scale.setTo(.25);
            obstacleSprite.data.name = 'obstacle';

            // enabling item to react to physics
            game.physics.p2.enable(obstacleSprite);
            
            // setting it as a 24 pixels radius circle
            obstacleSprite.body.setCircle(35);
            
            // setting items as static
            obstacleSprite.body.static = true;
            // obstacleSprite.body.fixedRotation = false;            
            
            obstacleSprite.body.onBeginContact.add(this.onObstacleHit, {
                this  : this,
                parent: obstacleSprite
            });

            this.obstacleSprites.push(obstacleSprite);
        }

    },

    createPlayer: function() {
        this.player = game.add.sprite(game.world.centerX, 500, 'player');
        this.player.anchor.setTo(0.5, 1);
        this.player.scale.setTo(.3);
        this.player.data.name = 'player';

        
        game.physics.p2.enable(this.player);
        this.player.body.kinematic = true;
        this.player.body.onBeginContact.add(this.onPlayerHit, this);
    }
};