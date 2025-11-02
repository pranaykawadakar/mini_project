const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const themeToggle = document.getElementById('themeToggle');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  if (tasks.length === 0) {
    taskList.innerHTML = '<p style="text-align:center;">No tasks added yet.</p>';
    return;
  }

  tasks.forEach((task, index) => {
    if (!task.title || !task.desc) return; // Prevent undefined display

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    taskDiv.innerHTML = `
      <div class="task-info">
        <h3>${task.title}</h3>
        <p>${task.desc}</p>
        <small>Due: ${task.dueDate}</small>
      </div>
      <div class="actions">
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

  if (!title || !desc || !dueDate) {
    alert('Please fill all fields');
    return;
  }

  tasks.push({ title, desc, dueDate });
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
  tasks.splice(index, 1); // Remove old task to replace later
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Dark/Light mode toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    themeToggle.textContent = '☀️ Light Mode';
  } else {
    themeToggle.textContent = '🌙 Dark Mode';
  }
});

// Initial render
renderTasks();
