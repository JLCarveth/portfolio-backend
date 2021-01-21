const express = require('express');
const app = express();
const port = 29742;

const db = require('./db');
var connection = db.connection;

/* Initialize config */
const config = require('./config');
config.populateEnvironment();

/* Third Party Libraries */
const bodyParser = require('body-parser');

const MessageRepository = new (require('./models/MessageRepository'))(connection);
const UserRepository = new (require('./models/UserRepository'))(connection);

const Router = require('./routes');
const MessageRouter = Router.MessageRouter(MessageRepository);
const AuthRouter = Router.AuthRouter(UserRepository);

/* Allows express to parse body parameters */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/contact', MessageRouter);
app.use('/', AuthRouter);

const server = app.listen(port);
