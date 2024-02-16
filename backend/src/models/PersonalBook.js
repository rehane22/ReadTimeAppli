const mongoose = require('mongoose');

const personalBookSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  googleBookId: { type: String },
  title: { type: String, required: true },
  author: { type: String, required: true },
  coverImageUrl: { type: String },
});

const PersonalBook = mongoose.model('PersonalBook', personalBookSchema);

module.exports = PersonalBook;
