// Function to add a new task with due date to the list
// Function to add a new task with due date to the list
function addTodo() {
  const todoInput = document.getElementById('todo-input');
  const dueDateInput = document.getElementById('due-date-input');
  const todoText = todoInput.value.trim();
  const dueDate = dueDateInput.value.trim();
  
  if (todoText !== '' && dueDate !== '') {
    const currentDate = new Date(); // Get the current date
    const selectedDate = new Date(dueDate); // Convert dueDate to a Date object

    if (selectedDate >= currentDate) {
      const todoList = document.getElementById('todo-list');
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span>${todoText}</span>
        <span class="due-date">Due: ${dueDate}</span>
        <button onclick="deleteTodo(this)">Delete</button>
      `;
      todoList.appendChild(listItem);
      todoInput.value = '';
      dueDateInput.value = '';
      
      saveTasks(); // Save tasks to localStorage
    } else {
      alert('Please select a due date on or after the present day!');
    }
  } else {
    alert('Please enter a task and due date!');
  }
}


// Function to delete a task from the list
function deleteTodo(element) {
  const listItem = element.parentElement;
  listItem.remove();
  
  saveTasks(); // Save tasks to localStorage after deletion
}

// Function to toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');
}

// Ensure dark mode persistence across page refreshes
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  if (isDarkMode) {
    body.classList.add('dark-mode');
  }
  
  loadTasks(); // Load tasks from localStorage when the page loads
});

// Save tasks to localStorage
function saveTasks() {
  const todoList = document.getElementById('todo-list');
  localStorage.setItem('tasks', todoList.innerHTML);
}

// Load tasks from localStorage
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  const todoList = document.getElementById('todo-list');

  if (savedTasks) {
    todoList.innerHTML = savedTasks;
  }
}

// Function to change screen orientation
function changeScreenOrientation(orientation) {
  screen.orientation.lock(orientation);
}

// Function to change screen aspect ratio
function changeScreenAspectRatio(aspectRatio) {
  document.documentElement.style.setProperty('--aspect-ratio', aspectRatio);
}

document.getElementById("portraitBtn").addEventListener("click", changeScreenOrientation("portrait-primary"));
document.getElementById("landscapeBtn").addEventListener("click", changeScreenOrientation("landscape-primary"));
document.getElementById("sixteenNineBtn").addEventListener("click", changeScreenAspectRatio("16/9"));
document.getElementById("sixteenNineBtn").addEventListener("click", changeScreenAspectRatio("4/3"));
