const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Message = require('../models/message');
const passport = require('passport');
const jwt = require('jsonwebtoken');




//Add message
router.post('/addmessage', (req, res, next) => {
    let newMessage = new Message({

        senderId: req.body.senderId,
        receiverId: req.body.receiverId,
        date: req.body.date,
        messageText: req.body.messageText
        
        
    })
    Message.addMessage(newMessage, (err, message) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add message' });
        } else {
            res.json({ success: true, msg: 'Trip added' });
        }
    })
});

router.post('/findmessagesreceived', (req, res, next) => {
    let id = new String(req.body.id);
    Message.findMessagesReceived(id, res, (err, message) => { })
});

module.exports = router;