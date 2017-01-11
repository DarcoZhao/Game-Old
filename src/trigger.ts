// TypeScript file
class Trigger implements Observer {

    Main;

    constructor(m: any) {
        this.Main = m;
    }

    onChange(task: Task) {
        this.check(task);
    }

    check(task: Task) {
        if (task.id == "task_02" && task.status == 2) {
            var Equ1 = new EquButton(1001);
            Equ1.apprear(this.Main);
            Equ1.addEventListener(egret.TouchEvent.TOUCH_TAP, () => (this.Main.Equclick(Equ1)), this);

        }
        if (task.id == "task_03" && task.status == 2) {

            var Monster1 = new Monster(5002);
            var t:TaskService=TaskService.getInstance();
            this.Main.addChild(Monster1);
            Monster1.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                this.Main.MonCilck(Monster1,t.taskList[3]);
            }, this);
            Monster1.touchEnabled = true;

        }
        if (task.id == "task_03" && task.status == 2) {

            var Equ3 = new EquButton(1005);
            Equ3.apprear(this.Main);
            Equ3.addEventListener(egret.TouchEvent.TOUCH_TAP, () => (this.Main.Equclick(Equ3)), this);
           

        }





    }

}
