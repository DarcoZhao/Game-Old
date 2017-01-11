// TypeScript file
class ScreenService {

    public observerList:Observer[]=[];
    private static instance:ScreenService;
    public static count=0;

    constructor(){
         ScreenService.count++;
        if( ScreenService.count >1){
            throw 'singleton';
        }

    }

     public static getInstance() {
        if(ScreenService.instance ==null) {
            ScreenService.instance =new ScreenService();
        }
        return ScreenService.instance;
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