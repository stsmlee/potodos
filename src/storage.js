import { openForm, closeForm } from './taskmaster'
import { compareAsc, compareDesc, format } from 'date-fns'

let id = 0;

function initTaskDict() {
    window.localStorage.setItem('taskdict', JSON.stringify({}))
};

export function getTaskDict() {
    if (!JSON.parse(window.localStorage.getItem('taskdict'))) initTaskDict();
    return JSON.parse(window.localStorage.getItem('taskdict'));
}

let taskDict = getTaskDict()
// for (let [k,v] of Object.entries(taskDict)) {
//     console.log(`${k}: ${v}`)
// }

function addTaskDict(title,details,entryTimeStamp,dueDate) {
    taskDict[id] = {
        'title': title, 'details': details, 'entryTimeStamp': entryTimeStamp, 'dueDate': dueDate
    };
    window.localStorage.setItem('taskdict', JSON.stringify(taskDict))
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
        };
    });
};
