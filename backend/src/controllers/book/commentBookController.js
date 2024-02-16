const CommentBook = require('../models/comment');


exports.addCommentBook = async (req, res) => {
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


exports.getCommentsByBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const comments = await Comment.find({ book: bookId }).populate('user', 'username');
    res.json(comments);
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires :", error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des commentaires' });
  }
};
