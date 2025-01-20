// import { UUIDTypes, v4 as uuidv4 } from "uuid"
import { addTask,fetchTask,DbTask,updateTaskStatus,deleteTask } from "./dbHelpers"

const listWrapper = document.querySelector(".taskListContainer")! as HTMLDivElement
const newTaskBtn = document.querySelector("#createTaskBtn")! as HTMLButtonElement
const taskInput = document.querySelector("#taskInput")! as HTMLInputElement

newTaskBtn.onclick = () => { 
  addTask(taskInput.value)
  taskInput.value = " "
  renderList(listWrapper)
}
document.addEventListener("DOMContentLoaded", () => { 
  const removeBtn = document.querySelectorAll(".removeBtn")

  removeBtn.forEach(button => { 
    button.addEventListener("click", (event) => { 
      event.preventDefault();

      const eventHandler = event.currentTarget as HTMLButtonElement
      const taskId = eventHandler.getAttribute("data-id")
      if (taskId) {
        console.log(taskId);
        deleteTask(taskId)
        renderList(listWrapper)
      } else { 
        console.error("task id not found")
      }
    })
  })
})


async function renderList(list: HTMLElement) { 
  try {
    const data = await fetchTask()
    console.log(data);
    if (data) {
      return list.innerHTML = data.map((tasks:DbTask) =>
        `
      <ul>
      <li id=${tasks.id}>
      <input type="checkbox" id="taskCheckBox" >
      <p>${tasks.tasks}</p>
      <button class="removeBtn" data-id=${tasks.id}>Delete</button>
      </li>
      </ul>
      `
      ).join("")
    }
  } catch (error) { 
    console.error("Fetching tasks error :" , error)
  }
}

renderList(listWrapper)

// async function removeTask(id:string) { 
//   try {
//     deleteTask(id)
//     renderList(listWrapper)
//   }
//   catch (error){console.error(error) }
// }






// function removeTask(id: string) {
//   taskContainer = taskContainer.filter(task => task.id !== id)
//   renderList(listWrapper,taskContainer)
// }



// import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

