var game = new Phaser.Game(400, 540, Phaser.AUTO, 'game'),
  Main = function () {},

  gameOptions = {
    playSound: true,
    playMusic: true
  },  
  musicPlayer;

Main.prototype = {

    preload: function () {
      game.load.image('splash-bg',    'assets/images/splash-bg.jpg');
      game.load.image('loading',  'assets/images/loading.png');
      game.load.image('logo',    'assets/images/logo.jpeg');
      game.load.image('kk',    'assets/images/kk.png');

      game.load.script('utils',   'lib/utils.js');
      game.load.script('splash',  'states/Splash.js');
    },
  
    create: function () {
      game.state.add('Splash', Splash);
      game.state.start('Splash');
    }
  
  };
  
  game.state.add('Main', Main);
  game.state.start('Main');