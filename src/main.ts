// import { UUIDTypes, v4 as uuidv4 } from "uuid"
import { addTask, fetchTask, DbTask, updateTaskStatus, deleteTask } from "./dbHelpers.ts"
// ----------------------------------------------------------------------------------------- 
const listWrapper = document.querySelector(".taskListContainer")! as HTMLDivElement  

document.addEventListener("DOMContentLoaded", () => { 
  const taskInput = document.querySelector("#taskInput")! as HTMLInputElement
  const newTaskBtn = document.querySelector("#createTaskBtn")! as HTMLButtonElement
  const LogOutBtn = document.querySelector("#logOutBtn")! as HTMLButtonElement
  if (newTaskBtn && LogOutBtn && taskInput) {

    newTaskBtn.onclick = async () => {
      await addTask(taskInput.value);
      taskInput.value = ""; // Reset input field
      await renderList(); // Wait for the list to render
      attachRemoveEventListeners(); // Attach event listeners after rendering
    };
    
    LogOutBtn.onclick = () => {
      localStorage.removeItem("sb-scctkwvgbfovgllwkbqw-auth-token")
      window.location.assign("/login.html")
    }
  }
})

// ----------------------------------------------------------------------------------------- 
export async function renderList() { 
  try {
    const data = await fetchTask()
    console.log(data);
    if (data) {
      return listWrapper.innerHTML = data.map((tasks:DbTask) =>
        `
      <li class="listItem" id=${tasks.id}>
      <p id="taskParagraph" contentEditable="false">${tasks.tasks}</p>
      <button class="removeBtn" data-id=${tasks.id}>Delete</button>
      <button class="editBtn" data-id=${tasks.id}>Edit</button>
      </li>
      `
      ).join("")
  }
} catch (error) { 
  console.error("Fetching tasks error :" , error)
  }
}
// ----------------------------------------------------------------------------------------- 
// Function to attach event listeners to remove buttons
function attachRemoveEventListeners() {
  const removeBtns = document.querySelectorAll(".removeBtn");
  removeBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const taskId = btn.getAttribute("data-id");
      if (taskId) {
        await deleteTask(taskId); // Call delete function
        await renderList(); // Re-render the list
        attachRemoveEventListeners(); // Re-attach listeners
      }
    })   
  });
  
  // ----------------------------------------------------------------------------------------- 
  const editBtn = document.querySelectorAll(".editBtn")
  editBtn.forEach((edit) => { 
    const parentLi = edit.closest("li")!
    const taskTest = parentLi?.querySelector("#taskParagraph")! as HTMLParagraphElement
    // const taskText = document.querySelector("#taskParagraph")!
    // const editableStatus = edit.getAttribute("contentEditable") 
    edit.addEventListener("click", async () => { 
      const editTaskId = edit.getAttribute("data-id")!
      const taskValue = taskTest.textContent!
    
        if (!taskTest.isContentEditable) {
          console.log(editTaskId, taskValue);
          taskTest.contentEditable = "true"
          edit.textContent = "Save"
          taskTest.focus()
          console.log("edit click");
        }
        else if (taskTest.isContentEditable) { 
          updateTaskStatus(editTaskId,taskValue)
          edit.textContent = "Edit"
          taskTest.contentEditable = "false"
          console.log("save click");
        }
      } )
    })
}

// ----------------------------------------------------------------------------------------- 
// Initialize the app on DOMContentLoaded
document.addEventListener("DOMContentLoaded", async () => {
  await renderList(); // Render the initial list
  attachRemoveEventListeners(); // Attach event listeners
});