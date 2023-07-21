import { openForm, closeForm } from './taskmaster'
import { compareAsc, compareDesc, format } from 'date-fns'

let id = 0;

export function initTaskDict() {
    window.localStorage.setItem('taskdict', JSON.stringify({}))
}

initTaskDict()

export function getTaskDict() {
    return JSON.parse(window.localStorage.getItem('taskdict'))
}

let taskDict = getTaskDict()

function addTaskDict(title,details,entryTimeStamp,dueDate) {
    taskDict[id] = JSON.stringify({
        'title': title, 'details': details, 'entryTimeStamp': entryTimeStamp, 'dueDate': dueDate
    })
    window.localStorage.setItem('taskdict', taskDict)
}

export function addTask(DOMform) {
    DOMform.addEventListener("submit", (e) => {
        e.preventDefault();
        let title = document.getElementById('new-title')
        let details = document.getElementById('new-details')
        let dueDate = document.getElementById('new-due-date')
        if (!title.value) {
            alert('Title section of form must be filled.');
            openForm();
        } else {
            const entryTimestamp = new Date()
            addTaskDict(title.value,details.value,entryTimestamp,dueDate.value)
            id++;
            title.value = ""
            details.value = ""
            dueDate = new Date()
            // console.log(taskDict[0])
            console.log(taskDict)
        };
    });
};

// taskdict = {
//     1: {
//         title: 'title',
//         details: 'details',
//         entry: 'entryTimeStamp',
//         due: 'dueDate'
//     },
//     2: {
//         'repeat'
//     }
// }