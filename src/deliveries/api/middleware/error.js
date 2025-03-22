export const error =  (err, req, res, next) => {
    let error = err;
    let status = err.status || 500;
    //Response to client
    res.status(status).json({
        success: false,
        message: error.message,
    })
}