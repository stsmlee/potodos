import { openForm, closeForm } from './taskmaster'
import { compareAsc, compareDesc, format } from 'date-fns'

export function initTaskDict() {
    localStorage.setItem('taskdict', JSON.stringify({}))
}

export function getTaskDict() {
    return JSON.parse(localStorage.getItem('taskdict'))
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
            title.value = ""
            details.value = ""
            dueDate.value = new Date()
            const entryTimestamp = new Date()
        };
    });
};