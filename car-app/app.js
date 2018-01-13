const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect();
mongoose.connection.on('connected', () => {
    console.log('connected to database '+ config.database);
});
const app = express();

const users = require('./routes/users');

//Port Number
const port = 3000;

//cors middleware
app.use(cors());


// set static folder

app.use(express.static(path.join(__dirname, 'public')))

// body parser Middleware
app.use(bodyParser.json());

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// Start server
app.listen(port, () => {
    console.log('Server started on port '+port);
});