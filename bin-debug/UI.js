// TypeScript file
var UIs = (function () {
    function UIs() {
    }
    var d = __define,c=UIs,p=c.prototype;
    UIs.getEqu = function (hero) {
        var GetPowerPic = this.createBitmapByName("Power_png");
        GetPowerPic.y = -GetPowerPic.height;
        GetPowerPic.x = -GetPowerPic.width / 2;
        hero.myplay.addChild(GetPowerPic);
        egret.setTimeout(function () {
            GetPowerPic.parent.removeChild(GetPowerPic);
        }, this, 2000);
    };
    UIs.hurt = function (num, m) {
        var txt = new egret.TextField();
        txt.textColor = (num > 2000) ? 50000 : 20880;
        txt.text = "—" + num;
        txt.size = 80;
        m.addChild(txt);
        egret.Tween.get(txt).to({ "alpha": 0, y: -300 }, 1000);
        egret.setTimeout(function () {
            m.removeChild(txt);
        }, this, 1000);
    };
    UIs.levelUp = function (hero) {
        var GetPowerPic = this.createBitmapByName("LevelUp_png");
        GetPowerPic.y = -GetPowerPic.height;
        GetPowerPic.x = -GetPowerPic.width / 2;
        hero.myplay.addChild(GetPowerPic);
        egret.setTimeout(function () {
            GetPowerPic.parent.removeChild(GetPowerPic);
        }, this, 2000);
    };
    UIs.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return UIs;
}());
egret.registerClass(UIs,'UIs');
//# sourceMappingURL=UI.js.map