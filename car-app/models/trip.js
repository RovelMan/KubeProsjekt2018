const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const TripSchema = mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    maxPassengers: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    driverId: {
        type: String,
        required: true
    },
    passengerIds: {
        type: [String],
        required: false
    }

});

const Trip = module.exports = mongoose.model('Trip', TripSchema);


module.exports.addTrip = function (newTrip, callback) {
    newTrip.save(callback);
}


module.exports.findTripFromDest = function (trip, res, callback) {
    Trip.find({ "from": trip.from, "to": trip.to },  (err, trips) => {  
        if (err) {
            res.json({ success: false, msg: 'You have encountered an error' });
        } else {
            res.json({ success: true, msg: 'You have found all the corresponding trips', tripsFound: trips });
        }
    });    
}

module.exports.findMyTripsAsPassenger = function(passengerId, res, callback) {
    const query = {"passengerIds": passengerId};
    Trip.find(query, (err, trips) => {
        if (err) {
            res.json({ success: false, msg: 'You have encountered an error' });
        } else {
            res.json({ success: true, msg: 'You have found all the corresponding MY trips', tripsFound: trips });
        }
    }); 
}
module.exports.findMyTripsAsDriver = function(passengerId, res, callback) {
    const query = {"driverId": passengerId};
    Trip.find(query, (err, trips) => {
        if (err) {
            res.json({ success: false, msg: 'You have encountered an error' });
        } else {
            res.json({ success: true, msg: 'You have found all the corresponding MY trips', tripsFound: trips });
        }
    }); 
}

module.exports.joinTrip = function(tripAndPassenger, res, callback) {
    
    Trip.findById(tripAndPassenger.tripId, (err, trip) => {
        if (err) {
            res.json({ success: false, msg: 'You have encountered an error' });
        } else {
            trip.passengerIds.push(tripAndPassenger.passengerId);
            trip.save((err, trip) => {
                if (err) {
                    res.json({ success: false, msg: 'You have encountered an error' });
                } else {
                    res.json({success: true, msg: 'You have updated and saved the trip'});
                }
            });
            
        }
    }); 
}