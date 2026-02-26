const todoInput = document.querySelector('#todoInput');
const saveBtn = document.querySelector('#saveBtn');
const todoList = document.querySelector('#todoList');

const DB_URL = "https://tinkr.ee/sdb/todo_damian"; 

async function mydb() {
  await fetch(DB_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: "My db" })
  });
}

async function getTodo() {
  const response = await fetch(DB_URL);
  const elements = await response.json();

  todoList.innerHTML = '';
  elements.forEach(todo => {
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todoElement';
    todoDiv.textContent = todo.text;
    todoList.appendChild(todoDiv);
  });
}

async function saveTodo() {
  const text = todoInput.value;
  if (!text) return;

  await fetch(DB_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });

  todoInput.value = '';
  getTodo();
}

saveBtn.addEventListener('click', saveTodo);

async function init() {
  await mydb();
  getTodo();
}

init();