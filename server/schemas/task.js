import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: String,
  value: Number,
  editable: Boolean,
});

export default taskSchema;
