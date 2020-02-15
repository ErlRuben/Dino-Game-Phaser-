//python -s SimpleHTTPServer
var GameScene = new Phaser.Class({
 
    Extends: Phaser.Scene,
  
    initialize:
  
    function GameScene ()
    {
        Phaser.Scene.call(this, { key: 'gameScene', active: true });
  
        this.player = null;
        this.cursors = null;
        this.score = 0;
        this.scoreText = null;
        this.deathText = null;
    },
  
    preload: function ()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('bomb', 'assets/cactus.png');
        this.load.spritesheet('dude', 'assets/dino.png', { frameWidth: 102, frameHeight: 108 });
        this.load.spritesheet('fullscreen', 'assets/fullscreen.png', { frameWidth: 64, frameHeight: 64 });
    },
  
    create: function ()
    {
        this.add.image(400, 300, 'sky');
        this.bomb = this.add.image(1040, 700, 'bomb');

        var platforms = this.physics.add.staticGroup();
  
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  
     
        //player spawn
        var player = this.physics.add.sprite(250, 450, 'dude');
        
        //player bounce
        player.setBounce(0.05);
        player.setCollideWorldBounds(true);
        
        //animation
        /*this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
  
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
  
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        */
        //control
        var bomb = this.physics.add.group({
            key: 'bomb',
            repeat: 4,
            setXY: { x: 600, y: 510, stepX: 200 }
        });
        //bounce of stars
        bomb.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.100, 0.1));
  
        });
        this.cursors = this.input.keyboard.createCursorKeys();
        
        
  
 
        this.scoreText = this.add.text(662, 16, 'Score: 0', { fontSize: '25px', fill: '#000' });
        this.deathText = this.add.text(340, 280, '', { fontSize: '45px', fill: '#000' });
  
        this.physics.add.collider(player, platforms);
        //this.physics.add.collider(player, stars);
        this.physics.add.collider(bomb, platforms);
  
        this.physics.add.overlap(player, bomb, this.collectStar, null, this);
  
        this.player = player;
  
        var button = this.add.image(800-16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
  
        button.on('pointerup', function () {
  
            if (this.scale.isFullscreen)
            {
                button.setFrame(0);
  
                this.scale.stopFullscreen();
            }
            else
            {
                button.setFrame(1);
  
                this.scale.startFullscreen();
            }
  
        }, this);
        
        //fullscreen
        var FKey = this.input.keyboard.addKey('F');
  
        FKey.on('down', function () {
  
            if (this.scale.isFullscreen)
            {
                button.setFrame(0);
                this.scale.stopFullscreen();
            }
            else
            {
                button.setFrame(1);
                this.scale.startFullscreen();
            }
  
        }, this);
    },
    
    update: function (time)
    {
      
        
        var cursors = this.cursors;
        var player = this.player;

        
 
        //speed while pressing 
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
  
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
  
           
        }
        else
        {
            player.setVelocityX(0);
  
        }
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-490);
        }

        
        if (this.bomb.x > config.width + 32) {
            this.bomb.x = 820;
        }
        else {
            this.bomb.x -= 3;
        }


        score =+ Math.round(time / 200  );
        this.scoreText.setText('Score:' + score);
        player.update(time);



    },
    
    collectStar: function (player, bomb)

    {   
      
        player.disableBody(true, false);
        this.score += 0;

        this.deathText.setText('Dead!');
        //does not collide or collide
       

        
          
        
    },
 
    
 });
  
 var config = {
    type: Phaser.AUTO,
    scale: {

        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: false
        }
    },
    scene: GameScene
 };
  
 var game = new Phaser.Game(config);
 