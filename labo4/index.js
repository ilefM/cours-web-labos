import * as api from "./api.js";

await api.createUser();

const createTaskBtn = document.getElementById("create-task-btn");
createTaskBtn.addEventListener("click", async function () {
    const inputElement = document.getElementById("new-task-name");
    const todoName = inputElement.value;

    if (todoName) {
        await api.createTodo(todoName);
        await renderTodosPanel();
        inputElement.value = "";
    }
});

const renderTodosPanel = async function () {
    const todos = await api.getTodos();
    const todoContainer = document.getElementById("todos-container");
    todoContainer.innerHTML = "";

    todos.forEach(({ id, name }) => {
        const container = document.createElement("div");
        const inputElement = document.createElement("input");
        inputElement.value = name;
        inputElement.id = id;
        inputElement.dataset.todoId = id;

        const saveBtn = document.createElement("button");
        saveBtn.dataset.todoId = id;
        saveBtn.innerHTML = "Save";
        saveBtn.addEventListener("click", async function (event) {
            const todoId = event.target.dataset.todoId;
            const newName = document.getElementById(todoId).value;

            await api.updateTodo({ id: todoId, name: newName });
            await renderTodosPanel();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.dataset.todoId = id;
        deleteBtn.innerHTML = "Delete";
        deleteBtn.addEventListener("click", async function (event) {
            const todoId = event.target.dataset.todoId;
            await api.deleteTodo(todoId);
            await renderTodosPanel();
        });

        container.appendChild(inputElement);
        container.appendChild(saveBtn);
        container.appendChild(deleteBtn);
        todoContainer.appendChild(container);
    });
};

await renderTodosPanel();
