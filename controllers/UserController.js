const UserNotFoundError = require('../errors/UserNotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const auth = require('../auth');
/**
 * Contains business logic for User domain objects
 */
class UserController {
    /**
     * Create a new UserController, injecting the appropriate Repository class
     * @param {UserRepository} UserRepository 
     */
    constructor(UserRepository) {
        this.repository = UserRepository;
    }

    /**
     * Attempts to authorize a login attempt
     * @param {*} email the user's email address
     * @param {*} password the user's password guess
     * 
     */
    login(email, password) {
        return new Promise((resolve, reject) => {
            // Check if email exists
            this.repository.getUser(email).then((results) => {
                if (results[0].length == 0) {
                    reject(new UserNotFoundError(email));
                }

                const user = results[0][0];
                // Compare the guess to the stored hash + salt
                if (auth.comparePassword(password, user.hash, user.salt)) {
                    // Password is a match
                    auth.generateToken(email, 'admin').then(
                        (token) => resolve(token)).catch((error) => reject(error));
                } else reject(new UnauthorizedError());
            });
        });
    }

    /**
     * Registers a new user with the repository
     * @param {*} name the name of the user
     * @param {*} email the user's email address
     * @param {*} password the user's desired password
     */
    register(name, email, password) {
        return new Promise((resolve, reject) => {
            const hash = auth.hashWithSalt(password, auth.generateSalt());
            this.repository.createUser(name, email, hash.hash, hash.salt)
                .then((result) => resolve(result))
                .catch((error) => reject(error));
        });
    }
}
module.exports = UserController;