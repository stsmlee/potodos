// import { compareAsc, compareDesc, format, intervalToDuration, isAfter, isBefore } from 'date-fns'
import { newTaskForm, settingsMenu, loadTaskDict } from './taskmaster'
import { getTaskDict, addTaskListener } from './storage'
import './style.css'

// localStorage.clear()
let taskDict = getTaskDict()

// const header = document.getElementById('header')

const container = document.createElement('div')
container.id = 'container'

// function loadTaskDict() {
//     Object.entries(taskDict).forEach(([id,value]) => {
//         let task = createTaskDiv(id, value.title, value.details, value.entryTimeStamp, value.dueDate)
//         if (value.dueDate) {
//             let [year, month, day] = value.dueDate.split('-');
//             if (isBefore(new Date(year, month-1, day), new Date())) {
//                 task.classList.add('overdue');
//             } else {
//                 let timeLeft = intervalToDuration({start: new Date(year, month-1, day), end: new Date()})
//                 if (timeLeft.years == 0 && timeLeft.months == 0) {
//                     if (timeLeft.days == 0) task.classList.add('overdue');
//                     else if (timeLeft.days <= 7) task.classList.add('very-soon');
//                 };
//             }
//         };
//         container.appendChild(task)
//     });
// };

document.body.appendChild(container)
loadTaskDict()
container.appendChild(settingsMenu())
// container.appendChild(newTaskForm())
document.body.appendChild(newTaskForm())
const taskForm = document.getElementById('new-task-div')
addTaskListener(taskForm)


