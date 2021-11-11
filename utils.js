const {validationResult, check} = require('express-validator');

const asyncHandler = (handler) => (req, res, next) => handler (req, res, next).catch(next);

const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((error) => error.msg);
    
        const err = Error("Bad request.");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request.";
        return next(err);
      }
      next();
}

const tweetNotFoundError = async(req, res, next) => {
    const tweetSearch = await Tweet.findByPk(req.params.id);

    if(!tweetSearch) {
        const err = Error("Tweet not found.");
        err.status = 404;
        err.title = "Tweet not found.";
        next(err);
    } 
next();
}

module.exports = {handleValidationErrors, tweetNotFoundError, asyncHandler};
