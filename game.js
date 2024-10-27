const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 1000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let coins;
let cursors;
let score = 0;
let scoreText;

function preload() {
    this.load.image('player', 'https://cdn-icons-png.flaticon.com/128/742/742751.png');
    this.load.image('bot', 'https://cdn-icons-png.flaticon.com/128/742/742751.png'); // Replace with your player image
     // Replace with your player image
    this.load.image('coin', 'https://static.vecteezy.com/system/resources/thumbnails/023/588/193/small/coin-with-dollar-sign-golden-dollar-symbol-gold-coin-3d-stack-of-gold-coins-icon-isolated-symbol-png.png'); // Replace with your coin image
}

function create() {
    
    player = this.physics.add.sprite(50, 50, 'player').setScale(0.15);
    player.setCollideWorldBounds(true);
    bot=this.physics.add.sprite(50,500,'bot').setOrigin(10,10).setScale(0.15);
    bot.setCollideWorldBounds(true);

    maze2 = [ ' ',' ',
        'WWW     WWWCCCCWWTWW     WWCCCCCCWWW',
        'WTWWCCCCCCCCCCC        WCCCCCWBWCCCC',
        'WWWCCCCWBCCCCCCCCWW     WCCCCCCCCCCC',
        'WCCCCWW     CCCCCCBCCCC      WWWTWWW',
        'WCCCCCCBCCCCWWTWW      CCCCCCCCCBCCC',
        'WWTCCCCC     WWBCCCCTCCCCC      WWWW',
        'WWCCCCBCCCTCCWWW     CCCCCCCCCCCCWWW',
        'WWCCCCCCW     WWWWTWWCCCWWWBWCCCCWWW',
        'WWWWTWWBWWWCCCCCWWWW    WWTWWBWWWWWW',
        'WCCCCCWWWWW     WWWCCCCCWWWBWW    WW',
        'CCCCCCC   CCCCCCTCCCCCCCCC     CCCCC',
        'CCCCBCCTCCCCCC     CCCCCBCCCTCWWWWWW',
        'WW     CTCCWBWWCCCCCTCCCCCC     CCCC',
        'WWCCCWWWBCCCCCC     TWWBCCCCC     WW',
        'WBCC     CCCCCCCCTCCCCCCCCCCCCBCCCC',
        
    ];
    maze = [' ',' ',
        'WWW  WWWWWWWWWWWWWWW  WWWWWWWWWWWWWW',
        'WWWWWWWW  WWWWWWW  WWWWWWWWWW  WWWWW',
        'WWWW  WWWWWWWWWWWWWWWWW  WWWWWWWWWWW',
        'WWWWWWWWWWWWWW  WWWWWWWWWWWWWWW  WWW',
        'WWWWWWW  WWWWWWWWWWWWWW  WWWWWWWWWWW',
        'WWWWWWWWWWWWWWW  WWWWWWWWWWWWWW  WWW',
        'WWWWW  WWWWWWWWWWWWWWWW  WWWWWWWWWWW',
        'WWWWWWWWWW  WWWWWW  WWWWWWWWWWWWWWWW',
        'WWWW  WWWWWWWWWWWWWWWWWWWWWW  WWWWWW',
        'WWWWWWWWWWWWWW  WWWWWW  WWWWWWWWWWWW',
        'WWWWW  WWWWWWWWWW  WWWWWWWWWWW  WWWW',
        'WWWWWWWWWWW  WWWWWWWWWW  WWWWWWWWWWW',
        'W  WWWWWWWWWWWWWW  WWWWWWWWWWWWWWWWW',
        'WWWWWWW  WWWWWWWWWWWWWWWWW  WWWWWWWW',
        'WWWWWWWWWWWWWWWW  WWWWWWWWWWWWWWWWWW',
        
    ];
    this.cameras.main.setBackgroundColor('#190321');
    var coinPositions = [];
    let walls = [];
    var array=[];
    var arrayT=[];
    let boxes = [];
    for (let i = 0; i < maze2.length; i++) {
        for (let j = 0; j < maze2[i].length; j++) {
        
            if (maze[i][j] === 'W') {
                const boundary = this.add.text(j * 20, i * 50, '⎯', {
                    fontSize: '40px',
                    fill: '#05f5f5',
                    fontFamily: 'Arial'
                }).setOrigin(0, 0).setScale(0.5);
                
                // Set the wall as a static body for collision
                this.physics.add.existing(boundary, true);
                walls.push(boundary);

            }
            if(maze2[i][j]=='C'){
                const x = j*20;
            const y = i*50-12;
            array.push({x,y});
            console.log(x,y);

                
            }
            if(maze2[i][j]=='T'){
                const x = j*20;
            const y = i*50-12;
            arrayT.push({x,y});
            console.log(x,y);
            }
            if (maze2[i][j] === 'B') {
                //box=this.physics.add.staticImage(j*20, i*36, 'box').setOrigin(0).setScale(0.2);
                //boxes.push(box);
                const box = this.add.text(j * 20, i * 50-12, '╳', {
                    fontSize: '40px',
                    fill: '#05f5f5',
                    fontFamily: 'Arial'
                }).setOrigin(0,0).setScale(0.5);
                
                this.physics.add.existing(box, true);
                boxes.push(box);}
        }}
        i=0;
        coinPositions=array;
        botPositions=arrayT;

        
         
            

      
    coins = this.physics.add.group();
    bots = this.physics.add.group();

    botPositions.forEach(p => {
        const bot = bots.create(p.x, p.y, 'bot');
        bot.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        bot.setScale(0.15);
    });

    coinPositions.forEach(pos => {
        const coin = coins.create(pos.x, pos.y, 'coin');
        coin.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        coin.setScale(0.05);
    });

    
    //this.physics.add.collider(player, barriers);

    this.physics.add.collider(player, walls);
    this.physics.add.collider(player, boxes);
    
   /* bots.forEach(b => this.physics.add.collider(b, walls));
    bots.forEach(b => this.physics.add.collider(b, boxes));*/


    this.physics.add.overlap(player, coins, collectCoin, null, this);

    
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    
    // Player movement
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-160);
    } else if (cursors.down.isDown) {
        player.setVelocityY(160);
    } else {
        player.setVelocityY(0);
    }
}

function collectCoin(player, coin) {
    coin.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
}
