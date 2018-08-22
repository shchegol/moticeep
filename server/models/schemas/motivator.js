import mongoose from 'mongoose';

const motivatorSchema = new mongoose.Schema({
  order: {
    type: Number,
    unique: true,
  },
  title: String,
  img: String,
  value: Number,
  maxValue: Number,
  done: Boolean,
  favourite: Boolean,
});

export default motivatorSchema;
