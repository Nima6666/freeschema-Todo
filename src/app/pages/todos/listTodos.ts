import {
  DeleteConceptById,
  GetCompositionListListener,
  NORMAL,
  PatcherStructure,
  UpdateComposition,
} from "mftsccs-browser";
import { StatefulWidget } from "../../default/StatefulWidget";
import { getLocalUserId } from "../user/login.service";
export class listTodos extends StatefulWidget {
  todos: any = [];
  inpage: number = 10;
  page: number = 1;
  linker: string = "console_folder_s";

  widgetDidMount(): void {
    const userId: number = getLocalUserId();
    GetCompositionListListener(
      "todos",
      userId,
      this.inpage,
      this.page,
      NORMAL
    ).subscribe((output: any) => {
      console.log(output);
      this.todos = output;
      this.render();
    });
  }

  addEvents() {
    const tableElement = this.getElementById("mainbody");
    if (tableElement) {
      console.log("this is the element", tableElement);
      if (this.todos.length > 0) {
        for (let i = 0; i < this.todos.length; i++) {
          const id = this.todos[i].todos.id;

          // if the id is present and valid
          if (id) {
            const row = document.createElement("tr");
            const col1 = document.createElement("td");
            const col2 = document.createElement("td");
            const col3 = document.createElement("td");
            const col4 = document.createElement("td");
            const col5 = document.createElement("td");
            const col6 = document.createElement("td");
            const name = document.createElement("span");
            const nameValue = this.todos[i].todos.task_name;
            const unformattedDateValue = this.todos[i].todos.due_date;
            const due_date = new Date(unformattedDateValue).toLocaleString(
              "en-US",
              {
                month: "short",
                year: "numeric",
                weekday: "long",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }
            );
            name.innerText = nameValue;
            const dueDate = document.createElement("span");
            dueDate.innerText = due_date;
            const edit = document.createElement("button");

            edit.setAttribute("class", "btn btn-primary");
            edit.setAttribute("padding", "10px");
            edit.id = this.todos[i].todos.id;
            edit.innerHTML = "edit";

            const del = document.createElement("button");
            del.setAttribute("class", "btn btn-primary");
            del.setAttribute("padding", "10px");
            del.id = this.todos[i].todos.id;
            del.innerText = "Delete";
            del.onclick = () => {
              if (id) {
                DeleteConceptById(id).then(() => {
                  console.log("this is the delete notify");
                });
              }
            };
            const that = this;
            edit.onclick = () => {
              that.data = {
                id: edit.id,
                task_name: nameValue,
                due_date: unformattedDateValue,
              };
              console.log(
                "this is the update click",
                that.data,
                that.subscribers
              );

              that.notify();
            };

            const taskAction = document.createElement("button");
            taskAction.setAttribute("class", "btn btn-light");
            taskAction.setAttribute("padding", "10px");
            taskAction.innerText =
              this.todos[i].todos.complete === "yes"
                ? "Set Incomplete"
                : "Set Complete";
            taskAction.onclick = async () => {
              if (id) {
                console.log("toggle task complete status");
                let patcherStructure: PatcherStructure = new PatcherStructure();
                patcherStructure.compositionId = id;
                patcherStructure.patchObject = {
                  task_name: nameValue,
                  due_date: unformattedDateValue,
                  completed_at:
                    this.todos[i].todos.complete === "yes" ? "" : Date.now(),
                  complete:
                    this.todos[i].todos.complete === "yes" ? "no" : "yes",
                };
                await UpdateComposition(patcherStructure);
              }
            };

            const completeStatusDiv = document.createElement("div");

            const completeStatus =
              this.todos[i].todos.complete === "yes" ? "Yes, " : "No";
            completeStatusDiv.innerText = completeStatus;

            completeStatusDiv.style.color =
              this.todos[i].todos.complete === "no" ? "red" : "green";

            if (this.todos[i].todos.complete === "yes") {
              const completeDateBlock = document.createElement("div");
              const completeDateUnformatted = this.todos[i].todos.completed_at;
              console.log(completeDateUnformatted);
              if (completeDateUnformatted === "") {
                return;
              }
              const completedDate = new Date(
                parseInt(completeDateUnformatted)
              ).toLocaleString("en-US", {
                month: "short",
                year: "numeric",
                weekday: "long",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              });

              completeDateBlock.innerText = completedDate;
              completeStatusDiv.append(completeDateBlock);
            }
            col1.append(name);
            col2.append(dueDate);
            col3.append(completeStatusDiv);
            col4.append(taskAction);
            col5.append(edit);
            col6.append(del);

            row.appendChild(col1);
            row.appendChild(col2);
            row.appendChild(col3);
            row.appendChild(col4);
            row.appendChild(col5);
            row.appendChild(col6);
            tableElement.append(row);
          }
        }
      }
    }
  }

  getHtml(): string {
    let html = "";

    html = `<div>
        <table>
        <thead>
          <tr>
              <th>Task Name</th>
              <th>Due Date</th>
              <th>Complete Status</th>
              <th>Task Action</th>
              <th>Edit</th>
              <th>Delete</th>
          </tr>
        </thead>
        <tbody id= mainbody>

        </tbody>
        </table>
        
        </div>`;
    return html;
  }
}
