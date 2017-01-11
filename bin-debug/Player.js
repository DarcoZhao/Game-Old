// TypeScript file
var PLAYER = (function (_super) {
    __extends(PLAYER, _super);
    function PLAYER() {
        _super.call(this);
        this.mymodel = new egret.DisplayObjectContainer();
        this.nowDoing = 0;
        this.MySta = new StaMac;
        this.MoveSpeed = 20;
        this.Modle = 0;
        this.IdleAni = new Array();
        this.MoveAni = new Array();
        this.AtkAni = new Array();
        this.MyPhoto = this.createBitmapByName("Idle1_png");
        this.mymodel.addChild(this.MyPhoto);
        this.addChild(this.mymodel);
        this.LoadAni();
        this.mymodel.anchorOffsetX = this.MyPhoto.width / 2;
        this.mymodel.anchorOffsetY = this.MyPhoto.height;
        this.anchorOffsetX = this.mymodel.x;
        this.anchorOffsetY = this.mymodel.y;
    }
    var d = __define,c=PLAYER,p=c.prototype;
    p.LoadAni = function () {
        var texture;
        for (var i = 0; i < UserSequ.length; i++) {
            texture = RES.getRes(UserSequ[i].name);
            //         console.log(XulieZhen[i].tag);
            if (UserSequ[i].tag == 0) {
                this.IdleAni.push(texture);
            }
            if (UserSequ[i].tag == 1) {
                this.MoveAni.push(texture);
            }
            if (UserSequ[i].tag == 2) {
                this.AtkAni.push(texture);
            }
        }
    };
    p.PlayAni = function (Ani) {
        var count = 0;
        var Bit = this.MyPhoto;
        var M = this.Modle;
        //   console.log("M:"+M);
        var timer = new egret.Timer(125, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, Play, this);
        timer.start();
        function Play() {
            Bit.texture = Ani[count];
            if (count < Ani.length - 1) {
                //   console.log(Ani.length+" "+count);
                count++;
            }
            else {
                count = 0;
            }
            if (this.Modle != M) {
                //             console.log("tM:"+M+" nowM:"+this.Modle);
                timer.stop();
            }
        }
    };
    p.Move = function (Ps, callback) {
        var MS = new MoveSta(Ps, this, callback);
        this.MySta.Reload(MS);
    };
    p.Idle = function () {
        var IS = new IdleSta(this);
        this.MySta.Reload(IS);
    };
    p.Fight = function () {
        var FI = new FightSta(this);
        this.MySta.Reload(FI);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return PLAYER;
}(egret.DisplayObjectContainer));
egret.registerClass(PLAYER,'PLAYER');
var MoveSta = (function () {
    function MoveSta(Ps, Player, callback) {
        this.nowNode = 0;
        //  public isArrive:boolean=false;
        this.ArriveListener = new egret.Sprite();
        this.Lj = Ps;
        this.Player = Player;
        this.Cb = callback;
    }
    var d = __define,c=MoveSta,p=c.prototype;
    p.ArriveAndGoNextNodeListener = function (evt) {
        this.nowNode++;
        if (this.nowNode < this.Lj.length) {
            this.Move();
        }
        else {
            this.Player.Idle();
            this.Cb();
        }
    };
    p.Move = function () {
        var _this = this;
        var M = this.Player.Modle;
        this.Tx = this.Lj[this.nowNode].x;
        this.Ty = this.Lj[this.nowNode].y;
        //    console.log(this.Tx+" 和 "+this.Ty);
        var xx = this.Tx - this.Player.x;
        var yy = this.Ty - this.Player.y;
        if (xx > 0) {
            this.Player.mymodel.scaleX = -1;
        }
        else {
            this.Player.mymodel.scaleX = 1;
        }
        var zz = Math.pow(xx * xx + yy * yy, 0.5);
        var time = zz / this.Player.MoveSpeed;
        this.timer = new egret.Timer(50, time);
        this.LeastTime = time;
        this.timer.start();
        this.timer.addEventListener(egret.TimerEvent.TIMER, function () {
            _this.Player.x += xx / time;
            _this.Player.y += yy / time;
            _this.LeastTime--;
            if (_this.LeastTime < 1) {
                _this.timer.stop();
                if (_this.LeastTime > -10) {
                    var IFW = new FinishWalkEvent(FinishWalkEvent.FW);
                    _this.ArriveListener.dispatchEvent(IFW);
                } //
            }
        }, this);
    };
    p.Load = function () {
        if (this.Lj.length > 1)
            this.nowNode = 1;
        else
            this.nowNode = 0;
        this.ArriveListener.addEventListener(FinishWalkEvent.FW, this.ArriveAndGoNextNodeListener, this);
        this.Player.nowDoing = 1;
        this.Player.Modle++;
        this.Player.PlayAni(this.Player.MoveAni);
        this.Move();
    };
    p.exit = function () {
        this.LeastTime = -10;
        this.ArriveListener.removeEventListener(FinishWalkEvent.FW, this.ArriveAndGoNextNodeListener, this);
    };
    return MoveSta;
}());
egret.registerClass(MoveSta,'MoveSta',["Sta"]);
var IdleSta = (function () {
    function IdleSta(Player) {
        this.Player = Player;
    }
    var d = __define,c=IdleSta,p=c.prototype;
    p.Load = function () {
        //    console.log("Loadidle");
        this.Player.Modle++;
        this.Player.nowDoing = 0;
        this.Player.PlayAni(this.Player.IdleAni);
    };
    p.exit = function () {
    };
    return IdleSta;
}());
egret.registerClass(IdleSta,'IdleSta',["Sta"]);
var FightSta = (function () {
    function FightSta(Player) {
        this.Player = Player;
    }
    var d = __define,c=FightSta,p=c.prototype;
    p.Load = function () {
        this.Player.Modle++;
        this.Player.nowDoing = 2;
        this.Player.PlayAni(this.Player.AtkAni);
    };
    p.exit = function () {
    };
    return FightSta;
}());
egret.registerClass(FightSta,'FightSta',["Sta"]);
var StaMac = (function () {
    function StaMac() {
    }
    var d = __define,c=StaMac,p=c.prototype;
    p.Reload = function (S) {
        if (this.nowSta) {
            this.nowSta.exit();
        }
        this.nowSta = S;
        this.nowSta.Load();
    };
    return StaMac;
}());
egret.registerClass(StaMac,'StaMac');
//# sourceMappingURL=Player.js.map