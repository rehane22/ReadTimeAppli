const mongoose = require('mongoose');


const ratingBookSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: String , required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  date: { type: Date, default: Date.now },
});

const RatingBook = mongoose.model('RatingBook', ratingBookSchema);

module.exports = RatingBook;
