import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: String,
  value: Number,
  single: Boolean,
}, {
  timestamps: true,
});

export default taskSchema;
