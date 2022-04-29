const addTaskInput = document.querySelector(".add-task");
const addTaskButton = document.querySelector(".add-task-button");
const allTasksContainer = document.querySelector(".tasks");
const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks")) || [];

const validateInput = () => addTaskInput.value.trim().length > 0;

const InputChange = () => {
  const InputIsValid = validateInput();

  if (InputIsValid) {
    return addTaskInput.classList.remove("error");
  }
};

const addTask = () => {
  const InputIsValid = validateInput();

  if (!InputIsValid) {
    return addTaskInput.classList.add("error");
  }

  const taskContent = document.createElement("p");
  taskContent.innerText = addTaskInput.value;

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-regular");
  deleteIcon.classList.add("fa-trash-can");

  deleteIcon.addEventListener("click", () => handleDeleteClick(taskContent));

  taskContent.appendChild(deleteIcon);

  allTasksContainer.appendChild(taskContent);

  tasksFromLocalStorage.push(taskContent.innerText);

  updateLocalStorage(taskContent);

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
    return { description: task };
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
addTaskInput.addEventListener("change", () => InputChange());

refreshTasksUsingLocalStorage();
