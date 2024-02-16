const RatingBook = require('../../models/ratingBook');



const addRating = async (req, res) => {
  const { user, book, rating } = req.body;
  try {
    const { user, book, rating } = req.body;


    const existingRating = await RatingBook.findOne({ user, book });

    if (existingRating) {

      existingRating.rating = rating;
      await existingRating.save();
      res.status(200).json({ message: 'Note mise à jour avec succès' });
    } else {

      const newRating = new RatingBook({ user, book, rating });
      await newRating.save();
      res.status(201).json({ message: 'Notation ajoutée avec succès' });
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout ou de la mise à jour de la notation :", error);
    res.status(500).json({ error: 'Erreur serveur lors de l\'ajout ou de la mise à jour de la notation' });
  }

};


const getAverageRatingByBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const averageRating = await RatingBook.aggregate([
      { $match: { book: bookId } },
      { $group: { _id: null, average: { $avg: "$rating" } } }
    ]);
    if (averageRating.length > 0) {
      const formattedAverage = averageRating[0].average.toFixed(1);
      res.json({ averageRating: formattedAverage });
    } else {
      res.json({ averageRating: 0 });
    }
  } catch (error) {
    console.error("Erreur lors du calcul de la moyenne des notations :", error);
    res.status(500).json({ error: 'Erreur serveur lors du calcul de la moyenne des notations' });
  }
};

const getRatingByUserForBook = async (req, res) => {
  try {
    const { bookId, userId } = req.params;


    const rating = await RatingBook.findOne({ book: bookId, user: userId });

    if (rating) {
      res.json({ rating: rating.rating });
    } else {
      res.json({ rating: 0 });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de la note de l'utilisateur :", error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération de la note de l\'utilisateur' });
  }
};

module.exports = {
  addRating,
  getAverageRatingByBook,
  getRatingByUserForBook,
};
