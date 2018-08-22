import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  order: {
    type: Number,
    unique: true,
  },
  title: String,
  value: Number,
  editable: Boolean,
  favourite: Boolean,
});

export default taskSchema;
