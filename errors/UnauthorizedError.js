class UnauthorizedError extends Error {
    constructor() {
        super();

        /**
         * Maintains proper strak trace for where our error was thrown
         * See [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types)
         */
        if (Error.captureStackTrace) Error.captureStackTrace(this, UnauthorizedError);

        this.name = 'UnauthorizedError';

        this.message = "Unauthorized";
    }
}

module.exports = UnauthorizedError;