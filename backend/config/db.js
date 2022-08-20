const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mern-upload');
    console.log('Connected to the Database');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDatabase;
