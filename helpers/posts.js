var db = require('../models');

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