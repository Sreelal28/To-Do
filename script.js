function fetchTaskFromAPI() {
  const taskList = document.getElementById("taskList");
  const savedTasks = localStorage.getItem("local");
  if (savedTasks) {
    taskList.innerHTML = savedTasks;
  }
  const task = Math.floor(Math.random() * 200) + 1;
  if (savedTasks === "") {
    fetch(`https://jsonplaceholder.typicode.com/todos/${task}`)
      .then((response) => response.json())
      .then((data) => {
        addTaskFromAPI(data.title);
      })
      .catch((error) => console.log("Error fetching task:", error));
  }
}

function addTaskFromAPI(taskTitle) {
  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");
  li.innerHTML = `
        <input type="checkbox" class="check-box" onclick="doneTask(this)">
        <span class="task-text">${taskTitle}</span>
        <input type="text" class="edit-input">
        <button class="edit-btn" onclick="editTask(this)"><img src="./icons/edit.png"/></button>
        <button class="save-btn" onclick="saveTask(this)"><img src="./icons/save.png" /></button>
        <button onclick="removeTask(this)"><img src="./icons/delete.png" /></button>
    `;
  taskList.appendChild(li);
  localStorage.setItem("local", taskList.innerHTML);
}

function addTask() {
  const taskInput = document.getElementById("inputTask");
  const taskList = document.getElementById("taskList");
  if (taskInput.value.trim() === "") {
    alert("Please ENTER a task....");
    return;
  }
  const li = document.createElement("li");
  li.innerHTML = `
        <input type="checkbox" class="check-box" onclick="doneTask(this)">
        <span class="task-text">${taskInput.value}</span>
        <input type="text" class="edit-input">
        <button class="edit-btn" onclick="editTask(this)"><img src="./icons/edit.png"/></button>
        <button class="save-btn" onclick="saveTask(this)"><img src="./icons/save.png" /></button>
        <button onclick="removeTask(this)"><img src="./icons/delete.png" /></button>
    `;
  taskList.appendChild(li);
  taskInput.value = "";
  localStorage.setItem("local", taskList.innerHTML);
}
document
  .getElementById("inputTask")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
function editTask(button) {
  const li = button.parentElement;
  const taskText = li.querySelector(".task-text");
  const editInput = li.querySelector(".edit-input");
  const saveButton = li.querySelector(".save-btn");
  const checkbox = li.querySelector(".check-box");
  checkbox.disabled = true;
  editInput.value = taskText.textContent;
  taskText.style.display = "none";
  editInput.style.display = "inline-block";
  button.style.display = "none";
  saveButton.style.display = "inline-block";
  localStorage.setItem("local", taskList.innerHTML);
}
function doneTask(checkbox) {
  const li = checkbox.parentElement;
  const editButton = li.querySelector(".edit-btn");
  const saveButton = li.querySelector(".save-btn");
  const taskText = checkbox.nextElementSibling;

  if (checkbox.checked) {
    taskText.style.textDecoration = "line-through";
    taskText.style.textDecorationColor = "red";
    // editButton.style.display = "none";
    editButton.style.visibility = "hidden";
    saveButton.style.display = "none";
  } else {
    taskText.style.textDecoration = "none";
    taskText.style.color = "black";
    editButton.style.visibility = "visible";
    // editButton.style.display = "inline-block";
    saveButton.style.display = "none";
  }
  localStorage.setItem("local", taskList.innerHTML);
}
function saveTask(button) {
  const li = button.parentElement;
  const taskText = li.querySelector(".task-text");
  const editInput = li.querySelector(".edit-input");
  const editButton = li.querySelector(".edit-btn");
  const checkbox = li.querySelector(".check-box");
  if (editInput.value.trim() === "") {
    alert("Task cannot be empty!");
    return;
  }
  checkbox.disabled = false;
  taskText.textContent = editInput.value;
  taskText.style.display = "block";
  editInput.style.display = "none";
  button.style.display = "none";
  editButton.style.display = "inline-block";
  localStorage.setItem("local", taskList.innerHTML);
}
function removeTask(button) {
  const li = button.parentElement;
  const confirmDelete = confirm(`Are you sure you want to delete the task?`);
  if (confirmDelete) {
    li.remove();
  }
  localStorage.setItem("local", taskList.innerHTML);
}
fetchTaskFromAPI();
