const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'Укажите email',
    unique: true,
    lowercase: true,
    trim: true
  },
  displayName: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
