// TypeScript file
var ThingsFactory = (function () {
    function ThingsFactory() {
    }
    var d = __define,c=ThingsFactory,p=c.prototype;
    ThingsFactory.makeAEuqe = function (num) {
        var p;
        for (var _i = 0, Euqconfig_1 = Euqconfig; _i < Euqconfig_1.length; _i++) {
            var equipConfig = Euqconfig_1[_i];
            if (equipConfig.id == num) {
                p = new Propertys(equipConfig.atk, equipConfig.crit, equipConfig.def, equipConfig.maxHP, equipConfig.img, equipConfig.name);
                return p;
            }
        }
    };
    ThingsFactory.makeAMon = function (num) {
        for (var i = 0; i < Mons.length; i++) {
            if (Mons[i].id == num) {
                var p = new Propertys(Mons[i].atk, Mons[i].crit, Mons[i].def, Mons[i].maxHP, Mons[i].img, Mons[i].name);
                return p;
            }
        }
    };
    return ThingsFactory;
}());
egret.registerClass(ThingsFactory,'ThingsFactory');
//# sourceMappingURL=Fac.js.map