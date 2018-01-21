var GameMenu = function () {};

GameMenu.prototype = {

    menuConfig: {
        startY: 160,
        startX: 'center'
    },

    init: function () {
        this.titleText = game.make.text(game.world.centerX, 80, "J&B FIVE00", {
            font : 'bold 50pt Snubnose',
            fill : '#bada55',
            align: 'center'
        });
        this.titleText.setShadow(3, 3, 'rgba(255,255,255,0.1)', 5);
        this.titleText.anchor.set(0.5);
        this.optionCount = 1;
    },

    preload: function () {

    },

    create: function () {
        game.add.sprite(0, 0, 'gamemenu-bg');
        game.add.existing(this.titleText);
        game.stage.disableVisibilityChange = true;

        this.addMenuOption('Start', function () {
            game.state.start("Game");
        });
        this.addMenuOption('Info', function () {
            game.state.start("Info");
        });
        this.addMenuOption('Od Autora', function () {
            game.state.start("Author");
        });
        this.addMenuOption('Credits', function () {
            game.state.start("Credits");
        });
    }
    
};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);