import { compareAsc, format } from 'date-fns'

function component() {
    const element = document.createElement('div');
  
    element.innerHTML = format(new Date(2014, 1, 11), 'yyyy-MM-dd');

    return element;
  }
  
  document.body.appendChild(component());