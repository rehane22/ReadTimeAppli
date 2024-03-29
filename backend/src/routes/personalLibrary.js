
const express = require('express');
const router = express.Router();
const personalLibraryController = require('../controllers/library/personalLibraryController');

router.post('/add', personalLibraryController.addBookToLibrary);
router.get('/:userId', personalLibraryController.getPersonalLibrary);
router.delete('/remove/:userId/:bookId', personalLibraryController.removeBookFromLibrary);
router.get('/check/:userId/:bookId', personalLibraryController.checkBookInLibrary);

module.exports = router;