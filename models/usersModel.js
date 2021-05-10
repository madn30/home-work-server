const mongoose = require('mongoose');

let UserScema = new mongoose.Schema({
    Email: String,
    Password: String,
    FirstName: String,
    LastName: String,
    Address: {
        City: String,
        Country: String,
        PostalCode: String
    }

});

module.exports = mongoose.model('users', UserScema);
