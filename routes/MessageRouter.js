/**
 * @module MessageRouter
 * @requires express
 * 
 * This file defines the API routes regarding Messaging
 */

/**
 * @const express
 */
const express = require('express');

/**
 * Mail Service
 */
const mail = require('../services/mail');

// use Oauth to fetch a new  refresh token
const MailDispatcher = new mail('ya29.a0AfH6SMBYLp7jBCUEcY8EPzhZtoDEHITwSxiNty3Ewm0VKn0a1aZEanG1J8DAutA2zhAIvNADY6xFRaYsSBp40hMVTQFJkaq4T7bFVZWlRVelD3e4hQb1bHz1IdydCnRB7qGEZj7tkEWGXeuxtAdYXxVOn3O8ZKkh4gasAC5wMI0');

function createRouter(MessageRepository) {
    /**
     * @const router
     * @namespace router
     */
    const router = express.Router();

    /**
     * Route handling contact form submissions
     * @name POST/contact/
     * @function
     * @memberof module:MessageRouter~router
     */
    router.post('/', (req, res) => {
        const name = req.body.nameInput;
        const email = req.body.emailInput;
        const message = req.body.messageInput;

        /* Check for any missing fields */
        if (!name || !email || !message) {
            res.status(400).send('Bad Request');// Return a Bad Request error
            return;
        }

        /* Otherwise, INSERT the message into the Database */
        MessageRepository.insertMessage(name, email, message).then(
            MailDispatcher.sendMessage({
            'from'      : email,
            'to'        : process.env.emailAddress,
            'subject'     : 'You\'ve got mail!',
            'text'        : "Sender: " + email
                            + "\nName: " + name
                            + "Message: " + message
        })).catch((error) => {
            res.status(500).send('Internal Server Error');
        })
        res.status(200).redirect("https://jlcarveth.dev/success.html")
    });

    /**
     * Route serving a JSON-formatted list of all messages in the database.
     * This route requires a valid token
     * @name GET/contact/getAllMessages
     * @function
     * @memberof module:MessageRouter~router
     */
    router.get('/getAllMessages', (req, res) => {

    });

    return router;
}

module.exports = createRouter;