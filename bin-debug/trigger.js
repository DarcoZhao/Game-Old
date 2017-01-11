// TypeScript file
var Trigger = (function () {
    function Trigger(m) {
        this.Main = m;
    }
    var d = __define,c=Trigger,p=c.prototype;
    p.onChange = function (task) {
        this.check(task);
    };
    p.check = function (task) {
        var _this = this;
        if (task.id == "task_02" && task.status == 2) {
            var Equ1 = new EquButton(1001);
            Equ1.apprear(this.Main);
            Equ1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { return (_this.Main.Equclick(Equ1)); }, this);
        }
        if (task.id == "task_03" && task.status == 2) {
            var Monster1 = new Monster(5002);
            var t = TaskService.getInstance();
            this.Main.addChild(Monster1);
            Monster1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.Main.MonCilck(Monster1, t.taskList[3]);
            }, this);
            Monster1.touchEnabled = true;
        }
        if (task.id == "task_03" && task.status == 2) {
            var Equ3 = new EquButton(1005);
            Equ3.apprear(this.Main);
            Equ3.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { return (_this.Main.Equclick(Equ3)); }, this);
        }
    };
    return Trigger;
}());
egret.registerClass(Trigger,'Trigger',["Observer"]);
//# sourceMappingURL=trigger.js.map