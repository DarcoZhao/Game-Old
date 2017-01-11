// TypeScript file
class PLAYER extends egret.DisplayObjectContainer {
    public mymodel: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    public nowDoing = 0;
    public MyPhoto: egret.Bitmap;
    private MySta: StaMac = new StaMac;
    public MoveSpeed: number = 20;
    public Modle: number = 0;
    public IdleAni: Array<egret.Texture> = new Array<egret.Texture>();
    public MoveAni: Array<egret.Texture> = new Array<egret.Texture>();
    public AtkAni: Array<egret.Texture> = new Array<egret.Texture>();
    public constructor() {
        super();
        this.MyPhoto = this.createBitmapByName("Idle1_png");
        this.mymodel.addChild(this.MyPhoto);
        this.addChild(this.mymodel);

        this.LoadAni();

        this.mymodel.anchorOffsetX = this.MyPhoto.width / 2;
        this.mymodel.anchorOffsetY = this.MyPhoto.height;


        this.anchorOffsetX = this.mymodel.x;
        this.anchorOffsetY = this.mymodel.y;
    }
    private LoadAni() {
        var texture: egret.Texture;
        for (var i = 0; i < UserSequ.length; i++) {
            texture = RES.getRes(UserSequ[i].name);
            //         console.log(XulieZhen[i].tag);
            if (UserSequ[i].tag == 0) {
                this.IdleAni.push(texture);
                //    console.log("0");
            }
            if (UserSequ[i].tag == 1) {
                this.MoveAni.push(texture);
                //      console.log("1");
            }
            if (UserSequ[i].tag == 2) {
                this.AtkAni.push(texture);
                //      console.log("1");
            }
        }
    }

    public PlayAni(Ani: Array<egret.Texture>) {

        var count = 0;
        var Bit = this.MyPhoto;
        var M = this.Modle;
        //   console.log("M:"+M);
        var timer: egret.Timer = new egret.Timer(125, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, Play, this);
        timer.start();

        function Play() {
            Bit.texture = Ani[count];
            if (count < Ani.length - 1) {
                //   console.log(Ani.length+" "+count);
                count++;
            }
            else { count = 0; }
            if (this.Modle != M) {
                //             console.log("tM:"+M+" nowM:"+this.Modle);
                timer.stop();
            }
        }
    }

    public Move(Ps: Array<node>, callback: Function) {
        var MS: MoveSta = new MoveSta(Ps, this, callback);
        this.MySta.Reload(MS);
    }

    public Idle() {

        var IS: IdleSta = new IdleSta(this);
        this.MySta.Reload(IS);

    }
    public Fight() {

        var FI: FightSta = new FightSta(this);
        this.MySta.Reload(FI);

    }




    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}


interface Sta {
    Load();
    exit();

}

class MoveSta implements Sta {
    private Tx: number;
    private Ty: number;
    private Player: PLAYER;
    private timer: egret.Timer;
    private LeastTime: number;
    public Lj: Array<node>;
    public nowNode: number = 0;
    public Cb: Function;

    //  public isArrive:boolean=false;
    public ArriveListener: egret.Sprite = new egret.Sprite();

    constructor(Ps: Array<node>, Player: PLAYER, callback: Function) {
        this.Lj = Ps;
        this.Player = Player;
        this.Cb = callback;

    }
    ArriveAndGoNextNodeListener(evt: FinishWalkEvent) {
        this.nowNode++;
        if (this.nowNode < this.Lj.length) {
            this.Move();
        }
        else {
            this.Player.Idle();
            this.Cb();
        }

    }

    Move() {
        var M = this.Player.Modle;
        this.Tx = this.Lj[this.nowNode].x;
        this.Ty = this.Lj[this.nowNode].y;
        //    console.log(this.Tx+" 和 "+this.Ty);
        var xx = this.Tx - this.Player.x;
        var yy = this.Ty - this.Player.y;
        if (xx > 0) { this.Player.mymodel.scaleX = -1; } else { this.Player.mymodel.scaleX = 1; }
        var zz = Math.pow(xx * xx + yy * yy, 0.5);
        var time: number = zz / this.Player.MoveSpeed;
        this.timer = new egret.Timer(50, time);
        this.LeastTime = time;
        this.timer.start();

        this.timer.addEventListener(egret.TimerEvent.TIMER, () => {
            this.Player.x += xx / time;
            this.Player.y += yy / time;
            this.LeastTime--;
            if (this.LeastTime < 1) {
                this.timer.stop();
                if (this.LeastTime > -10) {
                    var IFW: FinishWalkEvent = new FinishWalkEvent(FinishWalkEvent.FW);
                    this.ArriveListener.dispatchEvent(IFW);
                }//

            }
        }, this);


    }
    Load() {
        if (this.Lj.length > 1)
            this.nowNode = 1;
        else this.nowNode = 0;
        this.ArriveListener.addEventListener(FinishWalkEvent.FW, this.ArriveAndGoNextNodeListener, this);
        this.Player.nowDoing = 1;
        this.Player.Modle++;
        this.Player.PlayAni(this.Player.MoveAni);
        this.Move();
    }
    exit() {
        this.LeastTime = -10;
        this.ArriveListener.removeEventListener(FinishWalkEvent.FW, this.ArriveAndGoNextNodeListener, this);
    }
}

class IdleSta implements Sta {
    private Player: PLAYER;
    constructor(Player: PLAYER) {
        this.Player = Player;
    }
    Load() {
        //    console.log("Loadidle");
        this.Player.Modle++;
        this.Player.nowDoing = 0;
        this.Player.PlayAni(this.Player.IdleAni);
    }
    exit() {

    }

}

class FightSta implements Sta {
    private Player: PLAYER;

    constructor(Player: PLAYER) {
        this.Player = Player;
    }
    Load() {

        this.Player.Modle++;
        this.Player.nowDoing = 2;
        this.Player.PlayAni(this.Player.AtkAni);
    }
    exit() {

    }

}



class StaMac {
    private nowSta: Sta;

    public Reload(S: Sta): void {
        if (this.nowSta) {
            this.nowSta.exit();
        }
        this.nowSta = S;

        this.nowSta.Load();
    }
}



