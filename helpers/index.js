var db = require('../models')
var bodyParser = require('body-parser')
var passport = require('passport');

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

exports.getLogin = function(req, res, next) {
  res.render('login', { title: 'Login' });
}

exports.logout= function(req, res, next){
  req.logout();
  console.log('logged out');
  res.redirect('/');
}

exports.getAbout = function(req, res, next) {
    res.render('about', { title: 'about' });
  }

exports.getContact = function(req, res, next) {
    res.render('contact', { title: 'contact' });
  }

exports.getRegister = function(req, res, next) {
  res.render('register', { title: 'Register' });
}

exports.register = function(req, res, next) {
  console.log(req.body);
  db.Admin.register(new db.Admin({ username : req.body.username}), req.body.password, function(err, user) {
    if (err) {
      console.log(err)
      return res.render('register', { user : user });
    }

    passport.authenticate('local')(req, res, function () {
      console.log('registered!')
      res.redirect('/admin');
    });
  });
}




module.exports = exports