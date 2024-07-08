const button = document.getElementById('button');
const todosContainer = document.getElementsByClassName('todos-container')[0];
let inputValue;
let todos = [];

button.addEventListener('click', () => {
    inputValue = document.getElementById('addTodo').value;
    todos.push(inputValue);
    createTodoElement(inputValue);
    addToLocalStorage();
});

function createTodoElement(value) {
    const todoDiv = document.createElement('div');
    const todoText = document.createElement('span');
    const deleteIcon = document.createElement('i');

    todoDiv.classList.add('todo');
    todoText.textContent = value;
    deleteIcon.classList.add('fa-solid', 'fa-xmark');
    deleteIcon.style.color = '#74C0FC';

    todoDiv.appendChild(todoText);
    todoDiv.appendChild(deleteIcon);
    todosContainer.appendChild(todoDiv);

    deleteIcon.addEventListener('click', () => {
        removeTodoElement(todoDiv);
    });
}

function addToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function onPageLoad() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
        todos.forEach(todo => {
            createTodoElement(todo);
        });
    }
}

function removeTodoElement(todoElement) {
    const todoText = todoElement.querySelector('span').textContent;
    const index = todos.indexOf(todoText);
    if (index !== -1) {
        todos.splice(index, 1);
        todoElement.remove();
        addToLocalStorage();
    }
}

window.addEventListener('load', onPageLoad);
