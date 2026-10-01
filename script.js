let tasks = [];

const taskList = document.getElementById('taskList');
const input = document.getElementById('input-box');

function addTask(taskText = null, completed = false) {
    const text = taskText || input.value.trim();
    if (text === "") return;

    const newTask = document.createElement('li');

    const taskTextNode = document.createElement('span');
    taskTextNode.textContent = text;

    
     document.querySelector('.main-nav').style.display = 'block';

    //button container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'task-buttons';

    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
        const currentText = taskTextNode.textContent;
        const newText = prompt("Edit task:", currentText);
        if (newText && newText.trim() !== "")
             {
            taskTextNode.textContent = newText.trim();
            updateTaskInArray();
            saveData();
        }
    };

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
        newTask.remove();
        tasks = tasks.filter(t => t.text !== text); // Remove from array
        document.querySelector('.mobile-nav').style.display = 'block';
        saveData();
    };

    // Complete Button
    const completedBtn = document.createElement("button");
    completedBtn.innerText = "Complete";
    completedBtn.classList.add("Completed");

    if (completed) {
        newTask.style.textDecoration = "line-through";
    }

    completedBtn.addEventListener('click', () => {
        if (newTask.style.textDecoration === "line-through") {
            newTask.style.textDecoration = "none";
        } else {
            newTask.style.textDecoration = "line-through";
        }
        updateTaskInArray();
        saveData();
    });

    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);
    buttonContainer.appendChild(completedBtn);

    newTask.appendChild(taskTextNode);
    newTask.appendChild(buttonContainer);

    taskList.appendChild(newTask);

    if (!taskText) {
        // Only add to task array if this is a new user entry
        tasks.push({ text, completed: false });
    }

    input.value = "";
    saveData();

    function updateTaskInArray() {
        const index = tasks.findIndex(t => t.text === text);
        if (index !== -1) {
            tasks[index].text = taskTextNode.textContent;
            tasks[index].completed = newTask.style.textDecoration === "line-through";
        }
    }
}

function hideMobileNav() {
    document.querySelector('.mobile-nav').style.display = 'none';
}

function hideMainNav() {
    document.querySelector('.main-nav').style.display = 'none';
}

// Save to localStorage
function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const saved = localStorage.getItem("tasks");
    if (saved) {
        tasks = JSON.parse(saved);
        tasks.forEach(task => addTask(task.text, task.completed));
    }
}

// Initial load
loadTasks();
