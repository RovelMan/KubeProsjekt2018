const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const MessageSchema = mongoose.Schema({
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    messageText: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: false
    }
});

const Message = module.exports = mongoose.model('Message', TripSchema);
