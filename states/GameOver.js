var GameOver = function () {};


GameOver.prototype = {

    menuConfig: {
        startY: 420,
        startX: 'center'
    },
    
    init: function () {        

        this.optionCount = 1;
     },

    preload: function() { },

    create: function() {
        this.stage.disableVisibilityChange = true;
        game.add.sprite(0, 0, 'author-bg');
       
        this.addMenuOption('Wstecz', function (target) {
            this.game.state.start("GameMenu");
        });
    }
};


Phaser.Utils.mixinPrototype(GameOver.prototype, mixins);