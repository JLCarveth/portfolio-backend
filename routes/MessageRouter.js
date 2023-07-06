/**
 * @module MessageRouter
 * @requires express
 *
 * This file defines the API routes regarding Messaging
 * BaseURL: /api/contact
 */

/**
 * @const express
 */
const express = require("express");

const FRONTEND_URL = process.env.FRONTEND_URL || "localhost:80";

/**
 * Mail Service
 */
const mail = require("../services/mail");

// use Oauth to fetch a new  refresh token
const MailDispatcher = new mail("---");

function createRouter(MessageController) {
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
  router.post("/", (req, res) => {
    const name = req.body.nameInput;
    const email = req.body.emailInput;
    const message = req.body.messageInput;

    /* Check for any missing fields */
    if (!name || !email || !message) {
      res.status(400).send("Bad Request - Missing Parameters"); // Return a Bad Request error
      return;
    }

    MessageController.onMessage(name, email, message)
      .then(() => {
        res.status(200).redirect(`${FRONTEND_URL}/index.html?success=1#footer`);
      })
      .catch((error) => {
        res.status(500).send("Internal Server Error");
      });
  });

  /**
   * Route serving a JSON-formatted list of all messages in the database.
   * This route requires a valid token
   * @name GET/contact/getAllMessages
   * @function
   * @memberof module:MessageRouter~router
   */
  router.get("/messages", (_req, res) => {
    res.status(503).send("Not Yet Available");
  });

  return router;
}

module.exports = createRouter;
