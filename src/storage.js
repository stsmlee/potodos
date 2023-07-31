import { openForm, createTaskDiv, colourCode, loadTaskDict } from './taskmaster'
import { compareAsc, compareDesc, format, min, parseISO } from 'date-fns'

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

function updateTaskDict() {
    window.localStorage.setItem('taskdict', JSON.stringify(taskDict))
}

let taskDict = getTaskDict()

function addTaskDict(currentID, title,details,entryTimeStamp,dueDate) {
    taskDict[currentID] = {
        title, details, entryTimeStamp, dueDate
    };
    setCurrentID(currentID += 1)
    updateTaskDict()
}

export function addTaskListener(DOMform) {
    DOMform.addEventListener("submit", (e) => {
        e.preventDefault();
        let title = document.getElementById('new-title')
        let details = document.getElementById('new-details')
        let dueDate = document.getElementById('new-due-date')
        const currentID = +getCurrentID()
        if (!title.value) {
            alert('Title section of form must be filled.');
            openForm();
        } else {
            const entryTimeStamp = new Date()
            addTaskDict(currentID, title.value, details.value, entryTimeStamp.toString(), dueDate.value)
            const newTaskDiv = createTaskDiv(currentID, title.value, details.value, entryTimeStamp, dueDate.value)
            document.getElementById('container').appendChild(newTaskDiv)
            colourCode(newTaskDiv, dueDate.value)
            title.value = "";
            details.value = "";
            dueDate.value = "";
            loadTaskDict(document.querySelector('#select-sort option:checked').value)
        };
    });
};

export function deleteTask(e) {
    const container = document.getElementById('container')
    const taskid = e.target.id;
    delete taskDict[taskid];
    container.removeChild(document.getElementById('div'+taskid))
    updateTaskDict()
};

export function editTask(e) {
    const openEdits = document.querySelectorAll('.open-edit');
    if (openEdits.length > 0) {
        alert('Please finish your other edit first')
        return;
    };
    const otherEditBtns = document.querySelectorAll('.edit-wrapper')
    otherEditBtns.forEach((btn) => btn.classList.toggle('no-edit'))
    const taskid = e.target.id;
    const divid = 'div' + taskid
    const ogTask = document.getElementById(divid)
    // const clone = ogTask.cloneNode(true)
    const editTaskDiv = document.createElement('div');
    editTaskDiv.id = 'edit-div' + taskid;
    editTaskDiv.className = 'open-edit'
    ogTask.replaceWith(editTaskDiv)

    const editTaskForm = document.createElement('form');
    editTaskForm.id = 'edit-form' + taskid
    editTaskForm.classList.add('form-container');
    editTaskForm.noValidate=true;

    const editTitle = document.createElement('input');
    const editTitleLabel = document.createElement('label');
    editTitle.type = 'text';
    editTitle.name = 'edit-title'
    editTitleLabel.textContent = 'Title';
    editTitleLabel.style.fontWeight = 'bold' ;
    editTitle.id = 'edit-title' + taskid;
    editTitleLabel.htmlFor = 'new-title'
    editTitle.required = 'true';
    editTitle.value = taskDict[taskid].title;

    const editDetails = document.createElement('input');
    const editDetailsLabel = document.createElement('label');
    editDetails.type = 'text';
    editDetails.name = 'edit-details'
    editDetailsLabel.textContent = 'Details';
    editDetailsLabel.style.fontWeight = 'bold';
    editDetails.id = 'edit-details' + taskid;
    editDetailsLabel.htmlFor = 'edit-details' + taskid
    if (taskDict[taskid].details) {
        editDetails.value = taskDict[taskid].details
    } else editDetails.placeholder = "Enter task details (optional)";

    const editDueDate =  document.createElement('input');
    const editDueDateLabel = document.createElement('label');
    editDueDate.type = 'date';
    editDueDate.name = 'edit-due-date'
    editDueDateLabel.textContent = 'Due date (Optional)';
    editDueDateLabel.style.fontWeight = 'bold';
    editDueDate.id = 'edit-due-date' + taskid;
    editDueDateLabel.htmlFor = 'new-due-date' + taskid;
    if (taskDict[taskid].dueDate) {
        editDueDate.value = taskDict[taskid].dueDate;
        editDueDate.min = format(min([parseISO(taskDict[taskid].dueDate), new Date()]), 'yyyy-MM-dd');
    } else editDueDate.min = format(new Date(), 'yyyy-MM-dd');

    const submitBtn = document.createElement('button');
    submitBtn.id = taskid;
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Save Changes';
    submitBtn.classList.add('btn');

    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.classList.add('btn', 'close-btn');
    cancelBtn.onclick = () => {
        editTaskDiv.replaceWith(ogTask)
        otherEditBtns.forEach((btn) => btn.classList.toggle('no-edit'))
    };
    editTaskForm.appendChild(editTitleLabel);
    editTaskForm.appendChild(editTitle);
    editTaskForm.appendChild(editDetailsLabel);
    editTaskForm.appendChild(editDetails);
    editTaskForm.appendChild(editDueDateLabel);
    editTaskForm.appendChild(editDueDate);
    editTaskForm.appendChild(submitBtn);
    editTaskForm.appendChild(cancelBtn);
    editTaskDiv.appendChild(editTaskForm);

    listenForEdits(submitBtn)
}

function listenForEdits(subBtn) {
    subBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const taskid = e.target.id;
        const otherEditBtns = document.querySelectorAll('.edit-button');
        otherEditBtns.forEach((btn) => btn.classList.toggle('no-edit'));
        let title = document.getElementById('edit-title' + taskid)
        let details = document.getElementById('edit-details' + taskid)
        let dueDate = document.getElementById('edit-due-date' + taskid)
        if (title.value.length == 0) {
            alert('Title section of form must be filled.');
        } else {
            taskDict[taskid].title = title.value
            taskDict[taskid].details = details.value
            taskDict[taskid].dueDate = dueDate.value
            updateTaskDict()
            loadTaskDict(document.querySelector('#select-sort option:checked').value)
        };
    });
};

