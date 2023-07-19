import { compareAsc, format } from 'date-fns'
import './style.css'

function component() {
    const element = document.createElement('div');
  
    element.innerHTML = format(new Date(2014, 1, 11), 'yyyy-MM-dd');

    return element;
  }

const container = document.createElement('div')
container.setAttribute('id', 'container')
container.appendChild(component())
document.body.appendChild(container)
  
// document.body.appendChild(component());