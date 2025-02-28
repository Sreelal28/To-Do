function addTask() {
  const taskInput = document.getElementById("inputTask");
  const taskList = document.getElementById("taskList");
  if (taskInput.value === "") {
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
}
function editTask(button) {
  const li = button.parentElement;
  const taskText = li.querySelector(".task-text");
  const editInput = li.querySelector(".edit-input");
  const saveButton = li.querySelector(".save-btn");
  const checkbox = li.querySelector(".check-box");
  checkbox.style.display = "none";
  editInput.value = taskText.textContent;
  taskText.style.display = "none";
  editInput.style.display = "block";
  button.style.display = "none";
  saveButton.style.display = "inline-block";
}
function doneTask(checkbox) {
  const li = checkbox.parentElement;
  const editButton = li.querySelector(".edit-btn");
  const saveButton = li.querySelector(".save-btn");
  const taskText = checkbox.nextElementSibling;

  if (checkbox.checked) {
    taskText.style.textDecoration = "line-through";
    taskText.style.color = "red";
    editButton.style.display = "none";
    saveButton.style.display = "none";
  } else {
    taskText.style.textDecoration = "none";
    taskText.style.color = "black";
    editButton.style.display = "inline-block";
    saveButton.style.display = "none";
  }
}
function saveTask(button) {
  const li = button.parentElement;
  const taskText = li.querySelector(".task-text");
  const editInput = li.querySelector(".edit-input");
  const editButton = li.querySelector(".edit-btn");
  const checkbox = li.querySelector(".check-box");
  checkbox.style.display = "block";
  taskText.textContent = editInput.value;
  taskText.style.display = "block";
  editInput.style.display = "none";
  button.style.display = "none";
  editButton.style.display = "inline-block";
}
function removeTask(button) {
  const li = button.parentElement;
  li.remove();
}
