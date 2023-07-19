import { compareAsc, format } from 'date-fns'
import './style.css'

function createTaskDiv() {
    const element = document.createElement('div');
    element.innerHTML = format(new Date(2014, 1, 11), 'yyyy-MM-dd');
    element.classList.add('task')
    return element;
  }

const container = document.createElement('div')
container.setAttribute('id', 'container')
for (let i=0;i<5;i++) {
    container.appendChild(createTaskDiv())
}
document.body.appendChild(container)
