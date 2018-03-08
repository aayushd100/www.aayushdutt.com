var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Admin = new Schema({
    username: String,
    password: String
});

Admin.plugin(passportLocalMongoose);

module.exports = mongoose.model('Admin', Admin);
