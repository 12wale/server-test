import mongoose from 'mongoose';
const ContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Welcome to My Website'
  },
  description: {
    type: String,
    required: true,
    default: 'This is a simple MERN stack application.'
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/600x400'
  }
}, { timestamps: true });

// We will only have one document for this simple app, so we can just fetch the first one.
export default mongoose.model('Content', ContentSchema);