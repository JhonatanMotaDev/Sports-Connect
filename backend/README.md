# Sports Connect Backend API

A comprehensive backend API for the Sports Connect application built with Express.js and MongoDB.

## Features

- **User Management**: Complete user profiles with interests, skill levels, and location
- **Event Management**: Create, join, and manage sports events
- **Geospatial Queries**: Find events and users near your location
- **Review System**: Rate and review other users
- **Security**: Rate limiting, CORS, and input validation
- **Real-time Updates**: WebSocket support for live updates

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **Express Rate Limit** - Rate limiting
- **Express Validator** - Input validation

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/sportsconnect
PORT=3333
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
CORS_ORIGIN=http://localhost:8081
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Database Setup

### MongoDB Compass Setup

1. **Install MongoDB Compass** from [mongodb.com](https://www.mongodb.com/products/compass)

2. **Connect to MongoDB**:
   - Open MongoDB Compass
   - Use connection string: `mongodb://localhost:27017`
   - Create a new database called `sportsconnect`

3. **Verify Collections**:
   - The API will automatically create the following collections:
     - `users` - User profiles and information
     - `events` - Sports events and activities
     - `reviews` - User reviews and ratings

### Database Schema

#### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  phone: String,
  profileImage: String,
  bio: String,
  interests: [String],
  skillLevel: String,
  location: {
    type: "Point",
    coordinates: [Number, Number], // [lng, lat]
    address: String,
    city: String,
    state: String,
    country: String
  },
  isActive: Boolean,
  preferences: Object
}
```

#### Events Collection
```javascript
{
  title: String,
  description: String,
  sport: String,
  skillLevel: String,
  date: Date,
  duration: Number,
  maxParticipants: Number,
  currentParticipants: Number,
  location: {
    type: "Point",
    coordinates: [Number, Number],
    address: String,
    city: String,
    state: String,
    country: String,
    venue: String
  },
  organizer: ObjectId,
  participants: [Object],
  requirements: Object,
  cost: Object,
  status: String,
  tags: [String],
  images: [String]
}
```

## API Endpoints

### Base URL
```
http://localhost:3333
```

### Authentication
*Note: Authentication endpoints will be added in future updates*

### Users

#### Get All Users
```
GET /api/users
Query Parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 10)
- search: Search term
- interests: Comma-separated interests
- skillLevel: Skill level filter
- city: City filter
- lat, lng: Location coordinates
- radius: Search radius in km (default: 10)
```

#### Get User by ID
```
GET /api/users/:id
```

#### Create User
```
POST /api/users
Body: User object
```

#### Update User
```
PUT /api/users/:id
Body: Updated user object
```

#### Delete User
```
DELETE /api/users/:id
```

#### Get User Events
```
GET /api/users/:id/events
Query Parameters:
- page: Page number
- limit: Items per page
- type: 'all', 'organized', 'participating'
```

#### Get User Statistics
```
GET /api/users/:id/stats
```

#### Update User Location
```
POST /api/users/:id/location
Body: { coordinates: [lng, lat], address, city, state, country }
```

### Events

#### Get All Events
```
GET /api/events
Query Parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 10)
- sport: Sport filter
- skillLevel: Skill level filter
- city: City filter
- dateFrom, dateTo: Date range
- search: Search term
- lat, lng: Location coordinates
- radius: Search radius in km (default: 10)
```

#### Get Event by ID
```
GET /api/events/:id
```

#### Create Event
```
POST /api/events
Body: Event object
```

#### Update Event
```
PUT /api/events/:id
Body: Updated event object
```

#### Delete Event
```
DELETE /api/events/:id
```

#### Join Event
```
POST /api/events/:id/join
Body: { userId: "user_id" }
```

#### Leave Event
```
DELETE /api/events/:id/leave
Body: { userId: "user_id" }
```

#### Get User Events
```
GET /api/events/user/:userId
Query Parameters:
- page: Page number
- limit: Items per page
- type: 'all', 'organized', 'participating'
```

## Response Format

All API responses follow this format:

```javascript
{
  "success": boolean,
  "data": any,
  "message": string,
  "timestamp": string,
  "meta": object // For pagination, etc.
}
```

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input data
- **404 Not Found**: Resource not found
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server errors

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Prevents abuse
- **Input Validation**: Data sanitization
- **MongoDB Injection Protection**: Mongoose ODM

## Development

### Scripts

```bash
# Start development server with nodemon
npm run dev

# Start production server
npm start
```

### Environment Variables

Create a `.env` file with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/sportsconnect
PORT=3333
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
CORS_ORIGIN=http://localhost:8081
```

## Testing

Test the API using tools like Postman or curl:

```bash
# Test server health
curl http://localhost:3333

# Get all events
curl http://localhost:3333/api/events

# Get all users
curl http://localhost:3333/api/users
```

## MongoDB Compass Integration

1. **Connect to Database**: Use the connection string from your `.env` file
2. **View Collections**: Browse users, events, and reviews collections
3. **Query Data**: Use the built-in query interface
4. **Index Management**: View and create indexes for better performance
5. **Performance Monitoring**: Monitor query performance and execution plans

## Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Configure proper CORS origins
4. Set up SSL/TLS certificates
5. Use environment variables for sensitive data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
