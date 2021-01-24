#!/usr/bin/env node
const express = require('express');
const app = express();
const port = 29742;

/* Initialize config */
const config = require('./config');
config.populateEnvironment();

const db = require('./db');
var connection = db.connection;

/* Third Party Libraries */
const bodyParser = require('body-parser');

const MessageRepository = new (require('./models/MessageRepository'))(connection);
const UserRepository = new (require('./models/UserRepository'))(connection);

const UserController = new (require('./controllers/UserController'))(UserRepository);
const MessageController = new (require('./controllers/MessageController'))(MessageRepository);

const Router = require('./routes');
const MessageRouter = Router.MessageRouter(MessageController);
const AuthRouter = Router.AuthRouter(UserController);

/* Allows express to parse body parameters */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/contact', MessageRouter);
app.use('/api/', AuthRouter);

const server = app.listen(port);
