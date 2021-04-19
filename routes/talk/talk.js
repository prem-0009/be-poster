var express = require('express');
var router = express.Router();
var passport = require('passport');
var talkController = require('./controller/talkController')
/* GET home page. */
router.get('/get-all-talks', talkController.getAllTalks);

router.post('/create-talk', talkController.createTalk);

router.get('/get-talk-by-id/:id', talkController.getTalkByID);

router.get('/get-all-user-talks/:id', talkController.getAllUserTalks)

router.delete('/delete-by-id/:id', talkController.deleteByID)

module.exports = router;
