var WalkCommand = (function () {
    function WalkCommand(x, y, as, pl) {
        this._num = 0;
        this.x = x;
        this.y = y;
        this.aStar = as;
        this.Player = pl;
    }
    var d = __define,c=WalkCommand,p=c.prototype;
    p.execute = function (callback) {
        this.aStar.findPath(this.x, this.y);
        this.Player.Move(this.aStar.path, callback);
    };
    p.cancel = function (callback) {
        callback();
    };
    return WalkCommand;
}());
egret.registerClass(WalkCommand,'WalkCommand',["Command"]);
var FightCommand = (function () {
    function FightCommand(Monster, task, hero, Player) {
        this.T = task;
        this.M = Monster;
        this.h = hero;
        this.Player = Player;
    }
    var d = __define,c=FightCommand,p=c.prototype;
    p.execute = function (callback) {
        this.M.onButtonClick(this.h, this.Player);
    };
    p.cancel = function (callback) {
        callback();
    };
    return FightCommand;
}());
egret.registerClass(FightCommand,'FightCommand',["Command"]);
var TalkCommand = (function () {
    function TalkCommand(npc, main) {
        this.npc = npc;
        this.main = main;
    }
    var d = __define,c=TalkCommand,p=c.prototype;
    p.execute = function (callback) {
        this.npc.onNPCClick();
        this.main.addChild(this.npc.panel);
    };
    p.cancel = function (callback) {
        this.npc.panel.Close();
        callback();
    };
    return TalkCommand;
}());
egret.registerClass(TalkCommand,'TalkCommand',["Command"]);
var EquCommand = (function () {
    function EquCommand(e, h) {
        this.hero = h;
        this.equ = e;
    }
    var d = __define,c=EquCommand,p=c.prototype;
    p.execute = function (callback) {
        this.equ.press(this.hero);
    };
    p.cancel = function (callback) {
        callback();
    };
    return EquCommand;
}());
egret.registerClass(EquCommand,'EquCommand',["Command"]);
var CommandList = (function () {
    function CommandList() {
        this._list = [];
        this._frozen = false;
    }
    var d = __define,c=CommandList,p=c.prototype;
    p.addCommand = function (command) {
        this._list.push(command);
    };
    p.cancel = function () {
        var _this = this;
        this._frozen = true;
        var command = this.currentCommand;
        if (command) {
            command.cancel(function () {
                _this._frozen = false;
            });
            this._list = [];
        }
    };
    p.execute = function () {
        var _this = this;
        this.currentCommand = this._list.shift();
        if (this.currentCommand) {
            //     console.log("执行下一命令",this.currentCommand)
            this.currentCommand.execute(function () {
                _this.execute();
            });
        }
        else {
        }
    };
    return CommandList;
}());
egret.registerClass(CommandList,'CommandList');
//# sourceMappingURL=Command.js.map