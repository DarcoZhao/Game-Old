// TypeScript file
class SenService {

    public observerList:Observer[]=[];
    private static instance:SenService;
    public static count=0;

    constructor(){
         SenService.count++;
        if( SenService.count >1){
            throw 'singleton';
        }

    }

     public static getInstance() {
        if(SenService.instance ==null) {
            SenService.instance =new SenService();
        }
        return SenService.instance;
    }
    addObserver(observer:Observer){
        this.observerList.push(observer);
    }


    notify(id:number) {
        for(let ob of this.observerList) {
            ob.onChange(id);
        }
    }

}