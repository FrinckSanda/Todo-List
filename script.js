
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

// Load saved tasks, or start with an empty list
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display all tasks
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        const li = document.createElement("li");
        const span = document.createElement("span");
        const deleteButton = document.createElement("button");

        span.textContent = task.text;
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");

        if (task.completed) {
            li.classList.add("completed");
        }

        // Click a task to mark it complete
        span.addEventListener("click", function() {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
        });

        // Delete a task
        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

// Save tasks in the browser
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// Add a new task
function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    taskInput.value = "";
    saveTasks();
}

// Add using the button
addButton.addEventListener("click", addTask);

// Add using the Enter key
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Show previously saved tasks
renderTasks();
