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


exports.getPosts = function(req, res, next){ 
    // this is the posts page, it will prevail when index.jade needs to be changed
    db.Post.find()
      .then(function(posts) {
        posts = posts.reverse();
        res.render('index', { title: 'Home', posts: posts });
      })
      .catch(function(err) {
          res.send(err);
      })
  }

exports.getPost = function(req, res, next) {
    db.Post.findOne({ tag: req.params.tag })
    .then(function(post) {
      if(!post.post_image) { post.post_image = "post-bg.jpg"}   
      res.render('post', { title: 'Home', post: post });
    })
    .catch(function(err) {
        res.send(err);
    })
  }

exports.getUpdatePosts = function(req, res, next){
  db.Post.find()
  .then(function(posts) {
    posts = posts.reverse();
    res.render('updateposts', { title: 'Home', posts: posts });
  })
  .catch(function(err) {
      res.send(err);
  })
}

exports.getUpdatePost = function(req, res, next){
  db.Post.findOne({ tag: req.params.tag })
    .then(function(post) {
      console.log(post.body)
      res.render('updatepost', { title: 'Home', post: post });
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
    }  else if (data.password == keys.blogPassword) {
      db.Post.findOneAndUpdate({tag: req.params.tag}, req.body, { new: true })
      .then(function(newPost) {
        console.log(newPost)
          res.redirect('/posts/'+data.tag)
      })
      .catch(function(err) {
          res.send(err);
      })
    }
      else{
        res.redirect('/posts/add',{message: "Not Authorized"})
    }
  });  
  

}

exports.getAddPost = function(req, res, next){ 
    res.render('addpost')
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
    }  else if (data.password == 'a') {
      db.Post.create(data)
      .then(function(newPost) {
          res.redirect('/posts/'+newPost.tag)
      })
      .catch(function(err) {
          res.send(err);
      })
    }
      else{
        res.redirect('/posts/add',{message: "Not Authorized"})
    }
  });  
} 

module.exports = exports


