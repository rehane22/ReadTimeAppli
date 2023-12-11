const PersonalBook = require("../models/PersonalBook");


exports.addBookToLibrary = async (req, res) => {
  try {
    const { user, title, author, coverImageUrl } = req.body; 

    if (!user) {
      return res.status(400).json({ error: "L'utilisateur est requis dans la requête." });
    }

    // Recherche si le livre existe déjà dans la bibliothèque personnelle de l'utilisateur
    const existingBook = await PersonalBook.findOne({
      user: user,
      title: title,
      author: author,
    });

    if (existingBook) {
      return res.status(400).json({ error: "Ce livre est déjà dans votre bibliothèque." });
    }

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
    const userId = req.params.userId;
    const bookId = req.params.bookId;
    
    // Vérifie si le livre appartient à l'utilisateur avant de le supprimer
    const removedBook = await PersonalBook.findOneAndDelete({ _id: bookId, user: userId });

    if (removedBook) {
      res.json({ message: 'Livre supprimé de la bibliothèque personnelle' });
    } else {
      res.status(404).json({ error: 'Livre non trouvé dans la bibliothèque de l\'utilisateur' });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du livre", error);
    res.status(500).json({ error: error.message });
  }
};
