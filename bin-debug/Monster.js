// TypeScript file
var Monsters = [
    { id: 1001, name: "Monster", word: "咕唧咕唧", Hp: 400, Def: 0, Atk: 80, Cri: 0, exp: 10, Ani: 101, Ani2: 102 },
    { id: 1002, name: "Boss", word: "你惹怒我了小子！", Hp: 5000, Def: 200, Atk: 800, Cri: 90, exp: 100, Ani: 201, Ani2: 202 },
];
var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster(n) {
        _super.call(this);
        this.myPros = new Propertys();
        this.myname = new egret.TextField();
        this.myId = n;
        this.myPros = ThingsFactory.makeAMon(n);
        this.photo = this.createBitmapByName(this.myPros.img);
        this.addChild(this.photo);
        this.anchorOffsetX = this.photo.width / 2;
        this.anchorOffsetY = this.photo.height;
        this.x = 600;
        this.y = 1000;
        this.myname.text = this.myPros.name;
        this.myname.y = this.photo.y - this.myname.height - 5;
        this.addChild(this.myname);
    }
    var d = __define,c=Monster,p=c.prototype;
    p.onButtonClick = function (hero, player) {
        this.scaleX = (this.x < player.x) ? 1 : -1;
        player.Fight();
        var hurt1 = (hero.pros.all[0].value > this.myPros.all[2].value) ? hero.pros.all[0].value - this.myPros.all[2].value : 0;
        hurt1 += (Math.random() <= hero.pros.all[1].value / 100) ? hurt1 : 0;
        this.myPros.all[3].value -= hurt1;
        var hurt2 = (this.myPros.all[0].value > hero.pros.all[2].value) ? this.myPros.all[0].value - hero.pros.all[2].value : 0;
        hero.pros.all[3].value -= hurt2;
        UIs.hurt(hurt1, this);
        egret.setTimeout(function () { return player.Idle(); }, this, 500);
        if (this.myPros.all[3].value <= 0) {
            UIs.levelUp(hero);
            hero.Lvup();
            var ss = SenService.getInstance();
            ss.notify(this.myId);
            this.parent.removeChild(this);
        }
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Monster;
}(egret.DisplayObjectContainer));
egret.registerClass(Monster,'Monster');
var EquButton = (function (_super) {
    __extends(EquButton, _super);
    function EquButton(num) {
        _super.call(this);
        this.pos_x = 300;
        this.pos_y = 600;
        this.ID = num;
        this.myEqu = new Equipment(this.ID);
        this.img = this.createBitmapByName(this.myEqu.basicP.img);
        this.addChild(this.img);
        this.x = this.pos_x;
        this.y = this.pos_y;
    }
    var d = __define,c=EquButton,p=c.prototype;
    p.press = function (hero) {
        hero.addEquipment(this.myEqu);
        UIs.getEqu(hero);
        this.disapprear();
        var ss = SenService.getInstance();
        ss.notify(this.ID);
    };
    p.apprear = function (m) {
        this.alpha = 0;
        m.addChild(this);
        this.touchEnabled = true;
        egret.Tween.get(this).to({ "alpha": 1 }, 1000);
    };
    p.disapprear = function () {
        this.touchEnabled = false;
        this.parent.removeChild(this);
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return EquButton;
}(egret.DisplayObjectContainer));
egret.registerClass(EquButton,'EquButton');
var Mons = [
    { id: 5001, name: "Monster", atk: 100, def: 0, maxHP: 1400, crit: 30, img: "Monster1_png" },
    { id: 5002, name: "Boss", atk: 50, def: 2000, maxHP: 10000, crit: 30, img: "Monster2_png" }
];
//# sourceMappingURL=Monster.js.map