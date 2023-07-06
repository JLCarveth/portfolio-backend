#!/usr/bin/env node
const express = require("express");
const app = express();
const port = process.env.PORT || 29742;

const db = require("./db");
var connection = db.connection;

const MessageRepository = new (require("./models/MessageRepository"))(
  connection
);
const UserRepository = new (require("./models/UserRepository"))(connection);

const UserController = new (require("./controllers/UserController"))(
  UserRepository
);
const MessageController = new (require("./controllers/MessageController"))(
  MessageRepository
);

const Router = require("./routes");
const MessageRouter = Router.MessageRouter(MessageController);
const AuthRouter = Router.AuthRouter(UserController);

/* Allows express to parse body parameters */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/contact", MessageRouter);
app.use("/api/", AuthRouter);

app.get("/api/ping", (_req, res) => {
  res.status(200).send("OK");
});

app.listen(port);
