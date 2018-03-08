//models directory
var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    category: {
        type: String
    },
    author: {
        type: String,
        default: 'Aayush Dutt'
    },
    date: {
        type: Date,
        default: Date.now
    },
    body: {
        type: String
    },
    body_markdown: {
        type: String
    },
    meta_body:{
        type: String
    },
    tag: String,
    subheading: String,
    post_image: String

})

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
