import { BaseWidget } from "./BaseWidget";

/**
 * Implementation of a widget system. If you need to create a widget that is compatible with the concept connection 
 * system them extend this class and populate the functions such as getHtml() and widgetDidMount()
 */
export class StatefulWidget extends BaseWidget{
    params: any;
    /**
     * These are the child widgets that need to be added to  this widget
     */
    childWidgets: any = [];


    /**
     * This is the id of the parentElement of this widget.
     */
    parentElement: string = "";


    /**
     * This is the element that is a copy of the element that is mounted.
     */
    protected element: HTMLElement | null = null;
  
    setTitle(title: string): void {
      document.title = title;
    }

  
    /**
     * 
     * @returns the html string that needs to be mounted to the DOM.
     */
     getHtml(): string {    
      return '';
    }


    /**
     * This will help us update the data of the child widget. This will also call another function inside of the child widget
     * called udpateWidget which the user can call after some data is udpated.
     * @param value 
     * @param widget 
     */
   UpdateChildData(value: any, widget: StatefulWidget){
    let passedWidget = widget;
    passedWidget.data = value;
    passedWidget.render();
    passedWidget.updateWidget();
   }

   /**
    * This is called after the data has been udpated by some other component.
    */
   updateWidget(){}


    /**
     * 
     * @param newState 
     */
    setState(newState: any) {
        this.data = newState;
        this.notify();
        this.render();
    }


    /**
     * If any child widgets are registered in the widget. Then without any other changes to the contents and state
     * this loadChildWidgets will be called which will help the child widgets be rendered to their respective positions.
     */
    loadChildWidgets(){
          this.childWidgets.map((child: any) => {
          let widget = this.getElementById(child.parentElement);
          if(widget){
            widget.innerHTML = "";
          }
            child.mount(widget);
          })
    }

  /**
   * This is the main function that adds the html of the component to the element.
   * The element is the mounted widget
   */
   render(){
      if (this.element) {
          this.element.innerHTML =  this.getHtml();
        }
      // addEvents is called after the element has been mounted.
      this.addEvents();

      // then after the child widgets are again loaded.
      if(this.widgetMounted){
        this.loadChildWidgets();
      }
    }


    /**
     * This is the function that needs to be called.
     */
    mountChildWidgets(){
    }
  
    /**
     * 
     * @param parent This is the function that creates a new div and then mounts the html element to the parent.
     */
    async mount(parent: HTMLElement) {
      if(parent){
        // create a div to wrap everything inside of it.
        this.element = document.createElement("div");

        // assign an identifier to the element so that it does not conflict with others.
        this.element.id = this.createWidgetWrapperIdentifier();

        // then assign the html to the element.
        this.element.innerHTML = await this.getHtml();

        // mount the div with unique identifier to the parent element.
        parent.appendChild(this.element);

        // also save in the widget its parent identifier.
        this.parentElement = parent.id;

        // if the widget has not been mounted.
        if(this.widgetMounted == false){

          // then after the widget has been mounted for the first time call this function
          // user can update this function as per their requirement 
          //this will mostly be used to bind data / call data 
          this.widgetDidMount();

          // since this is the first time the widget is being created. then all the child widgets are being mounted 
          // as well here.
          this.mountChildWidgets();
  
          // after the widget has been mounted for the first time then the widget has been updated.
          this.widgetMounted = true;
        }
        else{

          // if the widget has already been mounted before then only render the new widget
          this.render();
        }
      }

    }

  
    /**
     * This function will be called after the component mounts.
     */
    widgetDidMount(){
      this.render();
    }

    /**
     * This is called after the render function has been called. So this is used for the user functions to be added
     * for the widget and its html element. User can add any logic here.
     */
    addEvents(){

    }
  

  }