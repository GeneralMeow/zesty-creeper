const get_todos = () => {
    let todos = new Array;
    let todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str);
    }
    return todos;
}

const add = () => {
    let task = document.getElementById('task').value;

    let todos = get_todos();
    todos.push(task);
    localStorage.setItem('todo', JSON.stringify(todos));

    show();

    return false;
}

function remove() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));

    show();

    return false;
}


const show = () => {
    let todos = get_todos();

    let html = '<ul>';
    for(let index=0; index<todos.length; index++) {
        html += '<li>' + todos[index] + '<button class="remove" id="' + index + '">x</button></li>';
    };
    html += '</ul>';

    document.getElementById('todos').innerHTML = html;

    let buttons = document.getElementsByClassName('remove');
    for (let jindex=0; jindex< buttons.length; jindex++) {
        buttons[jindex].addEventListener('click', remove);
    };
}

// document.getElementById('add').addEventListener('click', add);
// show();

module.exports = {
  add
}
