const todoInput = document.querySelector('#todoInput');
const saveBtn = document.querySelector('#saveBtn');
const todoList = document.querySelector('#todoList');
const username = prompt("Enter your username..")
const currentUser = document.querySelector('#currentUser').textContent = username

const DB_URL = "https://tinkr.tech/sdb/todo_damian"; 

//Getting todo

async function getTodo() {
  const response = await fetch(DB_URL);
  const elements = await response.json();

  const userTodos = elements.filter(todo => todo.user === username);

  todoList.innerHTML = '';

  if (userTodos.length === 0) {
  const emptyMessage = document.createElement('p');
  emptyMessage.textContent = "No tasks yet...";
  emptyMessage.className = "emptyMessage";
  todoList.appendChild(emptyMessage);
  return;
}

  userTodos.forEach(todo => {
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todoDiv';

    const textSpan = document.createElement('span');
    textSpan.className = 'textDiv' 
    textSpan.textContent = todo.text;

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'actionsDiv';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'deleteBtn'

    deleteBtn.addEventListener('click', async () => {
      await fetch(`${DB_URL}/${todo.id}`, { method: 'DELETE' });
      getTodo();
    });

    const doneDiv = document.createElement('div');
    doneDiv.className = 'doneDiv';

    const doneChk = document.createElement('p');
    doneChk.className = 'p';
    doneChk.textContent = 'Done:';

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'checkBox'
    checkBox.checked = todo.done;

    checkBox.addEventListener('change', async () => {
      await fetch(`${DB_URL}/${todo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: username, text: todo.text, done: checkBox.checked })
      });
    });

    doneDiv.appendChild(doneChk);
    doneDiv.appendChild(checkBox);

    actionsDiv.appendChild(doneDiv)
    actionsDiv.appendChild(deleteBtn);

    todoDiv.appendChild(textSpan)
    todoDiv.appendChild(actionsDiv)

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
    body: JSON.stringify({ user:username, text, done: false})
  });

  todoInput.value = '';
  getTodo();
}

saveBtn.addEventListener('click', saveTodo);

todoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    saveTodo();
  }
});

getTodo();
