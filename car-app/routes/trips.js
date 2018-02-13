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
        maxPassengers: req.body.maxPassengers,
        date: req.body.date,
        driverId: req.body.driverId
    })
    Trip.addTrip(newTrip, (err, trip) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add trip' });
        } else {
            res.json({ success: true, msg: 'Trip added' });
        }
    })
});

router.post('/findtrips', (req, res, next) => {
    let thisTrip = new Trip({
        from: req.body.from,
        to: req.body.to
    })


    console.log('in trips.js');
    Trip.findTripFromDest(thisTrip, res, (err, trip) => { })
});


module.exports = router;