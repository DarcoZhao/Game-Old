// TypeScript file
class Fac {

    static makeAEuqe(num: number): Propertys {
        var p: Propertys;
        for (let equipConfig of Euqconfig) {
            if (equipConfig.id == num) {
                p = new Propertys(equipConfig.atk, equipConfig.crit, equipConfig.def, equipConfig.maxHP
                    , equipConfig.img, equipConfig.name);

                return p;

            }
        }

    }
    static makeAMon(num: number): Propertys {


        for (var i = 0; i < Mons.length; i++) {
            if (Mons[i].id == num) {

                var p = new Propertys(Mons[i].atk, Mons[i].crit, Mons[i].def, Mons[i].maxHP, 
                Mons[i].img, Mons[i].name);

                return p;

            }
        }
    }
}