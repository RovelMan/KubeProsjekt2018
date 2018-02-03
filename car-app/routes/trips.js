const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Trip = require('../models/trip');
const passport = require('passport');
const jwt = require('jsonwebtoken');
//Add trip
router.post('/addtrip', (req, res, next) => {
    let newTrip = new Trip({
        
        from: req.body.from,
        to: req.body.to,
    })
    Trip.addTrip(newTrip, (err, trip) => {
        if(err) {
            res.json({success: false, msg: 'Failed to add trip'});
        } else {
            res.json({success: true, msg:'Trip added'});
        }
    })
});


module.exports = router;