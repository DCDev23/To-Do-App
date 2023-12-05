class ToDoItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const todoText = this.getAttribute('text');
    const dueDate = this.getAttribute('due-date');

    const todoSpan = document.createElement('span');
    todoSpan.textContent = todoText;

    const dueDateSpan = document.createElement('span');
    dueDateSpan.textContent = `Due: ${dueDate}`;
    dueDateSpan.classList.add('due-date');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => {
      this.remove();
      this.saveTasks();
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.appendChild(dueDateSpan);
    buttonContainer.appendChild(deleteButton);

    this.appendChild(todoSpan);
    this.appendChild(buttonContainer);

    this.saveTasks();
  }

  saveTasks() {
    const todoItems = document.querySelectorAll('to-do-item');
    const tasks = [];
    for (let i = 0; i < todoItems.length; i++) {
      const item = todoItems[i];
      tasks.push({
        text: item.getAttribute('text'),
        dueDate: item.getAttribute('due-date')
      });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (savedTasks) {
      const todoList = document.getElementById('todo-list');
      for (let i = 0; i < savedTasks.length; i++) {
        const task = savedTasks[i];
        const newItem = document.createElement('to-do-item');
        newItem.setAttribute('text', task.text);
        newItem.setAttribute('due-date', task.dueDate);
        todoList.appendChild(newItem);
      }
    }
  }
}

customElements.define('to-do-item', ToDoItem);

document.addEventListener('DOMContentLoaded', () => {
  ToDoItem.loadTasks(); // Load tasks from localStorage when the page loads
  const closeDialogBtn = document.getElementById('closeDialogBtn');
  const invalidDateDialog = document.getElementById('invalidDateDialog');
  closeDialogBtn.addEventListener('click', () => {
    invalidDateDialog.close();
  });
});

function addTodo() {
  const todoInput = document.getElementById('todo-input');
  const dueDateInput = document.getElementById('due-date-input');
  const todoText = todoInput.value.trim();
  const dueDate = new Date(dueDateInput.valueAsDate); // Convert input to Date object
  
  const currentDate = new Date(); // Get the current date

  if (todoText !== '' && dueDate >= currentDate) {
    const todoList = document.getElementById('todo-list');
    const newItem = document.createElement('to-do-item');
    newItem.setAttribute('text', todoText);
    newItem.setAttribute('due-date', dueDate.toISOString().split('T')[0]); // Format date as yyyy-mm-dd
    todoList.appendChild(newItem);
    todoInput.value = '';
    dueDateInput.value = '';
  } else if (dueDate < currentDate) {
    const invalidDateDialog = document.getElementById('invalidDateDialog');
    invalidDateDialog.showModal();
  } else {
    // Handle other validation cases if needed
  }
}

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');
}
