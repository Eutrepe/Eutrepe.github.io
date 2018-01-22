var GameOver = function () {};


GameOver.prototype = {

    menuConfig: {
        startY: 320,
        startX: 'center'
    },
    
    init: function (totalPoints) {      

        var gameOverText = 'Posiadasz zaledwie ' + totalPoints + 'pkt';

        this.gameOverText = game.make.text(game.world.centerX, 180, gameOverText, {
            font         : '16pt Arial',
            fill         : '#ffffff',
            align        : 'left',
            wordWrap     : true,
            wordWrapWidth: 360
        });
        this.gameOverText.setShadow(3, 3, 'rgba(255,255,255,0.1)', 5);
        this.gameOverText.anchor.set(0.5);

        this.optionCount = 1;        
     },

    preload: function() { },

    create: function() {
        this.stage.disableVisibilityChange = true;
        game.add.sprite(0, 0, 'author-bg');
        game.add.existing(this.gameOverText);

        this.addMenuOption('Zagraj ponownie', function (target) {
            this.game.state.start("Game");
        });
       
        this.addMenuOption('Menu', function (target) {
            this.game.state.start("GameMenu");
        });
    }
};


Phaser.Utils.mixinPrototype(GameOver.prototype, mixins);