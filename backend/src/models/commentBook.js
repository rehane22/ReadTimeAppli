const mongoose = require('mongoose');


const commentBookSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalBook', required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const CommenBook = mongoose.model('CommentBook', commentBookSchema);

module.exports = CommentBook;
