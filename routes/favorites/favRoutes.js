var express = require('express');
var router = express.Router();
var passport = require('passport');
var favController = require('./favController')
/* GET home page. */
// router.get('/get-all-talks', talkController.getAllTalks);

router.post('/add-favorite', favController.addToFavorites);

router.get('/get-favorites-by-id/:id', favController.getFavoritesByID);

router.delete('/delete/:uId/:MId', favController.deleteFavByID)

// router.get('/get-all-user-talks/:id', talkController.getAllUserTalks)

// router.delete('/delete-by-id/:id', talkController.deleteByID)

module.exports = router;
