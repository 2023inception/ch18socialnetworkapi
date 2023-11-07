const { sendResponse } = require('../middlewares/response');

const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            // next(err)
            sendResponse(res, false, err.message);
        });
    };
};

module.exports = catchAsync;
