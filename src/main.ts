import { v4 as uuidv4 } from "uuid"
import { Database } from "./types/supabase.ts"
import { supabase} from "./supabaseClient.ts"

const listWrapper = document.querySelector(".taskListContainer")! as HTMLDivElement
const newTaskBtn = document.querySelector("#createTaskBtn")! as HTMLButtonElement
const taskInput = document.querySelector("#taskInput")! as HTMLInputElement
const removeBtn = document.querySelector("#removeBtn") as HTMLButtonElement
type Task = { newtask: string, id: string, check: boolean }
let taskContainer:Task[] = []

newTaskBtn.onclick = () => { 
  createTask(taskInput.value)
}

function createTask (task:string) { 
  const newTask :Task= {
    newtask: task,
    id:uuidv4(),
    check:false
  }
  taskContainer.push(newTask)
  renderList(listWrapper, taskContainer)
  taskInput.value=" "
}

function removeTask(id: string) {
  taskContainer = taskContainer.filter(task => task.id !== id)
  renderList(listWrapper,taskContainer)
}
 
function renderList(list:HTMLElement ,arr:Task[]) { 
  return list.innerHTML = arr.map((tasks) => (
    `
  <ul>
  <li id=${tasks.id}>
  <input type="checkbox" id="taskCheckBox" >
  <p>${tasks.newtask}</p>
  <button id="removeBtn" >Delete</button>
  </li>
  </ul>
  `
  )).join("")
}

createTask("do groceries")
createTask("papper")
createTask("take a shower")
createTask("sleep")

console.log(taskContainer);
renderList(listWrapper,taskContainer)























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

