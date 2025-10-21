// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; // Choose a port for your server

// --- In-Memory Data Store ---
let events = [];
let nextId = 1;

// --- Middleware ---
app.use(cors()); // Allows your React Native app to connect (necessary for development)
app.use(bodyParser.json()); // To parse JSON bodies from the client

// --- API Endpoints ---

// GET /api/events (Fetch all events)
app.get('/api/events', (req, res) => {
    // Mimic network delay for a more realistic feel
    setTimeout(() => {
        res.json(events);
    }, 500);
});

// POST /api/events (Add a new event)
app.post('/api/events', (req, res) => {
    const { title, location, description } = req.body;

    if (!title || !location) {
        return res.status(400).json({ message: 'Title and location are required.' });
    }

    const newEvent = {
        // Use a string representation for compatibility with the client's '_id' interface
        _id: String(nextId++), 
        title,
        location,
        description: description || '',
    };

    events.push(newEvent);
    
    // Mimic a successful database response
    setTimeout(() => {
        res.status(201).json(newEvent);
    }, 300);
});

// PUT /api/events/:id (Update an event)
app.put('/api/events/:id', (req, res) => {
    const id = req.params.id;
    const { title, location, description } = req.body;

    const index = events.findIndex(e => e._id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Event not found.' });
    }
    
    // Update the event fields
    events[index] = {
        ...events[index],
        title,
        location,
        description: description || '',
    };

    // Mimic a successful database response
    setTimeout(() => {
        res.json(events[index]);
    }, 300);
});

// DELETE /api/events/:id (Delete an event)
app.delete('/api/events/:id', (req, res) => {
    const id = req.params.id;
    const initialLength = events.length;

    events = events.filter(e => e._id !== id);

    if (events.length === initialLength) {
        return res.status(404).json({ message: 'Event not found.' });
    }

    // Mimic a successful database response (204 No Content is common for DELETE)
    setTimeout(() => {
        res.status(204).send();
    }, 300);
});


// --- Server Start ---
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`Local events API available at http://localhost:${PORT}/api/events`);
});