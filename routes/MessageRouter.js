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
        MessageRepository.insertMessage(name, email, message).then((result) => {
            res.status(200).redirect("http://localhost/success.html");
        }).catch((error) => {
            res.status(500).send('Internal Server Error');
        });
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