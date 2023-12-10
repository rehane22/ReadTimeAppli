// routes/personalLibraryRoutes.js
const express = require('express');
const router = express.Router();
const personalLibraryController = require('../controllers/personalLibraryController');

// Ajouter un livre à la bibliothèque personnelle
router.post('/add-book', personalLibraryController.addBookToLibrary);

// Récupérer la bibliothèque personnelle d'un utilisateur
router.get('/:userId', personalLibraryController.getPersonalLibrary);

// Supprimer un livre de la bibliothèque personnelle
router.delete('/remove/:bookId', personalLibraryController.removeBookFromLibrary);

module.exports = router;
