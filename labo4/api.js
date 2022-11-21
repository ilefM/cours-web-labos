const endpoint = "https://glo3102lab4.herokuapp.com";
let userId = "";

export const createUser = async function () {
    const req = new Request(`${endpoint}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const res = await fetch(req);
    const id = (await res.json()).id;
    userId = id;
    console.log(userId);
};

export const createTodo = async function (todoName) {
    const req = new Request(`${endpoint}/${userId}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: todoName,
        }),
    });

    const res = await fetch(req);
    return res.json();
};

export const getTodos = async function () {
    const req = new Request(`${endpoint}/${userId}/tasks`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const res = await fetch(req);
    const tasks = (await res.json()).tasks;
    console.log(tasks);
    return tasks;
};

export const updateTodo = async function ({ id, name }) {
    const req = new Request(`${endpoint}/${userId}/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
        }),
    });

    const res = await fetch(req);
    await res.json();
};

export const deleteTodo = async function (id) {
    const req = new Request(`${endpoint}/${userId}/tasks/${id}`, {
        method: "DELETE",
    });

    await fetch(req);
};
