const express = require('express');
const router = express.Router();
const commentController = require('../controllers/book/commentBookController');
const ratingController = require('../controllers/book/ratingBookController');

router.post('/comments', commentController.addCommentBook);
router.get('/comments/:bookId', commentController.getCommentsByBook);
router.post('/ratings/', ratingController.addRating);
router.get('/ratings/average/:bookId', ratingController.getAverageRatingByBook);
router.get('/ratings/:userId/:bookId', ratingController.getRatingByUserForBook);


module.exports = router;
    

