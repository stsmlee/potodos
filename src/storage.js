import { openForm, createTaskDiv } from './taskmaster'
import { compareAsc, compareDesc, format, parse } from 'date-fns'

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

function addTaskDict(currentID, title,details,entryTimeStamp,dueDate) {
    taskDict[currentID] = {
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
        const dateobj = new Date(dueDate.valueAsDate)
        console.log(dueDate.value)

        const currentID = +getCurrentID()
        if (!title.value) {
            alert('Title section of form must be filled.');
            openForm();
        } else {
            const entryTimestamp = new Date()
            addTaskDict(currentID, title.value,details.value, entryTimestamp.toString(), dueDate.value)
            // parse(dueDate.valueAsDate, 'YYYY/MM/DD', new Date())
            // createTaskDiv(currentID, title, details, entryTimestamp, )
            title.value = ""
            details.value = ""
            dueDate = new Date()
        };
    });
};
