var Credits = function () {};


Credits.prototype = {

    menuConfig: {
        startY: 420,
        startX: "center"
    },

    init: function () {        
        this.optionCount = 1;
        this.creditCount = 0;
    },

    preload: function() { },

    create: function() {
        this.stage.disableVisibilityChange = true;
        game.add.sprite(0, 0, 'splash-bg');

        this.addCredit('kod, grafika', 'Don Maciej aka. Eutrepe');
        
        this.addMenuOption('Wstecz', function (target) {
            this.game.state.start("GameMenu");
        });
    },

    addCredit: function(task, author) {
        var authorStyle = { font: '20pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
        var taskStyle   = { font: '15pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};

        var authorText = game.add.text(game.world.centerX, 620, author, authorStyle);
        var taskText   = game.add.text(game.world.centerX, 650, task, taskStyle);

        authorText.anchor.setTo(0.5);
        authorText.stroke          = "rgba(0,0,0,0)";
        authorText.strokeThickness = 4;

        taskText.anchor.setTo(0.5);
        taskText.stroke          = "rgba(0,0,0,0)";
        taskText.strokeThickness = 4;

        game.add.tween(authorText).to( { y: 180 }, 8000, Phaser.Easing.Cubic.Out, true, this.creditCount * 3000);
        game.add.tween(taskText).to( { y: 210 }, 8000, Phaser.Easing.Cubic.Out, true, this.creditCount * 3000);
        this.creditCount ++;
      },
};


Phaser.Utils.mixinPrototype(Credits.prototype, mixins);