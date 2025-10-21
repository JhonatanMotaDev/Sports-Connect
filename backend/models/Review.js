const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: [true, 'Event is required']
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Reviewer is required']
  },
  reviewee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Reviewee is required']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  comment: {
    type: String,
    maxlength: [500, 'Comment cannot be more than 500 characters'],
    trim: true
  },
  categories: {
    punctuality: {
      type: Number,
      min: 1,
      max: 5
    },
    skill: {
      type: Number,
      min: 1,
      max: 5
    },
    sportsmanship: {
      type: Number,
      min: 1,
      max: 5
    },
    communication: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved'
  }
}, {
  timestamps: true
});

reviewSchema.index({ event: 1, reviewer: 1, reviewee: 1 }, { unique: true });

reviewSchema.index({ reviewee: 1 });

reviewSchema.index({ event: 1 });

reviewSchema.virtual('overallRating').get(function() {
  if (this.categories) {
    const categories = Object.values(this.categories).filter(val => val !== undefined);
    return categories.length > 0 ? categories.reduce((sum, val) => sum + val, 0) / categories.length : this.rating;
  }
  return this.rating;
});

module.exports = mongoose.model('Review', reviewSchema);
