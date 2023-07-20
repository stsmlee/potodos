import { compareAsc, compareDesc, format } from 'date-fns'
import { createTaskDiv, dates, openForm, closeForm, newTaskForm } from './taskmaster'
import './style.css'

const container = document.createElement('div')
container.setAttribute('id', 'container')

for (let i=0;i<5;i++) {
    container.appendChild(createTaskDiv('Spudding', 'making potatoes', '2024', '07', '30'))
}

document.body.appendChild(container)

container.appendChild(newTaskForm())

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