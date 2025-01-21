// import { UUIDTypes, v4 as uuidv4 } from "uuid"
import { addTask,fetchTask,DbTask,updateTaskStatus,deleteTask } from "./dbHelpers"

const listWrapper = document.querySelector(".taskListContainer")! as HTMLDivElement
const newTaskBtn = document.querySelector("#createTaskBtn")! as HTMLButtonElement
const taskInput = document.querySelector("#taskInput")! as HTMLInputElement


async function renderList(list: HTMLElement) { 
  try {
    const data = await fetchTask()
    console.log(data);
    if (data) {
      return list.innerHTML = data.map((tasks:DbTask) =>
        `
      <li id=${tasks.id}>
      <input type="checkbox" id="taskCheckBox" >
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

newTaskBtn.onclick = async () => {
  await addTask(taskInput.value);
  taskInput.value = ""; // Reset input field
  await renderList(listWrapper); // Wait for the list to render
  attachRemoveEventListeners(); // Attach event listeners after rendering
};

// Function to attach event listeners to remove buttons
function attachRemoveEventListeners() {
  const removeBtns = document.querySelectorAll(".removeBtn");
  console.log(`Number of remove buttons: ${removeBtns.length}`);
  removeBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const taskId = btn.getAttribute("data-id");
      if (taskId) {
        await deleteTask(taskId); // Call delete function
        await renderList(listWrapper); // Re-render the list
        attachRemoveEventListeners(); // Re-attach listeners
      }
    });
  });
}

// Initialize the app on DOMContentLoaded
document.addEventListener("DOMContentLoaded", async () => {
  await renderList(listWrapper); // Render the initial list
  attachRemoveEventListeners(); // Attach event listeners
});





