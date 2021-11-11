const express = require('express');
const {Tweet, User} = require('../db/models');
const router = express.Router();
const {validationResult, check} = require('express-validator')
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const csrfProtection = csrf({cookie:true});

router.use(cors({ origin: "http://localhost:4000" }));
router.use(cookieParser());
router.use(express.urlencoded({extended:false}));

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


router.get('/',async(req,res) => {
    const findTweets = await Tweet.findAll({
        include: User
    });

    res.json({findTweets});
});

router.get('/:id(\\d+)',tweetNotFoundError, async(req,res) => {
    const findTweet = await Tweet.findByPk(req.params.id);

    res.json({findTweet});
});

router.post('/', handleValidationErrors, async (req, res) => {
    const postTweet = await Tweet.create({message: req.body.message});

    res.json({postTweet})
})

router.get('/new', csrfProtection,async(req,res) => {
    res.render('new-tweet',{
        csrfToken: req.csrfToken()
    });
})

router.put('/:id(\\d+)', handleValidationErrors, tweetNotFoundError, async (req, res) => {
    const updateTweet = await Tweet.findByPk(req.params.id)
    const finalUpdate = await updateTweet.update({message: req.body.message})
    
    res.json({finalUpdate})
});

router.delete('/:id(\\d+)', handleValidationErrors, tweetNotFoundError, async (req, res) => {
    const deleteTweet = await Tweet.findByPk(req.params.id);
    const finalDelete = await deleteTweet.destroy();

    res.json({deleteTweet})
    res.status(204).end();
})

module.exports = router;