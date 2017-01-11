// TypeScript file
var SenService = (function () {
    function SenService() {
        this.observerList = [];
        SenService.count++;
        if (SenService.count > 1) {
            throw 'singleton';
        }
    }
    var d = __define,c=SenService,p=c.prototype;
    SenService.getInstance = function () {
        if (SenService.instance == null) {
            SenService.instance = new SenService();
        }
        return SenService.instance;
    };
    p.addObserver = function (observer) {
        this.observerList.push(observer);
    };
    p.notify = function (id) {
        for (var _i = 0, _a = this.observerList; _i < _a.length; _i++) {
            var ob = _a[_i];
            ob.onChange(id);
        }
    };
    SenService.count = 0;
    return SenService;
}());
egret.registerClass(SenService,'SenService');
//# sourceMappingURL=Senservice.js.map