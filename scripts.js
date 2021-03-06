const addTaskInput = document.querySelector(".add-task");
const addTaskButton = document.querySelector(".add-task-button");
const allTasksContainer = document.querySelector(".tasks");
const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks")) || [];

const validateInput = () => addTaskInput.value.trim().length > 0;

const addTask = () => {
  const InputIsValid = validateInput();

  if (!InputIsValid) {
    return;
  }

  const taskContent = document.createElement("p");
  taskContent.innerText = addTaskInput.value;

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-regular");
  deleteIcon.classList.add("fa-trash-can");

  deleteIcon.addEventListener("click", () => handleDeleteClick(taskContent));

  taskContent.appendChild(deleteIcon);

  allTasksContainer.appendChild(taskContent);

  tasksFromLocalStorage.push({
    description: taskContent.innerText,
  });

  updateLocalStorage();

  addTaskInput.value = "";
};

const handleDeleteClick = (taskContent) => {
  const index = tasksFromLocalStorage.indexOf(taskContent);

  taskContent.remove();

  tasksFromLocalStorage.splice(index);

  updateLocalStorage();
};

const updateLocalStorage = () => {
  const tasks = tasksFromLocalStorage.map((task) => {
    return { description: task.description };
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const refreshTasksUsingLocalStorage = () => {
  if (!tasksFromLocalStorage) return;

  for (const task of tasksFromLocalStorage) {
    const taskContent = document.createElement("p");
    taskContent.innerText = task.description;

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-regular");
    deleteIcon.classList.add("fa-trash-can");

    deleteIcon.addEventListener("click", () => handleDeleteClick(taskContent));

    taskContent.appendChild(deleteIcon);

    allTasksContainer.appendChild(taskContent);
  }
};

addTaskButton.addEventListener("click", () => addTask());

refreshTasksUsingLocalStorage();
