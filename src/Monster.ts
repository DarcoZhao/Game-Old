// TypeScript file

var Monsters =[
    {id:1001,name:"Monster",word:"咕唧咕唧",Hp:400,Def:0,Atk:80,Cri:0,exp:10,Ani:101,Ani2:102},
    {id:1002,name:"Boss",word:"你惹怒我了小子！",Hp:5000,Def:200,Atk:800,Cri:90,exp:100,Ani:201,Ani2:202},

]



class Monster extends egret.DisplayObjectContainer{

    photo:egret.Bitmap;
    myPros :Propertys = new Propertys();
    myname:egret.TextField=new egret.TextField();
    myId:number;
    
    constructor(n:number){
        
        super();
        this.myId=n;
        this.myPros=ThingsFactory.makeAMon(n);
        this.photo=this.createBitmapByName(this.myPros.img);
        this.addChild(this.photo);
        this.anchorOffsetX=this.photo.width/2;
        this.anchorOffsetY=this.photo.height;
        this.x=100;
        this.y=1050;
        this.myname.text=this.myPros.name;
        this.myname.y=this.photo.y-this.myname.height-5;
        this.addChild(this.myname);

    }
    onButtonClick(hero:Hero,player:Pole) {
        this.scaleX = (this.x < player.x) ? 1: -1
        player.Fight();
        var hurt1 = (hero.pros.all[0].value > this.myPros.all[2] .value)? hero.pros.all[0].value - this.myPros.all[2] .value :0 ;
        hurt1 +=  ( Math.random() <= hero.pros.all[1].value/100 ) ? hurt1 :0;
        this.myPros.all[3].value -= hurt1 ;
        var hurt2 = (this.myPros.all[0].value > hero.pros.all[2].value)? this.myPros.all[0].value - hero.pros.all[2].value:0;
        hero.pros.all[3].value -= hurt2;
        
        UIs.hurt(hurt1,this);
        egret.setTimeout(()=>player.Idle(),this,500);

       if(this.myPros.all[3].value<=0){     
            UIs.levelUp(hero);
              hero.Lvup();    
              var ss:SenService=SenService.getInstance();
              ss.notify(this.myId);
              this.parent.removeChild(this);
        }
    }
     private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}

class EquButton extends egret.DisplayObjectContainer{

    img:egret.Bitmap;
    ID:number;
    pos_x:number=300;
    pos_y:number=600;
    myEqu:Equipment;

    constructor(num:number) {
        super();
        this.ID = num;
        this.myEqu=new Equipment(this.ID);
      
        this.img=this.createBitmapByName(this.myEqu.basicP.img);
        this.addChild(this.img);
        this.x=this.pos_x;
        this.y=this.pos_y;

    }

    public press(hero:Hero){
         hero.addEquipment(this.myEqu);

         UIs.getEqu(hero);
         this.disapprear();
         
         var ss=SenService.getInstance();
         ss.notify(this.ID);

    }



    apprear(m:any) {
         this.alpha=0;
         m.addChild(this);
         this.touchEnabled=true;
         egret.Tween.get(this).to({"alpha": 1}, 1000);
         
    }

    disapprear(){
        
        this.touchEnabled=false;
        this.parent.removeChild(this);
    }



      private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}


var Mons= [
    {id: 5001,name:"Monster",atk: 100, def: 0, maxHP: 1400, crit:30, img: "Monster1_png"},
    {id: 5002,name:"Boss",atk: 50, def: 2000, maxHP: 10000, crit:30, img: "Monster2_png"}
]
