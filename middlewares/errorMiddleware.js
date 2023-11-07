const Status = require('../helper/status');
const Message = require('../helper/messages');

const errorMiddleware = (err, req, res, next) => {
    console.error(err);
    const response = err instanceof Error ? { status: Status.INTERNAL_SERVER_ERROR, message: Message.internalServerError } : err;
    const { status, message, data, error } = response;
    res.status(status).json({ message, data, error });
};

module.exports = errorMiddleware;
