// External dependencies
const createHttpError = require("http-errors")

function notFoundMiddleware(req, res, next) {
    next(createHttpError(404, 'Your requested content was not found !'))
}

function defaultErrorMiddleware(err, req, res, next) {

    res.status(err.status || 500).json({
        message: (process.env.NODE_ENV === 'development') ? err.message : err
    })
}

module.exports = {
    notFoundMiddleware,
    defaultErrorMiddleware
}