const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sport,
      skillLevel,
      city,
      dateFrom,
      dateTo,
      search,
      lat,
      lng,
      radius = 10
    } = req.query;

    const filter = { status: 'published' };

    if (sport) filter.sport = sport;
    if (skillLevel) filter.skillLevel = skillLevel;
    if (city) filter['location.city'] = new RegExp(city, 'i');

    if (dateFrom || dateTo) {
      filter.date = {};
      if (dateFrom) filter.date.$gte = new Date(dateFrom);
      if (dateTo) filter.date.$lte = new Date(dateTo);
    }

    if (search) {
      filter.$text = { $search: search };
    }

    let query = Event.find(filter);

    if (lat && lng) {
      query = query.where('location.coordinates').near({
        center: {
          type: 'Point',
          coordinates: [parseFloat(lng), parseFloat(lat)]
        },
        maxDistance: radius * 1000,
        spherical: true
      });
    }

    const events = await query
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
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching events',
      error: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email profileImage bio')
      .populate('participants.user', 'name profileImage')
      .lean();

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching event',
      error: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      organizer: req.body.organizer || '507f1f77bcf86cd799439011'
    };

    const event = new Event(eventData);
    await event.save();

    const populatedEvent = await Event.findById(event._id)
      .populate('organizer', 'name profileImage')
      .lean();

    res.status(201).json({
      success: true,
      data: populatedEvent,
      message: 'Event created successfully'
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating event',
      error: error.message
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('organizer', 'name profileImage');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      data: event,
      message: 'Event updated successfully'
    });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating event',
      error: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting event',
      error: error.message
    });
  }
});

router.post('/:id/join', async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    await event.addParticipant(userId);
    
    const updatedEvent = await Event.findById(req.params.id)
      .populate('organizer', 'name profileImage')
      .populate('participants.user', 'name profileImage');

    res.json({
      success: true,
      data: updatedEvent,
      message: 'Successfully joined the event'
    });
  } catch (error) {
    console.error('Error joining event:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

router.delete('/:id/leave', async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    await event.removeParticipant(userId);
    
    const updatedEvent = await Event.findById(req.params.id)
      .populate('organizer', 'name profileImage')
      .populate('participants.user', 'name profileImage');

    res.json({
      success: true,
      data: updatedEvent,
      message: 'Successfully left the event'
    });
  } catch (error) {
    console.error('Error leaving event:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const { page = 1, limit = 10, type = 'all' } = req.query;
    const { userId } = req.params;

    let filter = {};
    
    if (type === 'organized') {
      filter = { organizer: userId };
    } else if (type === 'participating') {
      filter = { 'participants.user': userId };
    } else {
      filter = {
        $or: [
          { organizer: userId },
          { 'participants.user': userId }
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

module.exports = router;
