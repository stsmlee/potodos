import { compareAsc, format } from 'date-fns'
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