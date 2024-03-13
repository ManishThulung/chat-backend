"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map