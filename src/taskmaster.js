import { compareAsc, compareDesc, format, isBefore, intervalToDuration } from 'date-fns'
import { deleteTask, editTask, getTaskDict } from './storage';

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
    deleteBtn.classList.add('delete-btn', 'buttons')
    deleteBtn.id = taskid;
    deleteBtn.onclick = deleteTask;
    buttonWrapper.appendChild(deleteBtn)

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.id = taskid;
    editBtn.classList.add('edit-button', 'buttons')
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

  container.appendChild(menuButtonWrapper)

  const settingsDiv = document.createElement('div')
  const settingsForm = document.createElement('form')
  settingsDiv.id = 'settings-div'
  settingsForm.className = 'settings-form'
  const selectSort = document.createElement('select')
  selectSort.id = 'select-sort'
  const selectSortLabel = document.createElement('label')
  selectSortLabel.htmlFor = selectSort
  selectSortLabel.textContent = 'Select sorting order'
  const options = {'Entry Asc':'Entry date ascending', 'Entry Dsc': 'Entry date descending', 
        'Due Asc':'Due date ascending', 'Due Dsc':'Due date descending', 
        'Alpha Asc':'Alphabetical ascending', 'Alpha Dsc':'Alphabetical descending'}
  Object.entries(options).forEach(([option, description]) => {
    // console.log(option, description)
    const opt = document.createElement('option');
    opt.value = option;
    opt.textContent = description;
    selectSort.appendChild(opt);
  });
  const saveChanges = document.createElement('button')
  saveChanges.className = 'btn'
  saveChanges.type = 'submit'
  saveChanges.textContent = 'Save changes'
  saveChanges.onclick = closeMenu
  const cancelBtn = document.createElement('input')
  cancelBtn.classList.add('btn','reset-btn')
  cancelBtn.type = 'reset'
  cancelBtn.value = 'Cancel'
  cancelBtn.onclick = closeMenu

  settingsForm.appendChild(selectSortLabel)
  settingsForm.appendChild(selectSort)
  settingsForm.appendChild(saveChanges)
  settingsForm.appendChild(cancelBtn)
  settingsDiv.appendChild(settingsForm)
  addSettingsListener(settingsForm)

  return settingsDiv;
};

function openMenu() {
  document.getElementById('settings-div').style.display = 'block'
}

function closeMenu() {
  document.getElementById('settings-div').style.display = 'none'
}

function addSettingsListener(DOMform) {
  DOMform.addEventListener("submit", (e) => {
      e.preventDefault();
      let sortChoice = document.getElementById('select-sort').value;
      // console.log(sortChoice)
      clearTasks()
      loadTaskDict(sortChoice)
  });
};

export function loadTaskDict(sortChoice) {
  let taskDict = getTaskDict();
  let taskArr = Object.entries(taskDict)
  if (!sortChoice) sortChoice = 'Entry Asc'
  switch (sortChoice) {
    case 'Entry Dsc':
      taskArr.sort((a,b) => compareDesc(Date.parse(a[1].entryTimeStamp), Date.parse(b[1].entryTimeStamp)))
      break;
    case 'Entry Asc':
      taskArr.sort((a,b) => compareAsc(Date.parse(a[1].entryTimeStamp), Date.parse(b[1].entryTimeStamp)))
      break;
    case 'Due Asc':
      taskArr.sort(function(a,b) {
        if (a[1].dueDate && b[1].dueDate) return compareAsc(Date.parse(a[1].dueDate), Date.parse(b[1].dueDate));
        else if (!a[1].dueDate && !b[1].dueDate) return compareAsc(Date.parse(a[1].entryTimeStamp), Date.parse(b[1].entryTimeStamp));
        else if (a[1].dueDate) return -1;
      });
      break;
    case 'Due Dsc':
      taskArr.sort(function(a,b) {
        if (a[1].dueDate && b[1].dueDate) return compareDesc(Date.parse(a[1].dueDate), Date.parse(b[1].dueDate));
        else if (!a[1].dueDate && !b[1].dueDate) return compareDesc(Date.parse(a[1].entryTimeStamp), Date.parse(b[1].entryTimeStamp))
        else if (a[1].dueDate) return 1
      });
      break;
    case 'Alpha Asc':
      taskArr.sort(function(a,b) {
        let a_title = a[1].title.toUpperCase();
        let b_title = b[1].title.toUpperCase();
        if (a_title > b_title) return 1;
        else if (a_title < b_title) return -1;
        else return compareAsc(Date.parse(a[1].entryTimeStamp), Date.parse(b[1].entryTimeStamp))
      })
      break;
    case 'Alpha Dsc':
      taskArr.sort(function(a,b) {
        let a_title = a[1].title.toUpperCase();
        let b_title = b[1].title.toUpperCase();
        if (a_title > b_title) return -1;
        else if (a_title < b_title) return 1;
        else return compareAsc(Date.parse(a[1].entryTimeStamp), Date.parse(b[1].entryTimeStamp))
      })
      break;
  };
  // clearTasks()
  taskArr.forEach(([id,value]) => {
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
        };
    };
    container.appendChild(task)
  });
};

function clearTasks() {
  let elements = document.querySelectorAll('.task')
  elements.forEach((el)=>el.parentNode.removeChild(el))
};

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