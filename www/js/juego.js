var app={
  inicio: function(){
    DIAMETRO_BOLA = 50;
    dificultad = 1;
    // Controles nuevas bolas
    visible2   = 0;
    visible3   = 0;
    visible4   = 0;

    velocidadX = 0;
    velocidadY = 0;
    puntuacion = 0;
    // Fin juego
    gameover   = 0;

    alto  = document.documentElement.clientHeight;
    ancho = document.documentElement.clientWidth;
    
    app.vigilaSensores();
    app.iniciaJuego();
  },

  iniciaJuego: function(){

    function preload() {
      game.stage.backgroundColor = '#f27d0c';
      game.load.image('bola', 'assets/bola.png');
      //game.load.image('objetivo', 'assets/objetivo.png');
      game.load.image('bolaLoca', 'assets/bolaLoca.png');
      // bolas extras para nivel 2 i 3
      game.load.image('bolaLoca2', 'assets/bolaLoca.png');
      game.load.image('bolaLoca3', 'assets/bolaLoca.png');
      game.load.image('bolaLoca4', 'assets/bolaLoca.png');
      gameover = 0;
      game.load.audio('explosion', 'assets/explosion.mp3');
    }

    function onTap(pointer, doubleTap) {
           app.recomienza();
    }

    function create() {
      scoreText = game.add.text(16, 16, "Score: " + puntuacion, { fontSize: '24px', fill: '#761618' });
      levelText = game.add.text(16, 64, "Level: " + dificultad, { fontSize: '24px', fill: '#761618' });

      bola = game.add.sprite(game.world.centerX, game.world.centerY, 'bola');
      bolaLoca = game.add.sprite(app.inicioX(), app.inicioY(), 'bolaLoca');

      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.physics.enable([bola,bolaLoca], Phaser.Physics.ARCADE);

      bola.body.collideWorldBounds = true;
      bola.body.onWorldBounds = new Phaser.Signal();
      bola.body.onWorldBounds.add(app.finjuego, this);

      //  Le ponemos una velocidad para que se mueva
      bolaLoca.body.velocity.setTo(200, 200);
      bolaLoca.body.collideWorldBounds = true;
      // Energia de rebote al 100%
      bolaLoca.body.bounce.setTo(1, 1);

      bolaLoca.body.onWorldBounds = new Phaser.Signal();
      bolaLoca.body.onWorldBounds.add(app.incrementaPuntuacion, this);

      explosion = game.add.audio('explosion');
      sword = game.add.audio('sword');
      game.input.onTap.add(onTap, this);
    }

    function update() {

        var factorDificultad = (100 + (dificultad * 100));

        bola.body.velocity.y = (velocidadY * factorDificultad);
        bola.body.velocity.x = (velocidadX * (-1 * factorDificultad));

        game.physics.arcade.overlap(bola, bolaLoca, app.finjuego, null, this);

        if ((dificultad > 1) && (visible2 == 0)) {
            bolaLoca2 = game.add.sprite(app.inicioX(), app.inicioY(), 'bolaLoca2');
            game.physics.enable([bolaLoca2], Phaser.Physics.ARCADE);
            bolaLoca2.body.velocity.setTo(200, 200);
            bolaLoca2.body.collideWorldBounds = true;
            // Energia de rebote al 100%
            bolaLoca2.body.bounce.setTo(1, 1);

            bolaLoca2.body.onWorldBounds = new Phaser.Signal();
            bolaLoca2.body.onWorldBounds.add(app.incrementaPuntuacion, this);

            visible2 = 1;
        }

        if ((dificultad > 2) && (visible3 == 0)) {
            bolaLoca3 = game.add.sprite(app.inicioX(), app.inicioY(), 'bolaLoca3');
            game.physics.enable([bolaLoca3], Phaser.Physics.ARCADE);
            bolaLoca3.body.velocity.setTo(200, 200);
            bolaLoca3.body.collideWorldBounds = true;
            // Energia de rebote al 100%
            bolaLoca3.body.bounce.setTo(1, 1);

            bolaLoca3.body.onWorldBounds = new Phaser.Signal();
            bolaLoca3.body.onWorldBounds.add(app.incrementaPuntuacion, this);

            visible3 = 1;
        }

        if ((dificultad > 3) && (visible4 == 0)) {
            bolaLoca4 = game.add.sprite(app.inicioX(), app.inicioY(), 'bolaLoca4');
            game.physics.enable([bolaLoca4], Phaser.Physics.ARCADE);
            bolaLoca4.body.velocity.setTo(200, 200);
            bolaLoca4.body.collideWorldBounds = true;
            // Energia de rebote al 100%
            bolaLoca4.body.bounce.setTo(1, 1);

            bolaLoca4.body.onWorldBounds = new Phaser.Signal();
            bolaLoca4.body.onWorldBounds.add(app.incrementaPuntuacion, this);

            visible4 = 1;
        }

        if (visible2 == 1) {
            game.physics.arcade.collide(bolaLoca, bolaLoca2);
            game.physics.arcade.overlap(bola, bolaLoca2, app.finjuego, null, this);
        }

        if (visible3 == 1) {
            game.physics.arcade.collide(bolaLoca, bolaLoca3);
            game.physics.arcade.collide(bolaLoca3, bolaLoca2);
            game.physics.arcade.overlap(bola, bolaLoca3, app.finjuego, null, this);
        }

        if (visible4 == 1) {
            game.physics.arcade.collide(bolaLoca, bolaLoca4);
            game.physics.arcade.collide(bolaLoca4, bolaLoca2);
            game.physics.arcade.collide(bolaLoca4, bolaLoca3);
            game.physics.arcade.overlap(bola, bolaLoca4, app.finjuego, null, this);
        }

    }
        var estados = {preload: preload, create: create, update: update};
        var game = new Phaser.Game(ancho, alto, Phaser.CANVAS, 'phaser', estados);
  },


  decrementaPuntuacion: function() {
      if (gameover == 0) {
          if (puntuacion > 0) {
              puntuacion = puntuacion - 1;
              scoreText.text = "Score: " + puntuacion;
          }
      }
  },

  incrementaPuntuacion: function(){
      if (gameover == 0) {
          puntuacion = puntuacion + 1;
          scoreText.text = "Score: " + puntuacion;

          if (puntuacion > 10) {
              dificultad = 2;
              levelText.text = "Level: " + dificultad;
          }

          if (puntuacion > 50) {
              dificultad = 3;
              levelText.text = "Level: " + dificultad;
          }

          if (puntuacion > 100) {
              dificultad = 4;
              levelText.text = "Level: " + dificultad;
          }
      }
  },

  finjuego: function(){
      if (gameover == 0) {
          gameover = 1;
          explosion.play();
          this.overlay = this.add.bitmapData(this.game.width, this.game.height);
          this.overlay.ctx.fillStyle = '#000';
          this.overlay.ctx.fillRect(0, 0, this.game.width, this.game.height);
          this.panel = this.add.sprite(0, this.game.height, this.overlay);
          this.panel.alpha = 0.5;
          var gameOverPanel = this.add.tween(this.panel);
          gameOverPanel.to({y: 0}, 500);

          gameOverPanel.onComplete.add(function () {

              var style = {font: '30px', fill: '#fff'};
              this.add.text(this.game.width / 2, this.game.height / 2, 'GAME OVER', style).anchor.setTo(0.5);

              style = {font: '20px', fill: '#fff'};
              this.add.text(this.game.width / 2, this.game.height / 2 + 50, 'Tu puntuación ' + puntuacion, style).anchor.setTo(0.5);
              this.add.text(this.game.width / 2, this.game.height / 2 + 80, 'Tu nivel ' + dificultad, style).anchor.setTo(0.5);

              style = {font: '10px', fill: '#fff'};
              this.add.text(this.game.width / 2, this.game.height / 2 + 120, 'Agitar o pulsa para jugar', style).anchor.setTo(0.5);

          }, this);
          gameOverPanel.start();

          setTimeout(app.parar, 2000);
      }
  },

  inicioX: function(){
    return app.numeroAleatorioHasta(ancho - DIAMETRO_BOLA );
  },

  inicioY: function(){
    return app.numeroAleatorioHasta(alto - DIAMETRO_BOLA );
  },

  numeroAleatorioHasta: function(limite){
    return Math.floor(Math.random() * limite);
  },

  vigilaSensores: function(){
    
    function onError() {
        console.log('onError!');
    }

    function onSuccess(datosAceleracion){
      app.detectaAgitacion(datosAceleracion);
      app.registraDireccion(datosAceleracion);
    }

    navigator.accelerometer.watchAcceleration(onSuccess, onError,{ frequency: 10 });
  },

  detectaAgitacion: function(datosAceleracion){
    var agitacionX = datosAceleracion.x > 10;
    var agitacionY = datosAceleracion.y > 10;

    if (agitacionX || agitacionY){
      setTimeout(app.recomienza, 1000);
    }
  },

  recomienza: function(){
    document.location.reload(true);
  },

  parar: function(){
      game.paused = true;
  },

  registraDireccion: function(datosAceleracion){
    velocidadX = datosAceleracion.x ;
    velocidadY = datosAceleracion.y ;
  }

};

if ('addEventListener' in document) {
    document.addEventListener('deviceready', function() {
        app.inicio();
    }, false);
}