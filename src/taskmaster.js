import { compareAsc, compareDesc, format } from 'date-fns'
export function createTaskDiv(name, description, year=null, month=null, day=null) {
    const task = document.createElement('div');
    const title = document.createElement('div');
    const dates = document.createElement('div');
    const entryDate = document.createElement('div')
    const dueDate = document.createElement('div');
    const details = document.createElement('div');
    dates.classList.add('dates')
    task.classList.add('task');
    details.classList.add('details');
    details.textContent = description
    title.classList.add('title');
    title.innerText = name;
    const today = new Date()
    entryDate.innerHTML = 'entered: ' + format(today, 'yyyy-MM-dd');
    if (year && month && day) {
      dueDate.innerHTML = 'due on: ' + format(new Date(+year, +month-1, +day), 'yyyy-MM-dd');
    }
    task.appendChild(title);
    task.appendChild(details);
    dates.appendChild(entryDate);
    if (dueDate) dates.appendChild(dueDate);
    task.appendChild(dates)
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
  openBtn.setAttribute('id', 'open-button');
  openBtn.textContent = 'Add a new task?';
  openBtn.onclick = openForm;

  container.appendChild(openBtn);

  const newTaskDiv = document.createElement('div');
  newTaskDiv.setAttribute('id', 'new-task-div');
  newTaskDiv.style.display = 'none';

  const newTaskForm = document.createElement('form');
  newTaskForm.classList.add('form-container');

  const newTitle = document.createElement('input');
  const newTitleLabel = document.createElement('label');
  newTitle.type = 'text';
  newTitleLabel.textContent = 'Title';
  newTitleLabel.style.fontWeight = 'bold' ;
  newTitle.setAttribute('id', 'new-title');
  newTitle.required = 'true';
  newTitle.placeholder = "Enter title of your task (Required)";

  const newDetails = document.createElement('input');
  const newDetailsLabel = document.createElement('label');
  newDetails.type = 'text';
  newDetailsLabel.textContent = 'Details';
  newDetailsLabel.style.fontWeight = 'bold';
  newDetails.setAttribute('id', 'new-details');
  newDetails.placeholder = "Enter task details (optional)";

  const newDueDate =  document.createElement('input');
  const newDueDateLabel = document.createElement('label');
  newDueDate.type = 'date';
  newDueDateLabel.textContent = 'Due date (Optional)';
  newDueDateLabel.style.fontWeight = 'bold';
  newDueDate.setAttribute('id', 'new-due-date');
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
