const PersonalBook = require('../models/personalBookModel');

exports.addBookToLibrary = async (req, res) => {
  try {
    const { user, title, author, coverImageUrl } = req.body; 
    const newBook = new PersonalBook({ user, title, author, coverImageUrl });
    await newBook.save();
    res.status(201).json({ message: 'Livre ajouté à la bibliothèque personnelle' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPersonalLibrary = async (req, res) => {
  try {
    const userId = req.params.userId;
    const library = await PersonalBook.find({ user: userId }).populate('user'); 
    res.json(library);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeBookFromLibrary = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    await PersonalBook.findByIdAndRemove(bookId);
    res.json({ message: 'Livre supprimé de la bibliothèque personnelle' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
