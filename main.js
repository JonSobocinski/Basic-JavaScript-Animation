var AM = new AssetManager();
var count = 0;
var speed = 15;




function Animation(spriteSheet, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {



    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    //if (frame > 13) {
    //    frame = 26 - frame;
    //}
    xindex = frame % 2;
    yindex = Math.floor(frame / 2);

    console.log(frame + " " + xindex + " " + yindex);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth*size,//changes size
                 this.frameHeight*size);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function Puma(game, spritesheet) {
    this.animation = new Animation(spritesheet, 512, 256,.05, 8, true, false);
    this.x = -512;
    this.y = 450;
    this.game = game;
    this.ctx = game.ctx;
}

Puma.prototype.draw = function () {
//    console.log("drawing");


    if(this.x >(1080 + 512)){
        this.x = (-512) ;

        if(count >=3){
            count =0;
        }else
            count++;
    }

    if(count === 0){
        var background = new Image();
        background  = AM.getAsset("./img/background2.jpg")
        this.ctx.drawImage(background,0,0);
        this.y = 475
        size =1;
        speed =15;
    }else if(count ===1){
        var background = new Image();
        background= AM.getAsset("./img/background.jpg");
        this.y = 450;
        size = 1;
        speed = 15;
        this.ctx.drawImage(background,0,0);
    }else if(count === 2){
        var background = new Image();
        background = AM.getAsset("./img/background3.jpg");
        this.y = 800;
        size = .15
        speed =4;
        this.ctx.drawImage(background,0,0);
    }else if(count === 3){
        var background = new Image();
        background= AM.getAsset( "./img/background4.jpg");
        this.ctx.drawImage(background,0,0);
        this.y=800;
        speed = 15;
        size = 1;

    }

    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

Puma.prototype.update = function() {
    this.x += speed;//Move function (left to right)
}



AM.queueDownload("./img/puma.png");
AM.queueDownload("africa.mp3");
AM.queueDownload("./img/background.jpg");
AM.queueDownload("./img/background2.jpg");
AM.queueDownload("./img/background3.jpg");
AM.queueDownload("./img/background4.jpg");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Puma(gameEngine, AM.getAsset("./img/puma.png")));

    console.log("All Done!");

});