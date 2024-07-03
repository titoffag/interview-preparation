if (typeof AggregateError !== 'function') {
    globalThis.AggregateError = class AggregateError extends Error {
        constructor(errors, message) {
            super(message);
            this.name = 'AggregateError';
            this.errors = errors;
        }
    }
}