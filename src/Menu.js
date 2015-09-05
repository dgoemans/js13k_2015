function Menu()
{
    State.call(this);
};

Menu.prototype = Object.create(State.prototype);

Menu.prototype.enter = function ()
{
    game.audio.add('start',1,[[2,,0.18,,,0.23,,,,,,,,,,,,,1,,,0.1,,0.29]]);

    State.prototype.enter.call(this);
    var text = new Text(canvasWidth / 2 - 250, 100, 120, "Trebuchet MS", "Reversed");
    this.add(text);

    this.playButton = new Text(canvasWidth / 2 - 50, canvasHeight / 2 - 60, 60, "Trebuchet MS ", "Play");
    this.add(this.playButton);
    this.playButton.onClick = function ()
    {
        var levelStr = localStorage['js13_currentLevel'] || 1;
        var topLevel = parseInt(levelStr);

        game.audio.play('start');
        game.goto("game", {level: topLevel});
    };

    text = new Text(canvasWidth / 2 - 130, canvasHeight - 40, 20, "Trebuchet MS", "by David & Amy Goemans");
    this.add(text);
};

Menu.prototype.update = function (deltaSeconds)
{
    State.prototype.update.call(this, deltaSeconds);
};

ctor(Menu);