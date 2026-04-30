const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    default: 'Development'
  },
  lessons: [{
    title: String,
    duration: String
  }],
  level: {
    type: String,
    default: 'Beginner'
  },
  requirements: [String],
  reviews: [{
    user: String,
    rating: Number,
    comment: String
  }],
  rating: {
    type: Number,
    default: 0
  },
  imageUrl: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
