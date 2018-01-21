var Author = function () {};


Author.prototype = {

    menuConfig: {
        startY: 420,
        startX: 'center'
    },
    
    init: function () {
        var authorText = 'Gra jest satyrycznym spojrzeniem na świat i nie odzwierciedla prawdziwych poglądów ani przemyśleń autora. Jeśli nie masz dystansu do siebie i świata - NIE GRAJ!';
            legalText  = 'PS. W dzieciństwie spadłem z dywanu na podłogę i uderzyłem się w głowę.';
    

        this.authorText = game.make.text(game.world.centerX, 180, authorText, {
            font         : '14pt Arial',
            fill         : '#ffffff',
            align        : 'left',
            wordWrap     : true,
            wordWrapWidth: 360
        });
        this.authorText.setShadow(3, 3, 'rgba(255,255,255,0.1)', 5);
        this.authorText.anchor.set(0.5);

        this.legalText = game.make.text(game.world.centerX, 360, legalText, {
            font         : '10pt Arial',
            fill         : '#ffffff',
            align        : 'left',
            wordWrap     : true,
            wordWrapWidth: 360
        });
        this.legalText.setShadow(3, 3, 'rgba(255,255,255,0.1)', 5);
        this.legalText.anchor.set(0.5);

        this.optionCount = 1;
     },

    preload: function() { },

    create: function() {
        this.stage.disableVisibilityChange = true;
        game.add.sprite(0, 0, 'author-bg');
        game.add.existing(this.authorText);
        game.add.existing(this.legalText);
       
        this.addMenuOption('Wstecz', function (target) {
            this.game.state.start("GameMenu");
        });
    }
};


Phaser.Utils.mixinPrototype(Author.prototype, mixins);