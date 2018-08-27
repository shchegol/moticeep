import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: String,
  value: Number,
  editable: Boolean,
  favorite: Boolean,
}, {
  timestamps: true,
});

export default mongoose.model('Task', taskSchema);
