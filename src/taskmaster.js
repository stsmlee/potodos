import { compareAsc, compareDesc, format } from 'date-fns'
import { deleteTask, editTask } from './storage';

export function createTaskDiv(taskid, name, description, entryTS, due) {
    const task = document.createElement('div');
    task.id = 'div' + taskid;
    const title = document.createElement('div');
    const dates = document.createElement('div');
    const entryTimeStamp = document.createElement('div')
    const dueDate = document.createElement('div');
    const details = document.createElement('div');
    const datesWrapper = document.createElement('div')
    datesWrapper.className = 'dates-wrapper'
    task.classList.add('task');
    details.classList.add('details');
    details.textContent = description
    title.classList.add('title');
    title.textContent = name;
    task.appendChild(title);
    task.appendChild(details);
    dates.classList.add('dates');
    entryTimeStamp.textContent = 'entered: ' + format(Date.parse(entryTS), 'yyyy-MM-dd');
    if (due) dueDate.textContent ='due on: ' + due;
    dates.appendChild(entryTimeStamp);
    if (dueDate) dates.appendChild(dueDate);

    const buttonWrapper = document.createElement('span')
    buttonWrapper.className = 'button-wrapper'

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.innerHTML = '&#128465;';
    deleteBtn.className = 'delete-btn';
    deleteBtn.classList.add('buttons')
    deleteBtn.id = taskid;
    deleteBtn.onclick = deleteTask;
    buttonWrapper.appendChild(deleteBtn)

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.id = taskid;
    editBtn.className = 'edit-button';
    editBtn.classList.add('buttons')
    editBtn.innerText = 'edit'
    editBtn.onclick = editTask
    buttonWrapper.appendChild(editBtn)
    datesWrapper.appendChild(buttonWrapper)

    datesWrapper.appendChild(dates);
    task.appendChild(datesWrapper)

    return task;
  }

export function openForm() {
  document.getElementById("new-task-div").style.display = "block";
};

export function closeForm() {
  document.getElementById("new-task-div").style.display = "none";
};

export function newTaskForm() {
  const openBtn = document.createElement('button');
  openBtn.id = 'open-button';
  openBtn.textContent = 'Add a new task?';
  openBtn.onclick = openForm;

  container.appendChild(openBtn);

  const newTaskDiv = document.createElement('div');
  newTaskDiv.id = 'new-task-div';
  newTaskDiv.style.display = 'none';

  const newTaskForm = document.createElement('form');
  newTaskForm.classList.add('form-container');
  newTaskForm.noValidate=true;

  const newTitle = document.createElement('input');
  const newTitleLabel = document.createElement('label');
  newTitle.type = 'text';
  newTitle.name = 'new-title'
  newTitleLabel.textContent = 'Title';
  newTitleLabel.style.fontWeight = 'bold' ;
  newTitle.id = 'new-title';
  newTitleLabel.htmlFor = 'new-title'
  newTitle.required = 'true';
  newTitle.placeholder = "Enter title of your task (Required)";

  const newDetails = document.createElement('input');
  const newDetailsLabel = document.createElement('label');
  newDetails.type = 'text';
  newDetails.name = 'new-details'
  newDetailsLabel.textContent = 'Details';
  newDetailsLabel.style.fontWeight = 'bold';
  newDetails.id = 'new-details';
  newDetailsLabel.htmlFor = 'new-details'
  newDetails.placeholder = "Enter task details (optional)";

  const newDueDate =  document.createElement('input');
  const newDueDateLabel = document.createElement('label');
  newDueDate.type = 'date';
  newDueDate.name = 'new-due-date'
  newDueDateLabel.textContent = 'Due date (Optional)';
  newDueDateLabel.style.fontWeight = 'bold';
  newDueDate.id = 'new-due-date';
  newDueDateLabel.htmlFor = 'new-due-date'
  newDueDate.min = format(new Date(), 'yyyy-MM-dd');

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Submit';
  submitBtn.classList.add('btn');
  submitBtn.onclick = closeForm;

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.textContent = 'Cancel';
  closeBtn.classList.add('btn');
  closeBtn.classList.add('close-btn');
  closeBtn.onclick = closeForm;

  newTaskForm.appendChild(newTitleLabel);
  newTaskForm.appendChild(newTitle);
  newTaskForm.appendChild(newDetailsLabel);
  newTaskForm.appendChild(newDetails);
  newTaskForm.appendChild(newDueDateLabel);
  newTaskForm.appendChild(newDueDate);
  newTaskForm.appendChild(submitBtn);
  newTaskForm.appendChild(closeBtn);
  newTaskDiv.appendChild(newTaskForm);

  return newTaskDiv;
};

export function settingsMenu() {
  const menuButtonWrapper = document.createElement('span')
  const menuButton = document.createElement('button')
  menuButton.type = 'button'
  menuButtonWrapper.id = 'menu-button-wrapper'
  menuButton.innerHTML = '&#9881;'
  menuButton.id = 'menu-button'
  menuButton.onclick = openMenu
  menuButtonWrapper.appendChild(menuButton)
  const header = document.getElementById('header')
  header.appendChild(menuButtonWrapper)

  const settingsDiv = document.createElement('div')
  const settingsForm = document.createElement('form')
  settingsDiv.id = 'settings-div'
  settingsForm.className = 'settings-form'
  const selectSort = document.createElement('select')
  const selectSortLabel = document.createElement('label')
  selectSortLabel.htmlFor = selectSort
  selectSortLabel.textContent = 'Select sorting order'


  settingsDiv.appendChild(settingsForm)

  return settingsDiv;
};

function openMenu() {
  document.getElementById('settings-div').style.display = 'block'
}
