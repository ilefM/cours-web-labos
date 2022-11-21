const express = require("express");
const uuid = require("uuid");
const cors = require("cors");

const PORT = 3333;

const app = express();

const users = {};

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  next();
});

app.use("/:userId/*", (req, res, next) => {
  if (!(req.params.userId in users)) {
    res.sendStatus(400);
  } else {
    next();
  }
});

app.post("/users", (req, res) => {
  const id = uuid.v4();
  users[id] = [];
  res.send({ id });
});

// Get tasks
app.get("/:userId/tasks", (req, res) => {
  const tasks = users[req.params.userId];
  res.send({ tasks });
});

// Post a new task
app.post("/:userId/tasks/", (req, res) => {
  if (!req.body.name || req.body.name === "") {
    res.sendStatus(400);
  } else {
    const task = { ...req.body, id: uuid.v4() };
    users[req.params.userId].push(task);
    res.send(task);
  }
});

// Put an existing task
app.put("/:userId/tasks/:taskId", (req, res) => {
  if (
    !users[req.params.userId].some((task) => task.id === req.params.taskId) ||
    !req.body.name ||
    req.body.name === ""
  ) {
    res.sendStatus(400);
  } else {
    const taskIndex = users[req.params.userId].findIndex(
      (task) => task.id === req.params.taskId
    );
    users[req.params.userId][taskIndex].name = req.body.name;
    res.send(users[req.params.userId][taskIndex]);
  }
});

app.delete("/:userId/tasks/:taskId", (req, res) => {
  if (!users[req.params.userId].some((task) => task.id === req.params.taskId)) {
    res.sendStatus(400);
  } else {
    users[req.params.userId] = users[req.params.userId].filter(
      (task) => task.id !== req.params.taskId
    );
    res.sendStatus(204);
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
