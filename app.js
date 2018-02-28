// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event Listeners
loadEventListeners();

function loadEventListeners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task
  clearBtn.addEventListener('click', clearTasks);
  // Filter task
  filter.addEventListener('keyup', filterTasks);
}

// Get task from local storage
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // create li element
    const li = document.createElement('li');
    // add class to li
    li.className = 'collection-item';
    // add text node to li
    li.appendChild(document.createTextNode(task));
    // create link element
    const link = document.createElement('a');
    // add class to link
    link.className = 'delete-item secondary-content';
    // add remove icon 
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // add remove icon to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);
  });
}

// AddTask function
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add task');
  }
  
  // create li element
  const li = document.createElement('li');
  // add class to li
  li.className = 'collection-item';
  // add text node to li
  li.appendChild(document.createTextNode(taskInput.value));
  // create link element
  const link = document.createElement('a');
  // add class to link
  link.className = 'delete-item secondary-content';
  // add remove icon 
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // add remove icon to li
  li.appendChild(link);

  // append li to ul
  taskList.appendChild(li);

  // Store in Local storage
  storeTaskInLocalStore(taskInput.value)

  // clear input
  taskInput.value = '';
  e.preventDefault();
}

// store task
function storeTaskInLocalStore(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure to delete this task?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
  
}

// Clear task
function clearTasks() {
  // taskList.innerHTML = '';

  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from LS
  clearTasksFromLocalStorage();
}

// Clear from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  console.log(text);
  
  document.querySelectorAll('.collection-item').forEach(
    function(task) {
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    }
  );
}