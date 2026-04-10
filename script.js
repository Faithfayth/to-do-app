const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('taskList');

//CRUD- Create, Read, Update, Delete
// we enter a task, then we click the add button, the task is added to the list. This is the Create operation in CRUD.

//Creat - create a new task

addBtn.addEventListener("click", function() {
    const newTask = input.value.trim();

    if(newTask === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");// Create a new list item
    li.textContent = newTask; // Set the text of the list item to the new task
    list.appendChild(li); // Add the new list item to the task list element

    const editBtn =  document.createElement("button");
    editBtn.textContent =  "Edit";
    editBtn.style.fontSize = "10px";
    editBtn.style.color = "blue";

    editBtn.addEventListener("click", function() {
        const updatedTask = prompt("Enter updated task", li.firstChild.textContent);
        if(updatedTask !== null && updatedTask.trim() !== "") {
            li.textContent = updatedTask.trim();
        }
        li.appendChild(editBtn);
    })
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.fontSize = "10px";
    deleteBtn.style.color = "red";
    li.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", function() {
        list.removeChild(li);
    })






    input.value = ""; // Clear the input field after adding the task
})
//Read - read the tasks from the list and display them to the user. This is done by iterating through the list items and displaying their text content.
//Edit -  update a task

