const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const themeToggle = document.getElementById('themeToggle');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editIndex = -1;

function renderTasks() {
  taskList.innerHTML = '';
  if (tasks.length === 0) {
    taskList.innerHTML = '<p style="text-align:center;">No tasks added yet.</p>';
    return;
  }

  tasks.forEach((task, index) => {
    if (!task.title || !task.desc) return;

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    if (task.completed) taskDiv.classList.add('completed');

    taskDiv.innerHTML = `
      <div class="task-info">
        <h3>${task.title}</h3>
        <p>${task.desc}</p>
        <small>Due: ${task.dueDate}</small><br>
        <span class="priority ${task.priority}">Priority: ${task.priority}</span>
      </div>
      <div class="actions">
        <button onclick="toggleComplete(${index})">${task.completed ? '❌ Undo' : '✅ Done'}</button>
        <button onclick="editTask(${index})">✏️ Edit</button>
        <button onclick="deleteTask(${index})">🗑️ Delete</button>
      </div>
    `;
    taskList.appendChild(taskDiv);
  });
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const desc = document.getElementById('desc').value.trim();
  const dueDate = document.getElementById('dueDate').value;
  const priority = document.getElementById('priority').value;

  if (!title || !desc || !dueDate || !priority) {
    alert('Please fill all fields');
    return;
  }

  const task = { title, desc, dueDate, priority, completed: false };

  if (editIndex === -1) {
    tasks.push(task);
  } else {
    tasks[editIndex] = task;
    editIndex = -1;
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  taskForm.reset();
});

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function editTask(index) {
  const task = tasks[index];
  document.getElementById('title').value = task.title;
  document.getElementById('desc').value = task.desc;
  document.getElementById('dueDate').value = task.dueDate;
  document.getElementById('priority').value = task.priority;
  editIndex = index;
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    themeToggle.textContent = '☀️ Light Mode';
  } else {
    themeToggle.textContent = '🌙 Dark Mode';
  }
});

renderTasks();
