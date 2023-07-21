// import { compareAsc, compareDesc, format } from 'date-fns'
import { createTaskDiv, newTaskForm } from './taskmaster'
import { getTaskDict, addTask } from './storage'
import './style.css'

// let taskDict = getTaskDict()
// console.log(taskDict)
localStorage.clear()

const container = document.createElement('div')
container.setAttribute('id', 'container')

for (let i=0;i<5;i++) {
    container.appendChild(createTaskDiv('Spudding', 'making potatoes', '2024', '07', '30'))
}

document.body.appendChild(container)

container.appendChild(newTaskForm())

const taskForm = document.getElementById('new-task-popup')
// const taskForm = document.getElementById('form')
addTask(taskForm)


