var Info = function () {};


Info.prototype = {

    menuConfig: {
        startY: 420,
        startX: 'center'
    },
    
  
    init: function () { 
        this.optionCount   = 1;
        this.infoStartPosY = 0;
        this.slider        = new phaseSlider(game);
        this.items         = [
            {
                spriteName: 'player',
                text      : 'Gracz - (sterowanie A, D lub <-, ->)',
                offsetY   : -35
            },
            {
                spriteName: 'girl',
                text      : 'Jessica - warta 500',
                offsetY   : 0
            },
            {
                spriteName: 'boy',
                text      : 'Brajan - wart 500',
                offsetY   : 0
            },
            {
                spriteName: 'sick',
                text      : '"Hora curka" - warta 5000',
                offsetY   : 0
            },
            {
                spriteName: 'srg',
                text      : 'Samotny rodzic gender - zwiększa prędkość gracza o 15% na 5s',
                offsetY   : -45
            },
            {
                spriteName: 'towel',
                text      : 'Śliski kocyk - zmniejsza prędkość gracza o 30% na 5s',
                offsetY   : -60
            },
            {
                spriteName: 'cat',
                text      : 'Kotek z piwnicy - statyczna przeszkoda',
                offsetY   : -30
            },
            {
                spriteName: 'spaczenie',
                text      : 'Woda spaczenia - Zostajesz "miszczem" patologii. Na chate wbija Ci się opieka społeczna - koniec gry!',
                offsetY   : -35
            }
        ];
        
        this.sliderObject = this.createSliderItems(this.items);
    },

    preload: function() { },

    create: function() {
        this.stage.disableVisibilityChange = true;
        game.add.sprite(0, 0, 'info-bg');
        
        this.slider.createSlider({
            width           : game.width,
            height          : game.height,
            objects         : this.sliderObject,
            customHandlePrev: 'slider-left-arrow',
            customHandleNext: 'slider-right-arrow'
        });

        game.add.sprite(0, 0, 'info-mask');
      
        this.addMenuOption('Wstecz', function (target) {
            this.game.state.start("GameMenu");
        });
    },

    createSliderItems(items) {
        var i = 0;

        var slides = [];
        var slide  = null;

        for (i = 0; i < items.length; i++) {
            slide = game.add.group();

            var infoSprite = game.add.sprite(game.world.centerX, 290 + items[i].offsetY, items[i].spriteName);
            infoSprite.anchor.setTo(0.5, 1);
            infoSprite.scale.setTo(.7);

            var infoStyle  = { 
                font           : '12pt Arial',
                fill           : 'white',
                align          : 'left',
                stroke         : 'rgba(0,0,0,0)',
                strokeThickness: 4,
                wordWrap       : true,
                wordWrapWidth  : 280
            };
    
            var infoText = game.add.text(70, 330, items[i].text, infoStyle);

            slide.add(infoSprite);
            slide.add(infoText);

            slides.push(slide);
        }
        
        return slides;
    },

    addInfo(spriteName, text) {
        var infoSprite = game.add.sprite(50, this.infoStartPosY + 10, spriteName);
        infoSprite.anchor.setTo(0.5, 0);
        infoSprite.scale.setTo(.18);
        
        var infoStyle  = { 
            font           : '10pt Arial',
            fill           : 'white',
            align          : 'left',
            stroke         : 'rgba(0,0,0,0)',
            strokeThickness: 4,
            wordWrap       : true,
            wordWrapWidth  : 280
        };

        var infoText = game.add.text(100, this.infoStartPosY + 10 + infoSprite.height / 2, text, infoStyle).anchor.setTo(0, 0.5);

        this.infoStartPosY += (infoSprite.height + 10);
    }
};


Phaser.Utils.mixinPrototype(Info.prototype, mixins);