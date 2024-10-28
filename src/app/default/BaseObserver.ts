export class BaseObserver{
    /**
     * This is where the data of the widget needs to be stored.
     */
    data: any;



    /**
     * This is the subscribers of the data. If any thing on this widget changes then all the functions
     * in the subscribers are called.
     */
        subscribers: any = [];


    /**
    * This is called by any data change. So that any data change will notify all the callback functions to execute.
    */
    notify(){
        this.subscribers.map((subscriber: any) => {
            subscriber(this.data)
        });
    }


    
    /**
     * This function is used to register the callback into the function in case of any dataChange.
     * @param callback sets this callback to the subscribers list in the widget. So that in any change we can call this callback
     * @returns execution of the callback passed.
     */
    dataChange(callback: any){
        this.subscribers.push(callback);
        return callback(this.data);
      }
}