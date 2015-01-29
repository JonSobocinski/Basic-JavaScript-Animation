var AM = new AssetManager();

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
                 this.frameWidth,
                 this.frameHeight);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function Puma(game, spritesheet) {
    this.animation = new Animation(spritesheet, 512, 256,.05, 8, true, false);
    this.x = 0;
    this.y = 450;
    this.game = game;
    this.ctx = game.ctx;
}

Puma.prototype.draw = function () {
//    console.log("drawing");
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

Puma.prototype.update = function() {
    this.x += 2;//Move function (left to right)
}



AM.queueDownload("./img/puma.png");


AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

//    var img = AM.getAsset("./img/puma.png");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Puma(gameEngine, AM.getAsset("./img/puma.png")));

    console.log("All Done!");

});