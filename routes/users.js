const express = require('express');
const usersRouter = express.Router();
const {handleValidationErrors, tweetNotFoundError, asyncHandler} = require('../utils.js');
const {User} = require('../db/models');
const {getUserToken} = require('../auth.js');
const {validationResult, check} = require('express-validator');
const bcrypt = require('bcryptjs')

const validateUsername =
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username");


const validateEmailAndPassword = [
    check("email")
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage("Please provide a valid email."),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a password."),
    ];

usersRouter.post("/", validateUsername, validateEmailAndPassword, handleValidationErrors, asyncHandler(async (req, res) => {
        const {username, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, email, hashedPassword});
        // TODO: Generate JSON Web Token (access token)
        const token = getUserToken(user);
        res.status(201).json({
            user: { id: user.id },
            token,
    });
        // TODO: Render user in JSON
    })
    );

module.exports = usersRouter;