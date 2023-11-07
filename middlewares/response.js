function sendResponse(res, status, message, data = null, error = null) {
    const response = { status, message, data };
    if (data) response.data;
    if (error) response.error = error;
    res.send(response);
}

module.exports = { sendResponse };
