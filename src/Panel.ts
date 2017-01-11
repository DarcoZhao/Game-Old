// TypeScript file
class HeroPanel extends egret.DisplayObjectContainer {


    myButton:egret.Bitmap;
    cancelButton:egret.Bitmap=this.createBitmapByName("Concel_png");
    myImg = this.createBitmapByName("UserPanel_jpg");
    heroimg = new egret.Bitmap();
    equ1 = new egret.Bitmap();
    equ2 = new egret.Bitmap();
    equ3 = new egret.Bitmap();
    texts = new egret.DisplayObjectContainer();
    equPanel = new EuqPanel();
    equments:Equipment[]=[];

    constructor() {

        super();
        this.myImg.width = 1200;
        this.myImg.height = 1200;
        this.heroimg.x = this.heroimg.y = 100;
        this.equ1.x = 500;
        this.equ2.x = 500;
        this.equ3.x = 500;
        this.equ1.y = 100;
        this.equ2.y = 350;
        this.equ3.y = 600;
        this.texts.y = 850;
        this.texts.x = 50;

        this.addChild(this.myImg);
        this.addChild(this.heroimg);
        this.addChild(this.equ1);
        this.addChild(this.equ2);
        this.addChild(this.equ3);
        this.addChild(this.texts);
        this.addChild(this.cancelButton);
        
        
        
        this.myButton=this.createBitmapByName("HeroButton_png");
        
        this.cancelButton.x=this.cancelButton.width;
        this.cancelButton.y=this.cancelButton.height;


        this.equ1.touchEnabled=true;
        this.equ1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{this.mouseDown(this.equ1,0)}, this);
        this.equ1.addEventListener(egret.TouchEvent.TOUCH_END,()=>{this.mouseUp()}, this);

        this.equ2.touchEnabled=true;
        this.equ2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{this.mouseDown(this.equ2,1)}, this);
        this.equ2.addEventListener(egret.TouchEvent.TOUCH_END,()=>{this.mouseUp()}, this);

        this.equ3.touchEnabled=true;
        this.equ3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{this.mouseDown(this.equ3,2)}, this);
        this.equ3.addEventListener(egret.TouchEvent.TOUCH_END,()=>{this.mouseUp()}, this);

        this.cancelButton.touchEnabled=true;
        this.cancelButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClick,this);

    }

    public show(hero: Hero) {
        this.heroimg.texture = RES.getRes(hero.basicP.img);

        if(hero.myEquipments){

        if (hero.myEquipments[0]) {
            console.log(hero.myEquipments[0].pros.all[0]);
            this.equ1.texture = RES.getRes(hero.myEquipments[0].basicP.img);
            this.equments.push(hero.myEquipments[0]);
        }

        if (hero.myEquipments[1]) {
            console.log(hero.myEquipments[1].pros.all[0]);
            this.equ2.texture = RES.getRes(hero.myEquipments[1].basicP.img);
            this.equments.push(hero.myEquipments[1]);
        }

        if (hero.myEquipments[2]) {
            console.log(hero.myEquipments[2].pros.all[0]);
            this.equ3.texture = RES.getRes(hero.myEquipments[2].basicP.img);
            this.equments.push(hero.myEquipments[2]);
        }
        }
        this.texts.addChild(PropertiesDispalyUtils.creatAllDecr(hero.pros));


    }

     onButtonClick() {
        this.parent.removeChild(this);
        this.texts.removeChildren();
    }

    mouseDown(e:egret.Bitmap,n:number){
      
        this.equPanel.show(this.equments[n]);
        this.addChild(this.equPanel);
        this.equPanel.x=e.x-this.equPanel.width;
        this.equPanel.y=e.y;
    }

    mouseUp(){
    
        this.removeChild(this.equPanel);
        this.equPanel.close();
       
    }

    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}


class EuqPanel extends egret.DisplayObjectContainer {

    myImg = this.createBitmapByName("EuqP_png");
    
    jem1 = new egret.Bitmap();
    jem2 = new egret.Bitmap();
    jem3 = new egret.Bitmap();
    texts = new egret.DisplayObjectContainer();

    Gems:gem[] =[];

    constructor() {

        super();

        this.jem1.x = 10;
        this.jem1.y = 300;
        this.jem2.x = 110;
        this.jem2.y = 300;
        this.jem3.x = 210;
        this.jem3.y = 300;
        this.texts.y = 10;
        this.texts.x = 10;
        this.addChild(this.myImg);
        this.addChild(this.jem1);
        this.addChild(this.jem2);
        this.addChild(this.jem3);
        this.addChild(this.texts);

        

    }


    public show(Equ: Equipment) {
       if(Equ.myGams){
        if (Equ.myGams[0]) {
            this.jem1.texture = RES.getRes(Equ.myGams[0].basicP.img);
            this.Gems.push(Equ.myGams[0]);
        }
        if (Equ.myGams[1]) {
            this.jem2.texture = RES.getRes(Equ.myGams[1].basicP.img);
            this.Gems.push(Equ.myGams[1]);
        }

        if (Equ.myGams[2]) {
            this.jem3.texture = RES.getRes(Equ.myGams[2].basicP.img);
            this.Gems.push(Equ.myGams[2]);
        }
       }
        this.texts.addChild(PropertiesDispalyUtils.creatAllDecr(Equ.pros));
    }

    public close(){
        this.jem1.texture = null;
        this.jem2.texture = null;
        this.jem3.texture = null;
        this.texts.removeChildren();
        for(var i=0;i<this.Gems.length;i++)
        this.Gems.pop();
        
       
    }
    

    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}




class PropertiesDispalyUtils {

    static creatAllDecr(pros: Propertys) {
        var con = new egret.DisplayObjectContainer();
        var y = 10;
        var t = new egret.TextField();
        t.text = pros.name;
        t.y = y;
        y += t.height;
        con.addChild(t);
        for (var p of pros.all) {
            var tf = new egret.TextField();
            tf.text = PropertiesDispalyUtils.getDescr(p);
            tf.y = y;
            y += tf.height;
            con.addChild(tf);
        }

        return con;
    }

    static getDescr(pro: Property) {
        if (pro.isDate)
            return pro.name + ": " + (pro.value).toFixed(1) + "%";
        else {
            return pro.name + ": " + pro.value;
        }
    }
}
