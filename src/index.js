import { compareAsc, compareDesc, format, intervalToDuration, isAfter, isBefore } from 'date-fns'
import { createTaskDiv, newTaskForm, settingsMenu } from './taskmaster'
import { getTaskDict, addTaskListener } from './storage'
import './style.css'

// localStorage.clear()
let taskDict = getTaskDict()

const header = document.getElementById('header')
header.appendChild(settingsMenu())

const container = document.createElement('div')
container.setAttribute('id', 'container')

function loadTaskDict() {
    Object.entries(taskDict).forEach(([id,value]) => {
        let task = createTaskDiv(id, value.title, value.details, value.entryTimeStamp, value.dueDate)
        if (value.dueDate) {
            let [year, month, day] = value.dueDate.split('-');
            if (isBefore(new Date(year, month-1, day), new Date())) {
                task.classList.add('overdue');
            } else {
                let timeLeft = intervalToDuration({start: new Date(year, month-1, day), end: new Date()})
                if (timeLeft.years == 0 && timeLeft.months == 0) {
                    if (timeLeft.days == 0) task.classList.add('overdue');
                    else if (timeLeft.days <= 7) task.classList.add('very-soon');
                };
            }
        };
        container.appendChild(task)
    });
};

loadTaskDict()

document.body.appendChild(container)

container.appendChild(newTaskForm())
const taskForm = document.getElementById('new-task-div')
addTaskListener(taskForm)


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