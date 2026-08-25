const apiError = require("../utils/apiError")

const notFound = (req,res,next) => {
    next(apiError(404,`This page of ${req.url} is not found`))
}
module.exports = notFound ;