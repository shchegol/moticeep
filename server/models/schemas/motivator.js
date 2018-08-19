import mongoose from 'mongoose';

const motivatorSchema = new mongoose.Schema({
  title: String,
  description: String,
  value: Number,
  maxValue: Number,
});

export default motivatorSchema;
