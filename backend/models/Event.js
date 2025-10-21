const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  sport: {
    type: String,
    required: [true, 'Sport is required'],
    enum: ['football', 'basketball', 'tennis', 'swimming', 'running', 'cycling', 'yoga', 'gym', 'soccer', 'volleyball', 'badminton', 'other']
  },
  skillLevel: {
    type: String,
    required: [true, 'Skill level is required'],
    enum: ['beginner', 'intermediate', 'advanced', 'all']
  },
  date: {
    type: Date,
    required: [true, 'Event date is required'],
    validate: {
      validator: function(date) {
        return date > new Date();
      },
      message: 'Event date must be in the future'
    }
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Duration is required'],
    min: [15, 'Duration must be at least 15 minutes'],
    max: [480, 'Duration cannot exceed 8 hours']
  },
  maxParticipants: {
    type: Number,
    required: [true, 'Maximum participants is required'],
    min: [2, 'Minimum 2 participants required'],
    max: [100, 'Maximum 100 participants allowed']
  },
  currentParticipants: {
    type: Number,
    default: 0
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      index: '2dsphere'
    },
    address: {
      type: String,
      required: [true, 'Address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    country: {
      type: String,
      required: [true, 'Country is required']
    },
    venue: {
      type: String,
      trim: true
    }
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Organizer is required']
  },
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['confirmed', 'pending', 'cancelled'],
      default: 'confirmed'
    }
  }],
  requirements: {
    equipment: [String],
    experience: String,
    ageRange: {
      min: { type: Number, min: 13 },
      max: { type: Number, max: 100 }
    },
    specialInstructions: String
  },
  cost: {
    amount: {
      type: Number,
      default: 0,
      min: [0, 'Cost cannot be negative']
    },
    currency: {
      type: String,
      default: 'USD',
      enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
    },
    includes: [String] // What's included in the cost
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'cancelled', 'completed'],
    default: 'draft'
  },
  tags: [String],
  images: [String], // URLs to event images
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringPattern: {
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      required: function() {
        return this.isRecurring;
      }
    },
    endDate: {
      type: Date,
      required: function() {
        return this.isRecurring;
      }
    }
  }
}, {
  timestamps: true
});

// Index for geospatial queries
eventSchema.index({ 'location.coordinates': '2dsphere' });

// Index for text search
eventSchema.index({ title: 'text', description: 'text', sport: 'text' });

// Index for date queries
eventSchema.index({ date: 1 });

// Index for sport and skill level
eventSchema.index({ sport: 1, skillLevel: 1 });

// Virtual for available spots
eventSchema.virtual('availableSpots').get(function() {
  return this.maxParticipants - this.currentParticipants;
});

// Virtual for is full
eventSchema.virtual('isFull').get(function() {
  return this.currentParticipants >= this.maxParticipants;
});

// Virtual for is past
eventSchema.virtual('isPast').get(function() {
  return this.date < new Date();
});

// Method to add participant
eventSchema.methods.addParticipant = function(userId) {
  if (this.isFull) {
    throw new Error('Event is full');
  }
  
  if (this.isPast) {
    throw new Error('Cannot join past events');
  }
  
  const existingParticipant = this.participants.find(p => p.user.toString() === userId.toString());
  if (existingParticipant) {
    throw new Error('User is already a participant');
  }
  
  this.participants.push({ user: userId });
  this.currentParticipants = this.participants.length;
  return this.save();
};

// Method to remove participant
eventSchema.methods.removeParticipant = function(userId) {
  this.participants = this.participants.filter(p => p.user.toString() !== userId.toString());
  this.currentParticipants = this.participants.length;
  return this.save();
};

// Pre-save middleware to update currentParticipants
eventSchema.pre('save', function(next) {
  if (this.isModified('participants')) {
    this.currentParticipants = this.participants.length;
  }
  next();
});

module.exports = mongoose.model('Event', eventSchema);
