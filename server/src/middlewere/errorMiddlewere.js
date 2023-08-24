const errorHandler = (err, req, res, next) => {
    const statusCode = res.status ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        msg: err.message,
        status : 'fail',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = { errorHandler }