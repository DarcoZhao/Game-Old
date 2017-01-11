// TypeScript file
var ScreenService = (function () {
    function ScreenService() {
        this.observerList = [];
        ScreenService.count++;
        if (ScreenService.count > 1) {
            throw 'singleton';
        }
    }
    var d = __define,c=ScreenService,p=c.prototype;
    ScreenService.getInstance = function () {
        if (ScreenService.instance == null) {
            ScreenService.instance = new ScreenService();
        }
        return ScreenService.instance;
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
    ScreenService.count = 0;
    return ScreenService;
}());
egret.registerClass(ScreenService,'ScreenService');
//# sourceMappingURL=ScreenService.js.map