var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var multer = require('multer')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');

var index = require('./routes/index');
var posts = require('./routes/posts');
var admin = require('./routes/admin');
var Admin = require('./models/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', '2.png')));

app.use(express.static(path.join(__dirname, 'public')));

//body parser setup
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Passport Setup
app.use(require("express-session")({ secret: "cats", resave:false, saveUninitialized:false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());


// Login route
app.post('/login', urlencodedParser, function(req, res) {
  passport.authenticate('local')(req, res, function () {
    console.log('user authenticated!!')
    res.redirect('/admin');
});
})

app.use('/', urlencodedParser, index);
app.use('/posts', posts);
app.use('/admin',isLoggedIn, admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      next();
  } else {
      res.redirect('/login');
  }
}


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('running on port: '+ port)
})