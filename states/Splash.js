var Splash = function () {};   


    Splash.prototype = {

    loadScripts: function () {
        game.load.script('style', 'lib/style.js');
        game.load.script('mixins', 'lib/mixins.js');
        game.load.script('slider', 'lib/PhaseSlider.js');
        game.load.script('floatingText', 'lib/FloatingText.js');
        game.load.script('visualTimer', 'lib/VisualTimer.js');
        // You can download this at: https://github.com/typekit/webfontloader
        // or use npm install webfontloader
        game.load.script('WebFont', 'vendor/webfontloader.js');
        // You can go ahead and make empty versions of these:
        game.load.script('gamemenu', 'states/GameMenu.js');
        game.load.script('thegame', 'states/Game.js');
        game.load.script('info', 'states/Info.js');
        game.load.script('credits', 'states/Credits.js');
        game.load.script('author', 'states/Author.js');
        game.load.script('gameover', 'states/GameOver.js');
    },

    loadBgm: function () {
        // thanks Kevin Macleod at http://incompetech.com/
        game.load.audio('dangerous', 'assets/bgm/Dangerous.mp3');
        game.load.audio('exit', 'assets/bgm/Exit the Premises.mp3');
    },

    loadImages: function () {
        game.load.image('gamemenu-bg', 'assets/images/gamemenu-bg.png');
        game.load.image('author-bg', 'assets/images/author-bg.jpg');
        game.load.image('info-bg', 'assets/images/info-bg.png');
        game.load.image('info-mask', 'assets/images/info-mask.png');

        game.load.image('player', 'assets/images/player.png');
        game.load.image('boy', 'assets/images/boy.png');
        game.load.image('girl', 'assets/images/girl.png');
        game.load.image('sick', 'assets/images/chora.png');
        game.load.image('srg', 'assets/images/srg.png');
        game.load.image('towel', 'assets/images/kocyk.png');
        game.load.image('spaczenie', 'assets/images/spaczenie.png');
        game.load.image('cat', 'assets/images/cat.png');

        game.load.image('slider-left-arrow', 'assets/images/left-arrow.png');
        game.load.image('slider-right-arrow', 'assets/images/right-arrow.png');

        game.load.image('blood', 'assets/images/blood.png');
        game.load.spritesheet('timer', 'assets/images/timer.png', 150, 20);
        
    },

    loadFonts: function () {
        WebFontConfig = {
            custom: {
                families: ['TheMinion', 'Snubnose'],
                urls    : ['assets/style/fonts.css']
            }
        }
    },

    init: function () {
        this.loadingBar = game.make.sprite(game.world.centerX - (387 / 2), 335, 'loading');
        this.logo       = game.make.sprite(game.world.centerX, 180, 'logo');
        this.status     = game.make.text(game.world.centerX, 320, 'Wczytywanie...', {
            font: '18pt Snubnose',
            fill: 'white'
        });
        utils.centerGameObjects([this.logo, this.status]);
    },

    // The preload function then will call all of the previously defined functions:
    preload: function () {
        game.add.sprite(0, 0, 'splash-bg').alpha = .8;
        game.add.existing(this.logo);
        game.add.existing(this.loadingBar);
        game.add.existing(this.status);
        this.load.setPreloadSprite(this.loadingBar);

        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadBgm();
    },

    addGameStates: function () {
        game.state.add("GameMenu", GameMenu);
        game.state.add("Game", Game);
        game.state.add("Info", Info);
        game.state.add("Credits", Credits);
        game.state.add("Author", Author);
        game.state.add("GameOver", GameOver);
    },

    addGameMusic: function () {
        // musicPlayer      = game.add.audio('dangerous');
        // musicPlayer.loop = true;
        // musicPlayer.play();
    },

    create: function() {
        this.status.setText('Gotowe !').setStyle({
            font: '18pt Snubnose',
            fill: '#bada55'}
        );
        this.addGameStates();
        this.addGameMusic();

        game.state.start("GameMenu");
    
    }
}