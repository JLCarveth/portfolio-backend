/**
 * @module MessageRouter
 * @requires express
 * 
 * This file defines the API routes regarding Authentication
 */

/**
 * @const express
 */
const express = require('express');

const UnauthorizedError = require('../errors/UnauthorizedError');
const UserNotFoundError = require('../errors/UserNotFoundError');

function createRouter(UserController) {
    /**
     * @const router
     * @namespace router
     */
    const router = express.Router();

    /**
     * Route handling user authentication.
     * Upon valid authentication, a token is issued
     * @name POST/login
     * @function
     * @memberof module:AuthRouter~router
     */
    router.post('/login', (req, res) => {
        // Check for existing user in database
        const email     = req.body.emailInput;
        const password  = req.body.passwordInput;
        UserController.login(email, password).then((token) => {
            res.cookie('token', token, {
                'domain': 'https://jlcarveth.dev',
                'maxAge': 3600 * 72,
                'httpOnly': true
            });
            res.status(200).redirect('https://jlcarveth.dev/');
        }).catch((error) => {
            // Will have more meaningful error responses once the frontend
            // is using React.js instead of static
            if (error instanceof UnauthorizedError) {
                res.status(401).redirect('https://jlcarveth.dev/error.html');
            } else if (error instanceof UserNotFoundError) {
                res.status(401).redirect('https://jlcarveth.dev/error.html');
            } else {
                res.status(500).redirect('https://jlcarveth.dev/error.html');
            }
        })
    });

    /**
     * Route handling user registration
     * @name POST/register
     * @function
     * @memberof module:AuthRouter~router
     */
    router.post('/register', (req, res) => {
        const name      = req.body.nameInput;
        const email     = req.body.emailInput;
        const password  = req.body.passwordInput;

        UserController.register(name, email, password).then((result) => {
            res.status(200).redirect('https://jlcarveth.dev/');
        }).catch((error) => {
            res.status(500).redirect('https://jlcarveth.dev/error.html');
        });
    });

    return router;
}

module.exports = createRouter;