var mongoose = require('mongoose');

//by me
//const keys = require('../config/keys');
mongoose.connect("mongodb://public:qwerty123@ds163745.mlab.com:63745/aadb");


mongoose.Promise = Promise;

module.exports.Post = require("./post");
