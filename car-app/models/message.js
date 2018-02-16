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
        required: true
    }
});

const Message = module.exports = mongoose.model('Message', MessageSchema);

module.exports.addMessage = function (newMessage, callback) {
    newMessage.save(callback);
}

module.exports.findMessagesReceived = function(id, res, callback) {
    const query = {"receiverId": id};
    Message.find(query, (err, messages) => {
        if (err) {
            res.json({ success: false, msg: 'You have encountered an error' });
        } else {
            res.json({ success: true, msg: 'You have found all the corresponding received messages', messagesFound: messages });
        }
    }); 
}