import { compareAsc, compareDesc, format } from 'date-fns'
import { createTaskDiv, dates } from './taskmaster'
import './style.css'

const container = document.createElement('div')
container.setAttribute('id', 'container')

for (let i=0;i<5;i++) {
    container.appendChild(createTaskDiv('Spudding', 'making potatoes', '2024', '07', '30'))
}

document.body.appendChild(container)

function openForm() {
    document.getElementById("new-task-div").style.display = "block";
};
function closeForm() {
    document.getElementById("new-task-div").style.display = "none";
};

const openBtn = document.createElement('button')
openBtn.setAttribute('id', 'open-button')
openBtn.textContent = 'Add a new task?'
openBtn.onclick = openForm

container.appendChild(openBtn)

const newTaskDiv = document.createElement('div')
newTaskDiv.setAttribute('id', 'new-task-div')
newTaskDiv.style.display = 'none'

const newTaskForm = document.createElement('form')
newTaskForm.classList.add('form-container')

const newTitle = document.createElement('input')
const newTitleLabel = document.createElement('label')
newTitle.type = 'text'
newTitleLabel.textContent = 'Title'
newTitleLabel.style.fontWeight = 'bold' 
newTitle.setAttribute('id', 'new-title')
newTitle.placeholder = "Enter title of your task (Required)"

const newDetails = document.createElement('input')
const newDetailsLabel = document.createElement('label')
newDetails.type = 'text'
newDetailsLabel.textContent = 'Details'
newDetailsLabel.style.fontWeight = 'bold'
newDetails.setAttribute('id', 'new-details')
newDetails.placeholder = "Enter task details (optional)"

const newDueDate =  document.createElement('input')
const newDueDateLabel = document.createElement('label')
newDueDate.type = 'date'
newDueDateLabel.textContent = 'Due date (optional)'
newDueDateLabel.style.fontWeight = 'bold'
newDueDate.setAttribute('id', 'new-due-date')
newDueDate.min = format(new Date(), 'yyyy-MM-dd')


newTaskForm.appendChild(newTitleLabel)
newTaskForm.appendChild(newTitle)
newTaskForm.appendChild(newDetailsLabel)
newTaskForm.appendChild(newDetails)
newTaskForm.appendChild(newDueDateLabel)
newTaskForm.appendChild(newDueDate)
newTaskDiv.appendChild(newTaskForm)
container.appendChild(newTaskDiv)

{/* <button id="open-button" onclick = "openForm()">Add a new task?</button>
<div id="add-form" style="display:none">
    <form class="form-container">
        <label for="new-title"><b>Title</b></label>
        <input type="text" placeholder="Enter title of your task (Required)" id="new-title">
    
        <label for="new-details"><b>Details</b></label>
        <input type="text" placeholder="Details optional" id="new-details">

        <label for="new-due-date">Due Date</label>
        <input type="date" id="new-due-date">
        
        <button type="submit" class="btn" onclick="closeForm()">Submit</button>
        <button type="button" class="btn close-button" onclick="closeForm()">Cancel</button>
    </form>
</div> */}

// let newBookForm = document.getElementById('add-form')
// newBookForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     let title = document.getElementById('new-title')
//     let author = document.getElementById('new-author')
//     let status = document.getElementById('new-status')
//     let newBook;
//     if (!title.value || !author.value) {
//         alert('All sections of form must be filled.');
//         openForm();
//     } else {
//         if (status.checked) {
//             newBook = new Book(title.value,author.value,'Read');
//         } else {
//             newBook = new Book(title.value,author.value,'Not yet');
//         }
//         title.value = ""
//         author.value = ""
//         status.checked = false
//         addBookToLibrary(newBook)
//         updateBookshelf()
//     };
// });

// console.log(dates)
// dates.forEach((date)=>console.log(date.task))