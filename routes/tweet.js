const express = require('express');
const {Tweet} = require('../db/models');
const router = express.Router();


router.get('/',async(req,res) => {
    const findTweets = await Tweet.findAll();

    res.json({findTweets});
});

module.exports = router;