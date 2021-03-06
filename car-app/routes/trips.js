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
        driverId: req.body.driverId,
        passengersId: []
    })
    Trip.addTrip(newTrip, res, (err, trip) => { })
});

router.post('/findtrips', (req, res, next) => {
    let thisTrip = new Trip({
        from: req.body.from,
        to: req.body.to
    })
    Trip.findTripFromDest(thisTrip, res, (err, trip) => { })
});

router.post('/findmytripsaspassenger', (req, res, next) => {
    let passengerId = new String(req.body.passengerId);
    Trip.findMyTripsAsPassenger(passengerId, res, (err, trip) => { })
});

router.post('/findmytripsasdriver', (req, res, next) => {
    let passengerId = new String(req.body.passengerId);
    Trip.findMyTripsAsDriver(passengerId, res, (err, trip) => { })
});

router.post('/findtripbyid', (req, res, next) => {
    let tripId = new String(req.body.tripId);
    Trip.findMyTripById(tripId, res, (err, trip) => { })
});

router.post('/jointrip', (req, res, next) => {
    let tripAndPassenger = {
        passengerId: req.body.passengerId,
        tripId: req.body.tripId
    }
    Trip.joinTrip(tripAndPassenger, res, (err, trip) => { })
});

router.post('/deletetrip', (req, res, next) => {
    let deleteTrip = {
        tripId: req.body.tripId
    }
    Trip.deleteTrip(deleteTrip, res, (err) = { })
});









module.exports = router;