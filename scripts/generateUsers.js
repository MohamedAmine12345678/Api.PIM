// generate_users.js
const mongoose = require('mongoose');
const User = require('../models/User'); 

mongoose.connect('mongodb://localhost:27017/PIM3', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const users = [
  { username: 'john_doe', email: 'john@example.com', password: 'password123' },
  { username: 'jane_doe', email: 'jane@example.com', password: 'password123' },
  { username: 'user1', email: 'user1@example.com', password: 'password123' },
  { username: 'user2', email: 'user2@example.com', password: 'password123' },
  // Add more users if needed
];

async function generateUsers() {
  try {
    await User.insertMany(users);
    console.log('Users generated successfully');
  } catch (error) {
    console.error('Error generating users:', error);
  } finally {
    mongoose.connection.close();
  }
}

generateUsers();
