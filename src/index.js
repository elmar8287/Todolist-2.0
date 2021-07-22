//import './style.css';
import todoStatusUpdate from './todoStatusUpdate.js';
import dragDrop from './dragDrop.js';
import deleteCompletedTodoItem from './deleteAll.js';

const tasks = localStorage.getItem('items')
  ? JSON.parse(localStorage.getItem('items'))
  : [
    { index: 0, description: 'Learn webpack', completed: false },
    { index: 1, description: 'Read 20 pages of book', completed: false },
    { index: 2, description: 'Create portfolio', completed: false },
  ];

localStorage.setItem('items', JSON.stringify(tasks));
const data = JSON.parse(localStorage.getItem('items'));

const addTodoTextBox = () => {
  const inputText = document.getElementById('input-text');
  inputText.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      const newItem = {
        index: parseInt(`${tasks.length}`),
        description: `${inputText.value}`,
        completed: false,
      };
      createList(newItem);
      tasks.push(newItem);
      localStorage.setItem('items', JSON.stringify(tasks));
    }
  });
};

addTodoTextBox();

const createList = (todoItem) => {
  if (!todoItem) {
    return;
  }

  const todoAppContainer = document.getElementById('todoAppContainer');

  const todoItemElement = document.createElement('div');
  todoItemElement.classList.add('item', 'borderBottom', 'draggable');
  todoItemElement.id = todoItem.index;
  todoItemElement.setAttribute('draggable', true);

  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = todoItem.completed;

  const descriptionSpan = document.createElement('span');
  descriptionSpan.classList.add('text');

  if (todoItem.completed) {
    descriptionSpan.classList.add('check');
  }

  const icon = document.createElement('i');
  icon.classList.add('fas', 'fa-ellipsis-v');
  todoAppContainer.appendChild(todoItemElement);
  descriptionSpan.innerHTML = todoItem.description;
  todoItemElement.append(checkbox, descriptionSpan, icon);
  dragDrop(tasks);
  todoStatusUpdate(tasks);
};


deleteCompletedTodoItem(tasks);
data.forEach((object) => {
  createList(object);
});
