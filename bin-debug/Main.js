//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////、
var UserSequ = [
    { tag: 0, name: "Idle1_png" },
    { tag: 0, name: "Idle2_png" },
    { tag: 0, name: "Idle3_png" },
    { tag: 0, name: "Idle4_png" },
    { tag: 1, name: "L1_png" },
    { tag: 1, name: "L2_png" },
    { tag: 1, name: "L3_png" },
    { tag: 1, name: "L4_png" },
];
var Pole = (function (_super) {
    __extends(Pole, _super);
    function Pole() {
        _super.call(this);
        this.mymodel = new egret.DisplayObjectContainer();
        this.nowDoing = 0;
        this.MySta = new StaMac;
        this.MoveSpeed = 20;
        this.ChaTime = 150;
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
    var d = __define,c=Pole,p=c.prototype;
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
    return Pole;
}(egret.DisplayObjectContainer));
egret.registerClass(Pole,'Pole');
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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.Player = new Pole;
        this.BigMap = new MainMap();
        this.myUser = new User();
        this.commands = new CommandList();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    p.createGameScene = function () {
        var background = this.createBitmapByName("Scene1_png");
        this.addChild(background);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        background.width = stageW;
        background.height = stageH;
        this.BigMap = new MainMap();
        this.Player = new Pole();
        this.addChild(this.BigMap);
        //     this.dayin(this.BigMap);
        this.addChild(this.Player);
        this.Player.x = this.Player.y = 650;
        this.Player.Idle();
        background.touchEnabled = true;
        background.addEventListener(egret.TouchEvent.TOUCH_TAP, this.UserMove, this);
        this.LoadUI();
        this.LoadNPCandMon();
        this.LoadUser();
    };
    p.LoadUser = function () {
        var me = new Hero(4001, this.Player);
        this.myUser.addHero(me);
    };
    p.Equclick = function (e) {
        this.commands.cancel();
        var ss = new Astar(this.BigMap, this.Player);
        var WC = new WalkCommand(this.normalize(e.x), this.normalize(e.y), ss, this.Player);
        this.commands.addCommand(WC);
        var EC = new EquCommand(e, this.myUser.myHero[0]);
        this.commands.addCommand(EC);
        this.commands.execute();
    };
    p.LoadNPCandMon = function () {
        var _this = this;
        var taskser = TaskService.getInstance();
        var senceSer = SenService.getInstance();
        var trigger = new Trigger(this);
        taskser.observerList.push(trigger);
        var dp = new DialoguePanel();
        var npc_0 = new NPC(0, dp);
        var npc_1 = new NPC(1, dp);
        var task0 = new Task(Tasks[0].id, Tasks[0].name, Tasks[0].desc, TaskStatus.ACCEPTABLE, Tasks[0].fromNPCid, Tasks[0].toNPCid, Tasks[0].condition, Tasks[0].nexttaskid);
        var task1 = new Task(Tasks[1].id, Tasks[1].name, Tasks[1].desc, TaskStatus.UNACCEPTABLE, Tasks[1].fromNPCid, Tasks[1].toNPCid, Tasks[1].condition, Tasks[1].nexttaskid);
        var task2 = new Task(Tasks[2].id, Tasks[2].name, Tasks[2].desc, TaskStatus.UNACCEPTABLE, Tasks[2].fromNPCid, Tasks[2].toNPCid, Tasks[2].condition, Tasks[2].nexttaskid);
        var task3 = new Task(Tasks[3].id, Tasks[3].name, Tasks[3].desc, TaskStatus.UNACCEPTABLE, Tasks[3].fromNPCid, Tasks[3].toNPCid, Tasks[3].condition, Tasks[3].nexttaskid);
        this.addChild(npc_0);
        this.addChild(npc_1);
        this.convertNpcPosition(npc_0);
        this.convertNpcPosition(npc_1);
        taskser.observerList.push(npc_0);
        taskser.observerList.push(npc_1);
        taskser.taskList.push(task0);
        taskser.taskList.push(task1);
        taskser.taskList.push(task2);
        taskser.taskList.push(task3);
        npc_0.touchEnabled = true;
        npc_1.touchEnabled = true;
        npc_0.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.NPCisClick(npc_0); }, this);
        npc_1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.NPCisClick(npc_1); }, this);
        taskser.notify(taskser.taskList[0]);
        var Monster1 = new Monster(5001);
        this.addChild(Monster1);
        Monster1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.MonCilck(Monster1, task1);
        }, this);
        Monster1.touchEnabled = true;
    };
    p.MonCilck = function (Monster, task) {
        this.commands.cancel();
        var ss = new Astar(this.BigMap, this.Player);
        var WC = new WalkCommand(this.normalize(Monster.x), this.normalize(Monster.y), ss, this.Player);
        this.commands.addCommand(WC);
        var fightCommand = new FightCommand(Monster, task, this.myUser.myHero[0], this.Player);
        this.commands.addCommand(fightCommand);
        this.commands.execute();
    };
    p.NPCisClick = function (npc) {
        this.commands.cancel();
        var ss = new Astar(this.BigMap, this.Player);
        var WC = new WalkCommand(this.normalize(npc.x), this.normalize(npc.y), ss, this.Player);
        this.commands.addCommand(WC);
        var NT = new TalkCommand(npc, this);
        this.commands.addCommand(NT);
        this.commands.execute();
    };
    p.LoadUI = function () {
        var _this = this;
        var HeroP = new HeroPanel();
        var taskP = new TaskPanel();
        var taskser = TaskService.getInstance();
        taskser.observerList.push(taskP);
        taskP.myButton.x = this.stage.stageWidth - taskP.myButton.width;
        taskP.myButton.y = 0;
        this.addChild(taskP.myButton);
        HeroP.myButton.x = taskP.myButton.x - 20 - HeroP.myButton.width;
        HeroP.myButton.y = 0;
        this.addChild(HeroP.myButton);
        HeroP.myButton.touchEnabled = true;
        taskP.myButton.touchEnabled = true;
        HeroP.myButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { return (_this.showHeroPanel(HeroP)); }, this);
        taskP.myButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { return (_this.showTaskPanel(taskP)); }, this);
    };
    p.showHeroPanel = function (HeroP) {
        this.addChild(HeroP);
        HeroP.show(this.myUser.myHero[0]);
    };
    p.showTaskPanel = function (taskPanel) {
        this.addChild(taskPanel);
        taskPanel.onShow();
    };
    p.normalize = function (x) {
        var k = 0;
        k = Math.floor(x / this.BigMap.TileSize);
        return k;
    };
    p.convertNpcPosition = function (npc) {
        npc.x = Math.floor(npc.pos_x * this.BigMap.TileSize);
        npc.y = Math.floor(npc.pos_y * this.BigMap.TileSize);
    };
    p.UserMove = function (evt) {
        this.commands.cancel();
        var ss = new Astar(this.BigMap, this.Player);
        var WC = new WalkCommand(this.normalize(evt.stageX), this.normalize(evt.stageY), ss, this.Player);
        this.commands.addCommand(WC);
        this.commands.execute();
    };
    p.print = function (bm) {
        var x = "";
        var i = 0, j = 0, k = 0;
        for (; j < bm.H; j++) {
            x = "";
            for (i = 0; i < bm.W; i++) {
                if (bm.MapTiles[k].canW == true)
                    x = x + "口";
                else {
                    x = x + "国";
                }
                k++;
            }
            console.log(x);
        }
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
    /**
     * 切换描述内容
     * Switch to described content
     */
    p.changeDescription = function (textfield, textFlow) {
        textfield.textFlow = textFlow;
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
var FinishWalkEvent = (function (_super) {
    __extends(FinishWalkEvent, _super);
    //    public static isFw =false;
    function FinishWalkEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=FinishWalkEvent,p=c.prototype;
    FinishWalkEvent.FW = "走完";
    return FinishWalkEvent;
}(egret.Event));
egret.registerClass(FinishWalkEvent,'FinishWalkEvent');
//# sourceMappingURL=Main.js.map