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
    }

});

const Trip = module.exports = mongoose.model('Trip', TripSchema);

module.exports.addTrip = function (newTrip, callback) {
    newTrip.save(callback);
}


module.exports.findTripFromDest = function (trip, res, callback) {
    console.log('in trip.js');
    Trip.find({ "from": trip.from, "to": trip.to },  (err, trips) => {  
        if (err) {
            console.log('err in trip.js, ...');
            res.json({ success: false, msg: 'You have encountered an error' });

        } else {
            // send the list of all people in database with name of "John James" and age of 36
            // Very possible this will be an array with just one Person object in it.
            console.log(' no err in trips.js, ...');
            res.json({ success: true, msg: 'You have found all the corresponding trips', tripsFound: trips });
        }
    });

    
}