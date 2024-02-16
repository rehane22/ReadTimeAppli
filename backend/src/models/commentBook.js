const mongoose = require('mongoose');


const commentBookSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const CommentBook = mongoose.model('CommentBook', commentBookSchema);

module.exports = CommentBook;
