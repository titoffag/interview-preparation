class DelegateError extends Error {
    constructor(message, cause) {
        super(message);
        this.cause = cause;
    }

    get inner() {
        return this.cause;
    }

    get name() {
        return this.constructor.name;
    }

    get message() {
        return this.cause.message;
    }

    get stack() {
        return this.cause.stack;
    }

    get code() {
        return this.cause.code;
    }

    get details() {
        return this.cause.details;
    }

    get debug() {
        return this.cause.debug;
    }

    get status() {
        return this.cause.status;
    }
}

class RequestError extends DelegateError {
    constructor(message, cause) {
        super(message, cause);
    }

    get name() {
        return 'RequestError';
    }

    get code() {
        return 'SDK_REQUEST_ERROR';
    }

    get status() {
        return 500;
    }

    get debug() {
        return true;
    }

    get details() {
        return {
            title: this.cause.status,
            description: this.cause.statusText
        };
    }
}