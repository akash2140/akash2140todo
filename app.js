// Taking the selectors of form items
const inputTo = document.querySelector(".agenda-input");
const buttonTo = document.querySelector(".agenda-button");
const listTo = document.querySelector(".todo-list");

document.addEventListener("DOMContentLoaded", getItems);
buttonTo.addEventListener("click", addItem);
listTo.addEventListener("click", deleteItem);

//for deleting the items from the Agenda List
function deleteItem(e) {
  const element = e.target;

  if (element.classList[0] === "delete-button") {
    const todo = element.parentElement;
    
    todo.classList.add("fall");
    todo.classList.add("completed");
    removeLocalTodos(todo);
    
    todo.addEventListener("transitionend", (e) => {
      todo.remove();
    });
  }
  
  if (element.classList[0] === "complete-button") {
    const todo = element.parentElement;
    console.log(todo);
    todo.classList.toggle("completed");
  }
}


//Saving the todo list in the local storage
function saveLocalTodos(todo) {
  let todos;
  
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos;
  
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  
  const todoIndex = todo.children[0].innerText;
  
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Adding the items in To do List
function addItem(e) {
  e.preventDefault();
  
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  
  const newTodo = document.createElement("li");
  newTodo.innerText = inputTo.value;

  saveLocalTodos(inputTo.value);
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  inputTo.value = "";

  const completedButton = document.createElement("button");
  completedButton.innerHTML = `✓`;
  completedButton.classList.add("complete-button");
  todoDiv.appendChild(completedButton);
  
  const cross=document.getElementsByClassName('todo-item');
  console.log(cross);


  const trashButton = document.createElement("button");
  trashButton.innerHTML = `✗`;
  trashButton.classList.add("delete-button");
  todoDiv.appendChild(trashButton);

  listTo.appendChild(todoDiv);
}
//Getting the Todo Items 
function getItems() {
  let todos;
  
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    inputTo.value = "";

    const completedButton = document.createElement("button");
    completedButton.innerHTML = `✓`;
    completedButton.classList.add("complete-button");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `✗`;
    trashButton.classList.add("delete-button");
    todoDiv.appendChild(trashButton);

    listTo.appendChild(todoDiv);
  });
}
