import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  title: String,
  value: Number,
  single: Boolean,
}, {
  timestamps: true,
});

export default mongoose.model('Task', userSchema);
