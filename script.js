const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");

function addTodoToDOM(todoText, isCompleted = false) {
    const listItem = document.createElement("li");
    listItem.classList.add("todo-item");
    if (isCompleted) listItem.classList.add("completed");

    const todoTextSpan = document.createElement("span");
    todoTextSpan.classList.add("todo-item-text");
    todoTextSpan.textContent = todoText;

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("todo-actions");

    const completeButton = document.createElement("button");
    completeButton.classList.add("action-button", "complete-button");
    completeButton.textContent = isCompleted ? "Uncomplete" : "Complete";

    function saveTodos() {
        const todos = [];
        document.querySelectorAll(".todo-item").forEach((item) => {
            todos.push({
                text: item.querySelector(".todo-item-text").textContent,
                completed: item.classList.contains("completed"),
            });
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function toggleComplete(listItem, completeButton) {
        listItem.classList.toggle("completed");
        completeButton.textContent = listItem.classList.contains("completed") ? "Uncomplete" : "Complete";
        saveTodos();
    }

    completeButton.addEventListener("click", () =>
        toggleComplete(listItem, completeButton)
    );

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("action-button", "delete-button");
    deleteButton.textContent = "Delete";

    function deleteTodo(listItem) {
        todoList.removeChild(listItem);
        saveTodos();
    }

    deleteButton.addEventListener("click", () => deleteTodo(listItem));

    actionsDiv.appendChild(completeButton);
    actionsDiv.appendChild(deleteButton);

    listItem.appendChild(todoTextSpan);
    listItem.appendChild(actionsDiv);
    todoList.appendChild(listItem);
    saveTodos();
}

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        addTodoToDOM(todoText);
        todoInput.value = "";
    }
}

addTodoBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
});

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach((todo) => addTodoToDOM(todo.text, todo.completed));
}

window.onload = loadTodos;
