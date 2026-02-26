const todoInput = document.querySelector('#todoInput');
const saveBtn = document.querySelector('#saveBtn');
const todoList = document.querySelector('#todoList');
const username = prompt("Enter username..")

const DB_URL = "https://tinkr.tech/sdb/todo_damian"; 

//Getting todo

async function getTodo() {
  const response = await fetch(DB_URL);
  const elements = await response.json();

  todoList.innerHTML = '';

  elements
  .filter(todo => todo.user === username)
  .forEach(todo => {
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todoElement';
    todoDiv.textContent = todo.text;

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = '❌';
    deleteBtn.style.marginLeft = '10px';

    deleteBtn.addEventListener('click', async () => {
      await fetch(`${DB_URL}/${todo.id}`, { method: 'DELETE' });
      getTodo();
    });

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.style.marginLeft = '50px';

    todoDiv.appendChild(deleteBtn);
    todoDiv.appendChild(checkBox);

    todoList.appendChild(todoDiv);
  });
}

//Saving todo

async function saveTodo() {
  const text = todoInput.value;
  if (!text) return;

  await fetch(DB_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user:username, text })
  });

  todoInput.value = '';
  getTodo();
}

saveBtn.addEventListener('click', saveTodo);

getTodo();
