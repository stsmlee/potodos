import { openForm, closeForm } from './taskmaster'
import { compareAsc, compareDesc, format } from 'date-fns'




function getCurrentID() {
    if (!window.localStorage.getItem('currentID')) window.localStorage.setItem('currentID', 0);
    return +window.localStorage.getItem('currentID');
}

function setCurrentID(id) {
    window.localStorage.setItem('currentID', id)
}

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
    let currentID = +getCurrentID()
    taskDict[getCurrentID()] = {
        'title': title, 'details': details, 'entryTimeStamp': entryTimeStamp, 'dueDate': dueDate
    };
    setCurrentID(++currentID)
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
            title.value = ""
            details.value = ""
            dueDate = new Date()
        };
    });
};
