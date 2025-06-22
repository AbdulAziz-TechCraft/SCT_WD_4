document.getElementById('task-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const desc = document.getElementById('task-input').value;
  const time = document.getElementById('task-time').value;
  const category = document.getElementById('task-category').value;
  const priority = document.getElementById('task-priority').value;

  addTask(desc, time, category, priority);
  this.reset();
});

document.getElementById('filter-category').addEventListener('change', filterTasks);

function addTask(desc, time, category, priority) {
  const li = document.createElement('li');
  li.setAttribute('data-category', category);

  li.innerHTML = `
    <div class="task-info">
      <strong>${desc}</strong>
      <div class="task-meta">
        ${category} | Priority: ${priority} | Due: ${new Date(time).toLocaleString()}
      </div>
    </div>
    <div class="task-actions">
      <button onclick="completeTask(this)">✔</button>
      <button onclick="editTask(this)">✎</button>
      <button onclick="deleteTask(this)">🗑</button>
    </div>
  `;

  document.getElementById('task-list').appendChild(li);
}

function completeTask(btn) {
  btn.closest('li').classList.toggle('completed');
}

function editTask(btn) {
  const li = btn.closest('li');
  const descElem = li.querySelector('strong');
  const meta = li.querySelector('.task-meta').textContent.split('|');

  const oldDesc = descElem.textContent;
  const oldCategory = meta[0].trim();
  const oldPriority = meta[1].split(':')[1].trim();
  const oldTime = new Date(meta[2].split(':')[1].trim()).toISOString().slice(0, 16);

  const newDesc = prompt('Edit task:', oldDesc) || oldDesc;
  const newCategory = prompt('Edit category:', oldCategory) || oldCategory;
  const newPriority = prompt('Edit priority:', oldPriority) || oldPriority;
  const newTime = prompt('Edit due time (YYYY-MM-DDTHH:MM):', oldTime) || oldTime;

  descElem.textContent = newDesc;
  li.querySelector('.task-meta').textContent = `${newCategory} | Priority: ${newPriority} | Due: ${new Date(newTime).toLocaleString()}`;
  li.setAttribute('data-category', newCategory);
}

function deleteTask(btn) {
  btn.closest('li').remove();
}

function filterTasks() {
  const filter = document.getElementById('filter-category').value;
  const tasks = document.querySelectorAll('#task-list li');
  tasks.forEach(task => {
    if (filter === "All" || task.getAttribute('data-category') === filter) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}
