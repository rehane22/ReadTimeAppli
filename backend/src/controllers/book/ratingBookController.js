  const RatingBook = require('../models/rating');

  // Contrôleur pour ajouter une notation
  exports.addRating = async (req, res) => {
    try {
      const { user, book, rating } = req.body;
      const newRating = new RatingBook({ user, book, rating });
      await newRating.save();
      res.status(201).json({ message: 'Notation ajoutée avec succès' });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la notation :", error);
      res.status(500).json({ error: 'Erreur serveur lors de l\'ajout de la notation' });
    }
  };
  
  // Contrôleur pour calculer la moyenne des notations d'un livre spécifique
  exports.getAverageRatingByBook = async (req, res) => {
    try {
      const bookId = req.params.bookId;
      const averageRating = await RatingBook.aggregate([
        { $match: { book: mongoose.Types.ObjectId(bookId) } },
        { $group: { _id: null, average: { $avg: "$rating" } } }
      ]);
      if (averageRating.length > 0) {
        res.json({ averageRating: averageRating[0].average });
      } else {
        res.json({ averageRating: 0 }); // Aucune notation trouvée
      }
    } catch (error) {
      console.error("Erreur lors du calcul de la moyenne des notations :", error);
      res.status(500).json({ error: 'Erreur serveur lors du calcul de la moyenne des notations' });
    }
  };
  