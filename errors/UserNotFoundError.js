class UserNotFoundError extends Error {
    constructor(email) {
        super();

        /**
         * Maintains proper strak trace for where our error was thrown
         * See [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types)
         */
        if (Error.captureStackTrace) Error.captureStackTrace(this, UserNotFoundError);

        this.name = 'UserNotFoundError';
        this.email = email;
        this.message = "User with email " + email + " was not found.";
    }
}

module.exports = UserNotFoundError;