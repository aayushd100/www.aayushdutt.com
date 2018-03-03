var mongoose = require('mongoose');

//by me
const keys = require('../config/keys');
mongoose.connect(keys.database);


mongoose.Promise = Promise;

module.exports.Post = require("./post");
