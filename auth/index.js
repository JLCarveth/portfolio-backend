/**
 * @module Authenticator
 * @requires jsonwebtoken
 * @requires crypto
 * 
 * A JWT wrapper module that handles password hashing and token generation.
 * 
 * This module requires an environment variable `secretKey`.
*/

/**
 * @const jsonwebtoken OAuth JWT module
 */
const jwt = require('jsonwebtoken')

/**
 * @const crypto Node.js crypto module
 */
const crypto = require('crypto')

module.exports = {
    /**
     * Generates a new JWT
     * @memberof module:Authenticator
     * @function generateToken
     * @param {String} email Token holder's email address
     * @param {String} role Token holder's assigned role
     */
    generateToken: function (email, role) {
        return new Promise((resolve, reject) => {
            const payload = {
                'email': email,
                'role': role
            }

            jwt.sign(payload, process.env.secretKey, {
                expiresIn: '1h'
            }, (err, token) => {
                if (err) reject(err)
                else resolve(token)
            })
        })
    },

    /**
     * Verifies a json-web-token
     * @memberof module:Authenticator
     * @function verifyToken 
     * @param {String} token JWT to be verified
     * @return the decoded token, or throw an error
     */
    verifyToken: function (token) {
        return jwt.verify(token, process.env.secretKey)
    },

    /**
     * encrypts the provided password
     * @memberof module:Authenticator
     * @function hashPassword 
     * @param {String} password the string to be hashed
     * @return {Object.<String,String>} object containing the hash and salt
     */
    hashPassword: function (password) {
        const salt = this.generateSalt()
        const hash = crypto.createHmac('sha512', salt).update(password).digest('hex')
        return {
            'hash': hash,
            'salt': salt
        }
    },

    /**
     * Hashes a password with a pre-determined salt
     * @memberof module:Authenticator
     * @function hashWithSalt
     * @param {String} password the password to be hashed
     * @param {String} salt a random salting string
     * @return {Object.<String,String>} object containing the hash and salt
     */
    hashWithSalt: function (password, salt) {
        const hash = crypto.createHmac('sha512', salt).update(password).digest('hex')

        return {
            'hash': hash,
            'salt': salt
        }
    },

    /**
     * Compares a plaintext password to a hashed string
     * @memberof module:Authenticator
     * @function comparePassword
     * @param {String} password - String password attempt
     * @param {String} hash - hash
     * @param {String} salt - salt
     * @return {Boolean} true if the password and hash match
     */
    comparePassword: function (password, hash, salt) {
        return this.hashWithSalt(password, salt).hash == hash
    },

    /**
     * Generates a random alphanumeric string
     * @memberof module:Authenticator
     * @function generateSalt
     * @return {String} a 32-byte alphanumeric string
     */
    generateSalt: function () {
        return crypto.randomBytes(32).toString('hex')
    }
}