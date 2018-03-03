var db = require('../models')

exports.getPosts = function(req, res, next) {
    db.Post.find()
      .then(function(posts) {
        posts = posts.reverse();
        res.render('index', { title: 'Home', posts: posts });
      })
      .catch(function(err) {
          res.send(err);
      })
  }

exports.getAbout = function(req, res, next) {
    res.render('about', { title: 'about' });
  }

exports.getContact = function(req, res, next) {
    res.render('contact', { title: 'contact' });
  }

module.exports = exports