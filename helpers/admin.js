var db = require('../models');
var marked = require('marked');
var multer = require('multer');
var keys = require('./../config/keys')

//multer config
  // Set The Storage Engine
  const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,req.body.tag + '-' + file.originalname);
    }
  });

  // Init Upload
  const upload = multer({
    storage: storage
  }).array('images');
//end multer config
var db = require('../models');


exports.getAdmin = function(req, res, next){
    db.Post.find()
    .then(function(posts) {
      posts = posts.reverse();
      res.render('admin', { title: 'Admin', posts: posts, authenticated: true });
    })
    .catch(function(err) {
        res.send(err);
    })
  }


exports.getLogin = function(req, res, next){
  res.render('login', {authenticated: true})
}

exports.getUpdatePosts = function(req, res, next){
  db.Post.find()
  .then(function(posts) {
    posts = posts.reverse();
    res.render('updateposts', { title: 'Home', posts: posts, authenticated: true });
  })
  .catch(function(err) {
      res.send(err);
  })
}

exports.getUpdatePost = function(req, res, next){
  db.Post.findOne({ tag: req.params.tag })
    .then(function(post) {
      res.render('updatepost', { title: 'Home', post: post, authenticated: true });
    })
    .catch(function(err) {
        res.send(err);
    })
}

exports.updatePost = function(req, res, next){
  upload(req, res, (err) => {
    var data = req.body
    console.log(data)
    console.log(req.files)
    data.body_markdown = data.body;
    data.body = marked(data.body);
    


    if(err){
      res.render('index', {
        msg: err
      });
    }  else {
      db.Post.findOneAndUpdate({tag: req.params.tag}, req.body, { new: true })
      .then(function(newPost) {
        console.log(newPost)
          res.redirect('/posts/'+data.tag)
      })
      .catch(function(err) {
          res.send(err);
      })
    }
  });  
  

}

exports.getAddPost = function(req, res, next){ 
    res.render('addpost', {authenticated: true})
  }

exports.addPost = function(req, res, next){

  upload(req, res, (err) => {
    var data = req.body
    data.body_markdown = data.body;
    data.body = marked(data.body);
    


    if(err){
      res.render('index', {
        msg: err
      });
    }  else {
      db.Post.create(data)
      .then(function(newPost) {
          res.redirect('/posts/'+newPost.tag)
      })
      .catch(function(err) {
          res.send(err);
      })
    }
      
  });  
} 

module.exports = exports


