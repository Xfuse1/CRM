"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
function errorMiddleware(err, req, res, next) {
    console.error('Unhandled error:', err.stack || err.message || err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
}
