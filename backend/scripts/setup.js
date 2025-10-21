const mongoose = require('mongoose');
const config = require('../config/config');

// Sample data for testing
const sampleUsers = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    bio: 'Passionate about basketball and tennis',
    interests: ['basketball', 'tennis'],
    skillLevel: 'intermediate',
    location: {
      type: 'Point',
      coordinates: [-74.0059, 40.7128], // New York
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      country: 'USA'
    }
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1234567891',
    bio: 'Love swimming and running',
    interests: ['swimming', 'running'],
    skillLevel: 'advanced',
    location: {
      type: 'Point',
      coordinates: [-122.4194, 37.7749], // San Francisco
      address: '456 Oak Ave',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA'
    }
  }
];

const sampleEvents = [
  {
    title: 'Morning Basketball Game',
    description: 'Join us for an energetic morning basketball game at the local court. All skill levels welcome!',
    sport: 'basketball',
    skillLevel: 'all',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    duration: 120,
    maxParticipants: 10,
    location: {
      type: 'Point',
      coordinates: [-74.0059, 40.7128],
      address: 'Central Park Basketball Court',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      venue: 'Central Park'
    },
    organizer: null, // Will be set after users are created
    requirements: {
      equipment: ['Basketball', 'Water bottle'],
      experience: 'Any level',
      ageRange: { min: 16, max: 65 }
    },
    cost: {
      amount: 0,
      currency: 'USD'
    },
    status: 'published',
    tags: ['morning', 'basketball', 'outdoor']
  },
  {
    title: 'Swimming Session',
    description: 'Regular swimming session at the community pool. Great for fitness and relaxation.',
    sport: 'swimming',
    skillLevel: 'intermediate',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    duration: 90,
    maxParticipants: 8,
    location: {
      type: 'Point',
      coordinates: [-122.4194, 37.7749],
      address: 'Community Pool',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      venue: 'SF Community Pool'
    },
    organizer: null, // Will be set after users are created
    requirements: {
      equipment: ['Swimsuit', 'Goggles', 'Towel'],
      experience: 'Intermediate level',
      ageRange: { min: 18, max: 50 }
    },
    cost: {
      amount: 5,
      currency: 'USD',
      includes: ['Pool access', 'Locker room']
    },
    status: 'published',
    tags: ['swimming', 'fitness', 'indoor']
  }
];

async function setupDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(config.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await mongoose.connection.db.dropDatabase();
    console.log('✅ Database cleared');

    // Import models
    const User = require('../models/User');
    const Event = require('../models/Event');

    // Create sample users
    console.log('👥 Creating sample users...');
    const users = await User.insertMany(sampleUsers);
    console.log(`✅ Created ${users.length} users`);

    // Update events with organizer IDs
    sampleEvents[0].organizer = users[0]._id;
    sampleEvents[1].organizer = users[1]._id;

    // Create sample events
    console.log('🏃 Creating sample events...');
    const events = await Event.insertMany(sampleEvents);
    console.log(`✅ Created ${events.length} events`);

    // Add some participants
    console.log('🤝 Adding participants...');
    await events[0].addParticipant(users[1]._id);
    await events[1].addParticipant(users[0]._id);
    console.log('✅ Added participants');

    console.log('\n🎉 Database setup complete!');
    console.log('\n📊 Sample data created:');
    console.log(`- ${users.length} users`);
    console.log(`- ${events.length} events`);
    console.log('\n🚀 You can now start the server with: npm run dev');
    console.log('\n📖 API Documentation: http://localhost:3333');
    console.log('🔍 MongoDB Compass: Connect to mongodb://localhost:27017/sportsconnect');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run setup if called directly
if (require.main === module) {
  setupDatabase();
}

module.exports = setupDatabase;
