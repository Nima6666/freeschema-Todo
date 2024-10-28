import { StatefulWidget } from "../../default/StatefulWidget";
import { createTodo } from "./createTodos";
import { listTodos } from "./listTodos";
import "./style.css";

export class todos extends StatefulWidget {
  mountChildWidgets() {
    let widget1 = this.getElementById("widget1");
    let widget2 = this.getElementById("widget2");
    let creating = new createTodo();
    let listing = new listTodos();

    if (widget1) {
      this.childWidgets.push(creating);
      creating.mount(widget1);
    }
    if (widget2) {
      listing.dataChange((value: any) => {
        this.UpdateChildData(value, creating);
      });
      this.childWidgets.push(listing);
      listing.mount(widget2);
    }
  }

  getHtml(): string {
    let html = "";

    html = `<div class="flex-container">
                    <div id= "widget1"></div>
                </div>
                <div class="flex-container">
                    <div id ="widget2"></div>
                </div>`;
    return html;
  }
}
