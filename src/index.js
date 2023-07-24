import { compareAsc, compareDesc, format, intervalToDuration } from 'date-fns'
import { createTaskDiv, customize, newTaskForm } from './taskmaster'
import { getTaskDict, addTask, settingMenu } from './storage'
import './style.css'

// localStorage.clear()
let taskDict = getTaskDict()
// console.log(taskDict)

const header = document.getElementById('header')
header.appendChild(settingMenu())

const container = document.createElement('div')
container.setAttribute('id', 'container')

function loadTaskDict() {
    Object.entries(taskDict).forEach(([id,value]) => {
        let task = createTaskDiv(id, value.title, value.details, value.entryTimeStamp, value.dueDate)
        if (value.dueDate) {
            let [year, month, day] = value.dueDate.split('-');
            let timeLeft = intervalToDuration({start: new Date(year, month-1, day), end: new Date()})
            // console.log(timeLeft)
            if (Math.min(Object.values(timeLeft)) < 0) task.classList.add('red');
            else if (timeLeft.years == 0 && timeLeft.months == 0) {
                if (timeLeft.days == 0) task.classList.add('red');
                else if (timeLeft.days <= 7) task.classList.add('yellow');
            };
        };
        container.appendChild(task)
    });
};

loadTaskDict()

document.body.appendChild(container)

container.appendChild(newTaskForm())

const taskForm = document.getElementById('new-task-div')
addTask(taskForm)


// const dates = [
//     { timestamp: new Date(1995, 6, 2),
//       task: 'eat that potato'
//     }, 
//     { timestamp: new Date(1987, 1, 11),
//       task: 'build a potato'
//     }, 
//     { timestamp: new Date(1989, 6, 10),
//       task: 'cook the potato'
//     }
//   ]
// dates.sort(compareAsc)
// dates.sort((a, b) => compareAsc(a.timestamp, b.timestamp))
// export {dates}