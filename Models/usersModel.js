const mongoose = require('mongoose');

let UsersSchema = new mongoose.Schema({
    username: String,
    password: String
});

module.exports = mongoose.model('users', UsersSchema);
