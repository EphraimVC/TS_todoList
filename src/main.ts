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
      <li id=${tasks.id}>
      <input type="checkbox" id="taskCheckBox" data-status="${tasks.is_complete}" >
      <p contenteditable="false" >${tasks.tasks}</p>
      <button class="removeBtn" data-id=${tasks.id}>Delete</button>
      </li>
      `
      ).join("")
  }
} catch (error) { 
  console.error("Fetching tasks error :" , error)
}}
// ----------------------------------------------------------------------------------------- 
// Function to attach event listeners to remove buttons
function attachRemoveEventListeners() {
  const removeBtns = document.querySelectorAll(".removeBtn");
  console.log(`Number of remove buttons: ${removeBtns.length}`);
  removeBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const taskId = btn.getAttribute("data-id");
      if (taskId) {
        await deleteTask(taskId); // Call delete function
        await renderList(); // Re-render the list
        attachRemoveEventListeners(); // Re-attach listeners
      }
    });
  });
}
// ----------------------------------------------------------------------------------------- 
// Initialize the app on DOMContentLoaded
document.addEventListener("DOMContentLoaded", async () => {
  await renderList(); // Render the initial list
  attachRemoveEventListeners(); // Attach event listeners
});
