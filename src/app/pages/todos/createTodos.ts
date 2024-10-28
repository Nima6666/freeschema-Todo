import {
  CreateTheConnectionLocal,
  LocalSyncData,
  MakeTheInstanceConceptLocal,
  PatcherStructure,
  PRIVATE,
  UpdateComposition,
} from "mftsccs-browser";
import { StatefulWidget } from "../../default/StatefulWidget";
// import "./due_datebook.style.css";
import { getLocalUserId } from "../user/login.service";
export class createTodo extends StatefulWidget {
  addEvents(): void {
    let userId: number = getLocalUserId();
    let order: 1;
    let task_name = this.getElementById("name") as HTMLInputElement;
    let due_date = this.getElementById("due_date") as HTMLInputElement;
    let id = this.getElementById("id") as HTMLInputElement;
    if (this.data) {
      task_name.value = this.data.task_name;
      due_date.value = this.data.due_date;
      id.value = this.data.id;
    }
    let submitButton = this.getElementById("submit");
    if (submitButton) {
      submitButton.onclick = async (ev: Event) => {
        ev.preventDefault();

        if (!task_name.value || !due_date.value) {
          alert("form fields missing");
          return;
        }

        if (new Date(due_date.value).getTime() < Date.now()) {
          alert("due date cannot be in past");
          return;
        }

        try {
          if (id.value) {
            let patcherStructure: PatcherStructure = new PatcherStructure();
            patcherStructure.compositionId = Number(id.value);
            patcherStructure.patchObject = {
              task_name: task_name.value,
              due_date: due_date.value,
            };
            await UpdateComposition(patcherStructure);
          } else {
            const mainconcept = await MakeTheInstanceConceptLocal(
              "todos",
              "",
              true,
              userId,
              PRIVATE
            );

            const concept = await MakeTheInstanceConceptLocal(
              "task_name",
              task_name.value,
              false,
              userId,
              PRIVATE
            );

            const concept2 = await MakeTheInstanceConceptLocal(
              "due_date",
              due_date.value,
              false,
              userId,
              PRIVATE
            );

            const concept3 = await MakeTheInstanceConceptLocal(
              "complete",
              "no",
              false,
              userId,
              PRIVATE
            );

            const concept4 = await MakeTheInstanceConceptLocal(
              "completed_at",
              "",
              false,
              userId,
              PRIVATE
            );

            await CreateTheConnectionLocal(
              mainconcept.id,
              concept.id,
              mainconcept.id,
              order,
              "",
              userId
            );
            await CreateTheConnectionLocal(
              mainconcept.id,
              concept2.id,
              mainconcept.id,
              order,
              "",
              userId
            );
            await CreateTheConnectionLocal(
              mainconcept.id,
              concept3.id,
              mainconcept.id,
              order,
              "",
              userId
            );
            await CreateTheConnectionLocal(
              mainconcept.id,
              concept4.id,
              mainconcept.id,
              order,
              "",
              userId
            );

            LocalSyncData.SyncDataOnline();
          }

          console.log("submit button clicked");
        } catch (err) {
          console.log("Error occurred:", err);
        }
      };
    }
  }

  /**
   * This is the main html component of our creating widget.
   * @returns returns a form that takes in task title and due_date for the Todos.
   */
  getHtml(): string {
    let html = "";
    html = `<div class="container">
        <form>
            <div>
                <input type= number id=id hidden>
                <div class="formbody">
                    <label>Task Title</label>
                    <input type=text id="name" placeholder="Task Name">
                </div>
               <div class="formbody">
                    <label>Due Date</label>
                    <input type="datetime-local" id="due_date" placeholder="">
                </div>
                <button class="btn btn-primary" id="submit" type=submit>Submit</button>
            </div>
        </form>

        </div>`;
    return html;
  }
}
