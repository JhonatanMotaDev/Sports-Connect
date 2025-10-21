# 🚀 Sports Connect - Complete Setup Guide

## 🎯 **One Command to Run Everything**

### **Method 1: Simple Start (Recommended)**
```bash
npm start
```

### **Method 2: Complete Setup**
```bash
setup-and-run.bat
```

### **Method 3: Manual Start**
```bash
start-everything.bat
```

## ✅ **What This Does Automatically**

1. **Starts MongoDB Backend** (Port 3333)
2. **Starts Expo Frontend** (Port 8081) 
3. **Connects to MongoDB** (Port 27017)
4. **Opens Browser** to your app
5. **Shows QR Code** for mobile testing

## 📱 **For Expo Go Mobile Testing**

1. **Install Expo Go** app on your phone
2. **Run the command**: `npm start`
3. **Scan the QR code** from the terminal
4. **Your app opens** on your phone!

## 🌐 **For Web Testing**

1. **Run the command**: `npm start`
2. **Browser opens** automatically to http://localhost:8081
3. **Navigate to "Eventos" tab** to see events
4. **Create new events** using the form

## 🗄️ **MongoDB Compass Setup**

1. **Open MongoDB Compass**
2. **Connect to**: `mongodb://localhost:27017`
3. **Select database**: `sportsconnect`
4. **View collections**: `users`, `events`, `reviews`

## 📊 **API Testing**

- **Backend Health**: http://localhost:3333
- **Events API**: http://localhost:3333/api/events
- **Users API**: http://localhost:3333/api/users

## 🛠️ **Troubleshooting**

### **Port Already in Use**
```bash
npm run stop
npm start
```

### **MongoDB Not Running**
- Make sure MongoDB is installed and running
- Check MongoDB Compass connection

### **Frontend Not Loading**
- Wait a few more seconds for Expo to start
- Check if port 8081 is available

## 🎉 **You're Ready!**

Your complete Sports Connect application includes:
- ✅ **Backend API** with MongoDB
- ✅ **React Native Frontend**
- ✅ **Real-time data integration**
- ✅ **Full CRUD operations**
- ✅ **Mobile and Web support**

## 📋 **What You Can Do**

1. **View Events** - See all events from your database
2. **Create Events** - Add new sports events
3. **Edit Events** - Update existing events
4. **Delete Events** - Remove events
5. **Mobile Testing** - Use Expo Go app
6. **Database Management** - View in MongoDB Compass

**Just run `npm start` and everything works! 🚀**
