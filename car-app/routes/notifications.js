const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')

//add notification (made trip)
router.post('/addNotification', (req, res, next) => {
    let newNotification = new Notification({

        type: req.body.type,
        userId: req.body.userId,
        date: req.body.date,
        data: req.body.data
    })
    Notification.addNotification(newNotification, (err, notification) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add notification' });
        } else {
            res.json({ success: true, msg: 'Notification added' });
        }
    })
});






module.exports = router;