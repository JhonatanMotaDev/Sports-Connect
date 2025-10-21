const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Event = require('../models/Event');

// GET /api/users - Get all users with filtering
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      interests,
      skillLevel,
      city,
      lat,
      lng,
      radius = 10
    } = req.query;

    // Build filter object
    const filter = { isActive: true };

    if (search) {
      filter.$text = { $search: search };
    }

    if (interests) {
      filter.interests = { $in: interests.split(',') };
    }

    if (skillLevel) {
      filter.skillLevel = skillLevel;
    }

    if (city) {
      filter['location.city'] = new RegExp(city, 'i');
    }

    // Execute query
    let query = User.find(filter);

    // Geospatial filtering
    if (lat && lng) {
      query = query.where('location.coordinates').near({
        center: {
          type: 'Point',
          coordinates: [parseFloat(lng), parseFloat(lat)]
        },
        maxDistance: radius * 1000, // Convert km to meters
        spherical: true
      });
    }

    const users = await query
      .select('-email -phone -preferences')
      .sort({ name: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      data: users,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

// GET /api/users/:id - Get single user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-preferences')
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user's events
    const events = await Event.find({
      $or: [
        { organizer: req.params.id },
        { 'participants.user': req.params.id }
      ]
    })
    .select('title sport date location status')
    .sort({ date: -1 })
    .limit(5)
    .lean();

    res.json({
      success: true,
      data: {
        ...user,
        recentEvents: events
      }
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
});

// POST /api/users - Create new user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    const userResponse = user.getPublicProfile();

    res.status(201).json({
      success: true,
      data: userResponse,
      message: 'User created successfully'
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
});

// PUT /api/users/:id - Update user
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const userResponse = user.getPublicProfile();

    res.json({
      success: true,
      data: userResponse,
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
});

// DELETE /api/users/:id - Delete user (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User deactivated successfully'
    });
  } catch (error) {
    console.error('Error deactivating user:', error);
    res.status(500).json({
      success: false,
      message: 'Error deactivating user',
      error: error.message
    });
  }
});

// GET /api/users/:id/events - Get user's events
router.get('/:id/events', async (req, res) => {
  try {
    const { page = 1, limit = 10, type = 'all' } = req.query;
    const { id } = req.params;

    let filter = {};
    
    if (type === 'organized') {
      filter = { organizer: id };
    } else if (type === 'participating') {
      filter = { 'participants.user': id };
    } else {
      filter = {
        $or: [
          { organizer: id },
          { 'participants.user': id }
        ]
      };
    }

    const events = await Event.find(filter)
      .populate('organizer', 'name profileImage')
      .populate('participants.user', 'name profileImage')
      .sort({ date: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Event.countDocuments(filter);

    res.json({
      success: true,
      data: events,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching user events:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user events',
      error: error.message
    });
  }
});

// GET /api/users/:id/stats - Get user statistics
router.get('/:id/stats', async (req, res) => {
  try {
    const { id } = req.params;

    const [organizedEvents, participatingEvents, totalEvents] = await Promise.all([
      Event.countDocuments({ organizer: id }),
      Event.countDocuments({ 'participants.user': id }),
      Event.countDocuments({
        $or: [
          { organizer: id },
          { 'participants.user': id }
        ]
      })
    ]);

    const upcomingEvents = await Event.countDocuments({
      $or: [
        { organizer: id },
        { 'participants.user': id }
      ],
      date: { $gte: new Date() }
    });

    res.json({
      success: true,
      data: {
        organizedEvents,
        participatingEvents,
        totalEvents,
        upcomingEvents
      }
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user statistics',
      error: error.message
    });
  }
});

// POST /api/users/:id/location - Update user location
router.post('/:id/location', async (req, res) => {
  try {
    const { coordinates, address, city, state, country } = req.body;

    if (!coordinates || !Array.isArray(coordinates) || coordinates.length !== 2) {
      return res.status(400).json({
        success: false,
        message: 'Valid coordinates are required'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        location: {
          type: 'Point',
          coordinates: [coordinates[0], coordinates[1]], // [lng, lat]
          address,
          city,
          state,
          country
        }
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user.location,
      message: 'Location updated successfully'
    });
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating location',
      error: error.message
    });
  }
});

module.exports = router;
