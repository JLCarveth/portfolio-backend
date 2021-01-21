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

const auth = require('../auth');

function createRouter(UserRepository) {
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
        UserRepository.getUser(email).then((results) => {
            // If there are no results
            if (results[0].length == 0) {
                res.status(401).redirect('https://localhost/error.html');
            }
            // Hash the password guess and compare to stored hash
            const user = results[0][0];
            if (auth.comparePassword(password, user.hash, user.salt)) {
                // Password checks out, givem a token!
                auth.generateToken(email, 'admin').then((token) => {
                    res.cookie('token', token, {
                        'domain': 'https://jlcarveth.dev',
                        'maxAge': 3600 * 72,
                        'httpOnly': true
                    });
                    res.status(200).redirect('https://localhost/');
                }).catch((error) => {
                    res.status(500).redirect('https://localhost/error.html');
                });
            }
        }).catch((error) => {
            res.status(500).redirect('https://localhost/error.html');
        });
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
        // MySQL will worry about checking that the email is unique
        // So just generate the salt + hash the password.
        const hash = auth.hashWithSalt(password, auth.generateSalt());
        UserRepository.createUser(name, email, hash.hash, hash.salt).then((result) => {
            // Generate a token and send it back as a cookie
            auth.generateToken(email, 'admin').then((token) => {
                res.cookie('token', token, {
                    'domain' : 'https://jlcarveth.dev',
                    'maxAge' : 3600 * 72,
                    'httpOnly' : true
                });
                res.status(200).redirect('https://localhost/');
            }).catch((error) => {
                res.status(500).redirect('https://localhost/error.html');
            });
        }).catch((error) => {
            res.status(500).redirect('https://localhost/error.html');
        });
    });

    return router;
}

module.exports = createRouter;