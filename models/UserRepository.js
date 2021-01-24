/**
 * Contains code for CRUD operations on the User data within the database
 */
class UserRepository {
    constructor(database) {
        this.database = database;
    }

    /**
     * Creates a new User record on the database
     * @param {*} name name of the user
     * @param {*} email user's email address
     * @param {*} hash the user's hashed password
     * @param {*} salt the salt used to hash the password
     */
    createUser(name, email, hash, salt) {
        var that = this;
        return new Promise((resolve, reject) => {
            console.log('hash: ' + hash)
            console.log('hash length: ' + hash.length);
            if (!that.database) reject("No Database Injected");
            // Store all the details in the database
            that.database.execute('INSERT INTO `users` (name, email, hash, salt) VALUES (?,?,?,?)',
            [name, email, hash, salt]).then((result) => { resolve(result) }).catch((error) => { reject(error) })
        });
    }

    getUser(email) {
        var that = this;
        return new Promise((resolve, reject) => {
            if (!that.database) {
                reject("No database injected");
            }
            that.database.execute(
                'SELECT * FROM `users` WHERE `email` = ?', [email]).then((results) => {
                    resolve(results);
                }).catch((error) => {
                    reject(error);
                });
        });
    }
}

module.exports = UserRepository;