const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const NotificationSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    userIds: {
        type: [String],
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
    },
    seen: {
        type: Boolean,
        required: true
    }

    
});

const Notification = module.exports = mongoose.model('Notification', NotificationSchema);

module.exports.addNotification = function (newNotification, callback) {
    newNotification.save(callback);
}
module.exports.findMyNotifications = function(userId, res, callback) {
    const query = {"userIds": userId };
    Notification.find(query, (err, notifications) => {
        if (err) {
            res.json({ success: false, msg: 'You have encountered an error' });
        } else {
            res.json({ success: true, msg: 'You have found all your notifications', notificationsFound: notifications });
        }
    }); 
}