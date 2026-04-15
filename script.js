const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('taskList');
const enterTask = document.getElementById('enterTask');
const taskCount = document.getElementById('taskCount');
const emptyTasks = document.getElementById('emptyTasks');
const clearBtn = document.getElementById('clearBtn');
const sureDiv = document.getElementById('sureDiv');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
let Tasks = JSON.parse(localStorage.getItem("Tasks")) || [];


//CRUD- Create, Read, Update, Delete
// we enter a task, then we click the add button, the task is added to the list. This is the Create operation in CRUD.

render();
if(Tasks.length === 0) {
    clearBtn.style.display = "none";
    enterTask.style.display = "none";
    taskCount.style.display = "none";
    sureDiv.style.display = "none";
    emptyTasks.style.display = "block";
} else {
    taskCount.style.display = "block";
    taskCount.textContent =  `You have ${Tasks.length} task${Tasks.length > 1 ? 's' : ''} to do.`;
    sureDiv.style.display = "none";
    emptyTasks.style.display = "none";

   
}  

function render() {
    list.innerHTML = "";

    Tasks.forEach(function(task, index) {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.innerText = task.text;

        if (task.done) {
            span.classList.add("done");
        }

        span.addEventListener("click", () => {
            task.done = !task.done;
            localStorage.setItem("Tasks", JSON.stringify(Tasks));
            render();
        });

        // EDIT BUTTON
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", function() {
            const updatedTask = prompt("Enter updated task", task.text);
            if (updatedTask && updatedTask.trim()) {
                task.text = updatedTask.trim();
                localStorage.setItem("Tasks", JSON.stringify(Tasks));
                render();
            }
        });

        // DELETE BUTTON
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function() {
            Tasks.splice(index, 1);
            localStorage.setItem("Tasks", JSON.stringify(Tasks));
            render();
        });

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        list.appendChild(li);
    });
}

function updateTaskCount() {
    
    if (Tasks.length > 0) {
        taskCount.style.display = "block";
        taskCount.textContent = `You have ${Tasks.length} task${Tasks.length > 1 ? 's' : ''} to do.`;
        clearBtn.style.display = "block";
        emptyTasks.style.display = "none";
    } else {
        emptyTasks.style.display = "block";
        taskCount.style.display = "none";
        clearBtn.style.display = "none";
    }
    

}

//Creat - create a new task

addBtn.addEventListener("click", function() {
    const newTask = input.value.trim();

    if(newTask === "") {
        enterTask.style.display = "block";   
        return;
    } else {
        enterTask.style.display = "none";
    }

    const task = {
        id: Date.now(),
        text: newTask,
        done: false
    }

    Tasks.push(task);
    localStorage.setItem("Tasks", JSON.stringify(Tasks));

    render();
    updateTaskCount();
    input.value = "";
});



enterTask.style.display = "none";
//Read - read the tasks from the list and display them to the user. This is done by iterating through the list items and displaying their text content.
//Edit -  update a task

clearBtn.addEventListener("click", function() {
    sureDiv.style.display = "block";
})

noBtn.addEventListener("click", function() {
    sureDiv.style.display = "none";
})

yesBtn.addEventListener("click", function() {
    Tasks = [];
    localStorage.removeItem("Tasks");
    render();
    clearBtn.style.display = "none";
    sureDiv.style.display = "none";
    updateTaskCount();
})
