import mongoose from 'mongoose';

const schemaMessage = mongoose.Schema({
  title: String,
  creator: String,
  message: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdDate: {
    type: Date,
    default: new Date(),
  },
});

export const postMessage = mongoose.model('postMessage', schemaMessage);
