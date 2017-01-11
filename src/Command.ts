// TypeScript file
interface Command {
   

    execute(callback: Function): void;

    cancel(callback: Function): void;

}




class WalkCommand implements Command {
    
    private x;
    private y;
    public aStar:Astar;
    Player:Pole;
    _num =0;


    constructor(x: number, y: number,as:Astar,pl:Pole) {
        this.x = x;
        this.y = y;
        this.aStar=as;
        this.Player=pl;
    }

    execute(callback: Function): void {
      this.aStar.findPath(this.x,this.y);
      this.Player.Move(this.aStar.path,callback);
  
      
    }

    cancel(callback: Function) {
        callback();
    }
}

class FightCommand implements Command {

    
    M:Monster;
    T:Task;
    h:Hero;
    Player:Pole;
    
    constructor(Monster: Monster, task: Task,hero:Hero,Player:Pole){
        this.T=task;
        this.M=Monster;
        this.h=hero;
        this.Player=Player;

    }

    execute(callback: Function): void {
        this.M.onButtonClick(this.h,this.Player);
        
        
    }

    cancel(callback: Function) {
        callback();

    }
}





class TalkCommand implements Command {

    private npc:NPC;
    private main;
    

    constructor(npc:NPC,main){
    
     this.npc=npc;
     this.main=main;

    }

    execute(callback: Function): void {
        this.npc.onNPCClick();
        this.main.addChild(this.npc.panel);
     
    }

    cancel(callback: Function) {
       this.npc.panel.Close();
       callback();
    }
}

class EquCommand implements Command {

   
    hero:Hero;
    equ:EquButton;
    
    
    constructor(e:EquButton,h:Hero) {
        this.hero=h;
        this.equ=e;
       

    }

    execute(callback: Function): void {
        this.equ.press(this.hero);
       
    }

    cancel(callback: Function) {

        callback();
    

    }
}





class CommandList {

    private _list: Command[] = [];
    private currentCommand: Command;
    private _frozen = false;

    addCommand(command: Command) {
        this._list.push(command);
    }

    cancel() {
        this._frozen = true;
        var command = this.currentCommand;

       if (command) {
            command.cancel(() => {
                this._frozen = false;
            });
            
            this._list = [];
    }

    }

    execute() {
        this.currentCommand = this._list.shift();
        if (this.currentCommand) {
       //     console.log("执行下一命令",this.currentCommand)
           this.currentCommand.execute(()=>{
                this.execute()
            })
        }
        else {
        //    console.log("全部命令执行完毕")
        }
    }

}