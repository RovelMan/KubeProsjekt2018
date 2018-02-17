const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const NotificationSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    data: {
        type: {
            
        },
        required: true
    }

    
});

const Notification = module.exports = mongoose.model('Notification', NotificationSchema);

module.exports.addNotification = function (newNotification, callback) {
    newNotification.save(callback);
}