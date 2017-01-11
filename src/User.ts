// TypeScript file
var Cache: MethodDecorator = (target: any, propertyName, desc: PropertyDescriptor) => {
    const getter = desc.get;

    desc.get = function () {
        var cacheKey = "_cache" + propertyName;

        if (this[cacheKey] == 0 || this["flag"]) {
            this[cacheKey] = getter.apply(this);
            this["flag"] = true;

        } else console.log("未算");

        return this[cacheKey];
    }

    return desc;
}



class User {

    private Gold = 0;
    private Lv = 1;
    private flag = false;


    myHero: Hero[] = [];

    private _cachemyPower = 0;


    public get myPower(): number {

        var add = 0;

        for (let h of this.myHero) {
            add += h.myPower;
        }

        return add;
    }

    public addHero(H: Hero) {
        this.myHero.push(H);
        this.flag = true;
        this.myPower;
    }


}

class Hero {

    private Lv = 1;
    private HP = 1;

    private flag = false;
    myEquipments: Equipment[] = [];
    myplay:egret.DisplayObjectContainer;

    pros: Propertys = new Propertys();
    basicP:Propertys  = new Propertys();

    constructor(ID: number,player:egret.DisplayObjectContainer) {
        this.basicP = ThingsFactory.makeAEuqe(ID);
          this.pros = ThingsFactory.makeAEuqe(ID);
        this.myplay =player;
    }

    public Lvup() {
        this.Lv++;
        this.myPower;
        
    }

    private get maxHP(): number {
        this.pros.all[3].value = 0;
        this.pros.all[3].value += this.Lv * 10;
        this.pros.all[3].value += this.basicP.all[3].value;
        this.myEquipments.forEach(Eq => this.pros.all[3].value += Eq.maxHP);

        return this.pros.all[3].value;
    };


    private get Att(): number {

       this.pros.all[0].value= 0;
        this.pros.all[0].value += this.Lv * 10;
        this.pros.all[0].value += this.basicP.all[0].value;
    
        this.myEquipments.forEach(Eq => this.pros.all[0].value += Eq.Att);

        
        return this.pros.all[0].value;

    }


    private get Def(): number {

         this.pros.all[2].value =0;
         this.pros.all[2].value += this.Lv * 10;
        this.pros.all[2].value += this.basicP.all[2].value;
        this.myEquipments.forEach(Eq =>  this.pros.all[2].value += Eq.Def)
        return  this.pros.all[2].value;

    };

     private get Cri(): number {

        this.pros.all[1].value =0;
        this.pros.all[1].value += this.Lv * 1;
        this.pros.all[1].value += this.basicP.all[1].value;
        this.myEquipments.forEach(Eq =>  this.pros.all[1].value += Eq.Cri)

   //     console.log("hero的攻击"+this.pros.all[1].value);
        return  this.pros.all[1].value;

    };


    public get myPower(): number {
        return this.maxHP + this.Att + this.Def + this.Cri;
    }
    public addEquipment(E: Equipment) {
        this.myEquipments.push(E);
        this.flag = true;
        this.myPower;
    }

}




class Equipment {

   
    private flag = false;

    pros: Propertys = new Propertys();
    basicP:Propertys  = new Propertys();


    constructor(ID: number) {
      this.basicP = ThingsFactory.makeAEuqe(ID);
  this.pros = ThingsFactory.makeAEuqe(ID);
    }


    get maxHP() {
        this.pros.all[3].value = 0;
        this.pros.all[3].value += this.basicP.all[3].value;
        this.myGams.forEach(Eq => this.pros.all[3].value += Eq.basicP.all[3].value);
     
        return  this.pros.all[3].value;

    };

    get Att() {
         this.pros.all[0].value =0;
         this.pros.all[0].value += this.basicP.all[0].value;
        this.myGams.forEach(Eq =>  this.pros.all[0].value += Eq.basicP.all[0].value);

     
        return  this.pros.all[0].value;

    };

    get Def() {
         this.pros.all[2].value=0;
         this.pros.all[2].value += this.basicP.all[2].value;
         this.myGams.forEach(Eq =>  this.pros.all[2].value += Eq.basicP.all[2].value);
        return  this.pros.all[2].value;

    };

     get Cri() {
         this.pros.all[1].value=0;
         this.pros.all[1].value += this.basicP.all[1].value;
         this.myGams.forEach(Eq =>  this.pros.all[1].value += Eq.basicP.all[1].value);

   //     console.log("zb的攻击"+this.pros.all[1].value);
        return  this.pros.all[1].value;

    };


    myGams: gem[] = [];


    public addGem(G: gem) {
        this.myGams.push(G);
        this.flag = true;
    }

}


class gem {

    private ID = 0;
    private name: string;
    basicP:Propertys  = new Propertys();
    pros: Propertys = new Propertys();


    constructor(ID: number) {
        this.basicP = ThingsFactory.makeAEuqe(ID);
          this.pros = ThingsFactory.makeAEuqe(ID);
    }
}




class Property {

    name: string;
    value: number;
    isDate: boolean;

    constructor(na: string, va: number, is?: boolean) {
        this.name = na;
        this.value = va;
        if (is)
            this.isDate = is;
    }
  
}



class Propertys {

    name: string;
    img: string;

    all: Property[] = [
        new Property("攻击", 0),
        new Property("暴击", 0, true),
        new Property("防御", 0),
        new Property("生命", 0)
    ]


    constructor(n1?, n2?, n3?, n4?, n5?, n6?) {
        if (n1) {
            this.img = n5;
            this.name = n6;
            this.all = [
                new Property("攻击", n1),
                new Property("暴击", n2, true),
                new Property("防御", n3),
                new Property("生命", n4)
            ]

        }
    }


}





var Euqconfig = [
    { id: 1001, name: "spear", atk: 120, def: 0, maxHP: 10, crit: 10, img: "spear_png" },
    { id: 1002, name: "spear", atk: 220, def: 0, maxHP: 0, crit: 0, img: "spear1_png" },
    { id: 1003, name: "great spear", atk: 420, def: 200, maxHP: 100, crit: 50, img: "spear2_png" },

    { id: 2001, name: "armour", atk: 20, def: 200, maxHP: 200, crit: 0, img: "armour_png" },
    { id: 2002, name: "hat", atk: 80, def: 300, maxHP: 300, crit: 0, img: "hat_png" },
    { id: 2003, name: "shoes", atk: 2333, def: 3600, maxHP: 10000, crit: 20, img: "shoes_png" },
    { id: 2004, name: "great shoes", atk: 200, def: 50, maxHP: 20, crit: 0, img: "shoes2_png" },

    { id: 3001, name: "AttDia", atk: 300, def: 0, maxHP: 0, crit: 0, img: "Dia2_png" },
    { id: 3002, name: "ProDia", atk: 20, def: 400, maxHP: 400, crit: 0, img: "Dia2_png" },
    { id: 3003, name: "HpDia", atk: 20, def: 400, maxHP: 400, crit: 0, img: "Dia1_png" },

    { id: 4001, name: "Monster", atk: 1000, def: 600, maxHP: 1400, crit:30, img: "Monster_png" },
]




