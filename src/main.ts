// import { UUIDTypes, v4 as uuidv4 } from "uuid"
import { addTask, fetchTask, DbTask, updateTaskStatus, deleteTask } from "./dbHelpers"

// ----------------------------------------------------------------------------------------- 
const listWrapper = document.querySelector(".taskListContainer")! as HTMLDivElement
const newTaskBtn = document.querySelector("#createTaskBtn")! as HTMLButtonElement
const taskInput = document.querySelector("#taskInput")! as HTMLInputElement

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
      <p>${tasks.tasks}</p>
      <button class="removeBtn" data-id=${tasks.id}>Delete</button>
      </li>
      `
      ).join("")

  }
} catch (error) { 
  console.error("Fetching tasks error :" , error)
}
}

// ----------------------------------------------------------------------------------------- 
newTaskBtn.onclick = async () => {
  await addTask(taskInput.value);
  taskInput.value = ""; // Reset input field
  await renderList(); // Wait for the list to render
  attachRemoveEventListeners(); // Attach event listeners after rendering
};

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

