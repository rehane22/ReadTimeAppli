const CommentBook = require('../../models/commentBook');


const addCommentBook = async (req, res) => {
  try {
    const { user, book, content } = req.body;
    const comment = new CommentBook({ user, book, content });
    await comment.save();
    res.status(201).json({ message: 'Commentaire ajouté avec succès' });
  } catch (error) {
    console.error("Erreur lors de l'ajout du commentaire :", error);
    res.status(500).json({ error: 'Erreur serveur lors de l\'ajout du commentaire' });
  }
};


const getCommentsByBook = async (req, res) => {

  try {
    const bookId = req.params.bookId;

    const comments = await CommentBook.find({ book: bookId }).populate('user', 'username');

    res.json(comments);
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires :", error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des commentaires' });
  }
};


module.exports = {
  addCommentBook,
  getCommentsByBook
};