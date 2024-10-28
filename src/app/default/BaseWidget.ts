import { BaseObserver } from "./BaseObserver";

export class BaseWidget extends BaseObserver{

    /**
     * This is a random identifier to the widget that is used to identify the widget and other elements
     * inside of it.
     */
    elementIdentifier: number = 0;

    /**
     * This flag is set to denote that that widget has been mounted
     */
        widgetMounted: boolean = false;

    getComponent(): HTMLElement | null{
        let component = document.getElementById(this.elementIdentifier.toString());
        return component;
      }
  
      getElementById(identifier: string){
        let element = this.getComponent();
        let selectedElement: HTMLElement = document.body ;
        if(element){
           let myelement =  <HTMLElement>element.querySelector('#'+identifier);
           if(myelement){
            selectedElement = myelement;
            return selectedElement;
           }
        }
        return null;
  
      }


    /**
     * 
     * @returns random number that will be used to put into the main widget div so that we can uniqely identify 
     * the widget and its children from others.
     */
    createWidgetWrapperIdentifier(){
        this.elementIdentifier = Math.random() * 10000;
        return this.elementIdentifier.toString();
      }
}