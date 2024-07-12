let SavedTasks;

// Initialize SavedTasks from localStorage or create new array if none exists
if (localStorage.getItem('tasks') !== null) {
    SavedTasks = JSON.parse(localStorage.getItem('tasks'));
} else {
    SavedTasks = [];
}

// Function to save tasks to localStorage
function SaveTasks() {
    localStorage.setItem('tasks', JSON.stringify(SavedTasks));
}

// Function to add a new task
function AddTask() {
    const InputValue = document.getElementById('New-Task-Form').value.trim();
    if (InputValue !== '') {
        SavedTasks.push({ text: InputValue, completed: false });
        SaveTasks();
        RenderTasks();
        document.getElementById('New-Task-Form').value = '';
    } else {
        alert('Please enter a task');
    }
}

// Function to delete a task by index
function DeleteTask(index) {
    SavedTasks.splice(index, 1);
    SaveTasks();
    RenderTasks();
}

// Function to edit a task by index with a new value
function EditTask(index, newValue) {
    SavedTasks[index].text = newValue;
    SaveTasks();
}

// Function to toggle the completion status of a task by index
function ToggleTaskCompletion(index) {
    SavedTasks[index].completed = !SavedTasks[index].completed;
    SaveTasks();
    RenderTasks();
}

// Function to render all tasks dynamically on the webpage
function RenderTasks() {
    const TaskContainer = document.getElementById('Tasks-Container');
    TaskContainer.innerHTML = ''; // Clear previous content

    for (let i = 0; i < SavedTasks.length; i++) {
        const task = SavedTasks[i];

        // Create task item container
        const TaskItem = document.createElement('div');
        TaskItem.classList.add("d-flex", "flex-row", "mb-3");

        // Create task input element
        const TaskInput = document.createElement('input');
        TaskInput.type = 'text';
        TaskInput.value = task.text;
        TaskInput.readOnly = true;
        TaskInput.classList.add("New-Task-Form");
        if (task.completed) {
            TaskInput.classList.add('Completed-task');
        }

        // Create checkbox element
        const Checkbox = document.createElement('input');
        Checkbox.type = 'checkbox';
        Checkbox.classList.add("Task-Checkbox", "mr-2", "mt-2");
        Checkbox.checked = task.completed;
        Checkbox.onclick = function () {
            ToggleTaskCompletion(i);
        };

        // Create edit button element
        const EditButton = document.createElement('button');
        EditButton.classList.add("Edit-Button", "ml-3", "rounded");
        const EditButtonIcon = document.createElement('i');
        EditButtonIcon.classList.add("fa-solid", "fa-pen-to-square", "fa-lg");
        EditButton.appendChild(EditButtonIcon);
        EditButton.onclick = function () {
            if (TaskInput.readOnly) {
                TaskInput.readOnly = false;
                EditButton.innerHTML = '<i class="fa-solid fa-save fa-lg"></i>';
                TaskInput.focus();
            } else {
                const newTaskValue = TaskInput.value.trim();
                if (newTaskValue !== '') {
                    TaskInput.readOnly = true;
                    EditTask(i, newTaskValue);
                    EditButton.innerHTML = '<i class="fa-solid fa-pen-to-square fa-lg"></i>';
                } else {
                    alert('Please enter a task');
                }
            }
        };

        // Create delete button element
        const DeleteButton = document.createElement('button');
        DeleteButton.classList.add("Delete-Button", "ml-3", "rounded");
        const DeleteButtonIcon = document.createElement('i');
        DeleteButtonIcon.classList.add("fa-solid", "fa-trash", "fa-lg");
        DeleteButton.appendChild(DeleteButtonIcon);
        DeleteButton.onclick = function () {
            DeleteTask(i);
        };

        // Append elements to task item container
        TaskItem.appendChild(Checkbox);
        TaskItem.appendChild(TaskInput);
        TaskItem.appendChild(EditButton);
        TaskItem.appendChild(DeleteButton);

        // Append task item container to the tasks container
        TaskContainer.appendChild(TaskItem);
    }
}

// Initial rendering of tasks when the page loads
RenderTasks();
