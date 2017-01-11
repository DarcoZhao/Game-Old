// TypeScript file
class UIs {



    static getEqu(hero: Hero) {
        var GetPowerPic = this.createBitmapByName("Power_png");
        GetPowerPic.y = - GetPowerPic.height;
        GetPowerPic.x = - GetPowerPic.width / 2;
        hero.myplay.addChild(GetPowerPic);
        egret.setTimeout(function () {
            GetPowerPic.parent.removeChild(GetPowerPic);
        }, this, 2000);
    }

    static hurt(num: number, m: egret.DisplayObjectContainer) {
        var txt = new egret.TextField();
        txt.textColor = (num > 2000) ? 50000 : 20880;
        txt.text = "—" + num;
        txt.size = 80;

        m.addChild(txt);
        egret.Tween.get(txt).to({ "alpha": 0, y: -300 }, 1000);
        egret.setTimeout(function () {
            m.removeChild(txt);
        }, this, 1000);
    }

    static levelUp(hero: Hero) {
        var GetPowerPic = this.createBitmapByName("LevelUp_png");
        GetPowerPic.y = - GetPowerPic.height;
        GetPowerPic.x = - GetPowerPic.width / 2;
        hero.myplay.addChild(GetPowerPic);
        egret.setTimeout(function () {
            GetPowerPic.parent.removeChild(GetPowerPic);
        }, this, 2000);
    }



    static createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }


}