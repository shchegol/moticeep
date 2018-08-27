import mongoose from 'mongoose';

const motivatorSchema = new mongoose.Schema({
  title: String,
  img: String,
  value: Number,
  maxValue: Number,
  done: Boolean,
  favorite: Boolean,
}, {
  timestamps: true,
});

export default mongoose.model('Motivator', motivatorSchema);
