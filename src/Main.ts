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

    //{ tag: 2, name: "Atk1_png" },
    //{ tag: 2, name: "Atk2_png" },
    //{ tag: 2, name: "Atk3_png" },
    //{ tag: 2, name: "Atk4_png" },
]



class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;
    private Player = new PLAYER;
    private BigMap: MainMap = new MainMap();
    private myUser: User = new User();
    private commands = new CommandList();
    private As;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */



    private createGameScene(): void {
        var background: egret.Bitmap = this.createBitmapByName("Scene1_png");
        this.addChild(background);
        var stageW: number = this.stage.stageWidth;
        var stageH: number = this.stage.stageHeight;
        background.width = stageW;
        background.height = stageH;




        this.BigMap = new MainMap();
        this.Player = new PLAYER();


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

    }

    LoadUser() {
        var me = new Hero(4001, this.Player);
        this.myUser.addHero(me);


    }

    Equclick(e: EquButton) {

        this.commands.cancel();
        var ss = new Astar(this.BigMap, this.Player);
        var WC = new WalkCommand(this.normalize(e.x), this.normalize(e.y), ss, this.Player);
        this.commands.addCommand(WC);
        var EC = new EquCommand(e, this.myUser.myHero[0]);
        this.commands.addCommand(EC);
        this.commands.execute();
    }




    public LoadNPCandMon() {
        var taskser = TaskService.getInstance();
        var senceSer = ScreenService.getInstance();
        var trigger: Trigger = new Trigger(this);

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
        npc_0.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { this.NPCisClick(npc_0) }, this);
        npc_1.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { this.NPCisClick(npc_1) }, this);

        taskser.notify(taskser.taskList[0]);


        var Monster1 = new Monster(5001);

        this.addChild(Monster1);
        Monster1.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.MonCilck(Monster1, task1);
        }, this);
        Monster1.touchEnabled = true;


    }

    MonCilck(Monster: Monster, task: Task) {

        this.commands.cancel();

        var ss = new Astar(this.BigMap, this.Player);
        var WC = new WalkCommand(this.normalize(Monster.x), this.normalize(Monster.y), ss, this.Player);

        this.commands.addCommand(WC);
        var fightCommand = new FightCommand(Monster, task, this.myUser.myHero[0], this.Player);
        this.commands.addCommand(fightCommand);

        this.commands.execute();

    }

    NPCisClick(npc: NPC) {

        this.commands.cancel();

        var ss = new Astar(this.BigMap, this.Player);
        var WC = new WalkCommand(this.normalize(npc.x), this.normalize(npc.y), ss, this.Player);
        this.commands.addCommand(WC);
        var NT = new TalkCommand(npc, this);
        this.commands.addCommand(NT);

        this.commands.execute();
    }

    public LoadUI() {

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


        HeroP.myButton.addEventListener(egret.TouchEvent.TOUCH_TAP, () => (this.showHeroPanel(HeroP)), this);
        taskP.myButton.addEventListener(egret.TouchEvent.TOUCH_TAP, () => (this.showTaskPanel(taskP)), this);


    }

    showHeroPanel(HeroP: HeroPanel) {

        this.addChild(HeroP);
        HeroP.show(this.myUser.myHero[0]);
    }

    showTaskPanel(taskPanel: TaskPanel) {

        this.addChild(taskPanel);
        taskPanel.onShow();
    }

    private normalize(x: number): number {
        var k = 0;
        k = Math.floor(x / this.BigMap.TileSize);
        return k;
    }
    private convertNpcPosition(npc: { pos_x: number, pos_y: number, x: number, y: number }) {
        npc.x = Math.floor(npc.pos_x * this.BigMap.TileSize);
        npc.y = Math.floor(npc.pos_y * this.BigMap.TileSize);
    }



    private UserMove(evt: egret.TouchEvent): void {

        this.commands.cancel();

        var ss = new Astar(this.BigMap, this.Player);
        var WC = new WalkCommand(this.normalize(evt.stageX), this.normalize(evt.stageY), ss, this.Player);
        this.commands.addCommand(WC);
        this.commands.execute();

    }
    private print(bm: MainMap): void {
        var x = "";
        var i = 0, j = 0, k = 0;
        for (; j < bm.H; j++) {
            x = "";
            for (i = 0; i < bm.W; i++) {
                if (bm.MapTiles[k].canW == true)
                    x = x + "口";
                else { x = x + "国"; }
                k++;
            }
            console.log(x);
        }

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



    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield: egret.TextField, textFlow: Array<egret.ITextElement>): void {
        textfield.textFlow = textFlow;
    }
}

class FinishWalkEvent extends egret.Event {
    public static FW: string = "走完";
    //    public static isFw =false;
    public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }
}





