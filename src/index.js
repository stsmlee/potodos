// import { compareAsc, format } from 'date-fns'
import { createTaskDiv } from './taskmaster'
import './style.css'

const container = document.createElement('div')
container.setAttribute('id', 'container')

for (let i=0;i<5;i++) {
    container.appendChild(createTaskDiv('Spudding', 'making potatoes', '2024', '07', '30'))
}

document.body.appendChild(container)
