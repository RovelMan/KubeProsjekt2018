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
    }

});

const Trip = module.exports = mongoose.model('Trip', TripSchema);

module.exports.addTrip = function (newTrip, callback) {
    newTrip.save(callback);
}