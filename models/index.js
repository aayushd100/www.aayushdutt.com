var mongoose = require('mongoose');

//by me
const keys = require('../config/keys');
mongoose.connect(keys.blog_database);


mongoose.Promise = Promise;

exports.Post = require("./post");
exports.Admin = require("./admin");

module.exports = exports
