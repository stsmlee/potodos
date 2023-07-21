// import { compareAsc, compareDesc, format } from 'date-fns'
import { createTaskDiv, newTaskForm } from './taskmaster'
import { getTaskDict, addTask } from './storage'
import './style.css'

// localStorage.clear()
let taskDict = getTaskDict()
// console.log(taskDict)

const container = document.createElement('div')
container.setAttribute('id', 'container')

// for (let [k,v] of Object.entries(taskDict)) {
//     console.log(`${k}: ${v}`)
// }
function loadTaskDict() {
    Object.entries(taskDict).forEach(([id,value]) => {
        container.appendChild(createTaskDiv(id, value.title, value.details, value.entryTimeStamp, value.dueDate))
    });
}

loadTaskDict()

document.body.appendChild(container)

container.appendChild(newTaskForm())

const taskForm = document.getElementById('new-task-div')
addTask(taskForm)


