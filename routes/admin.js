var express = require('express');
var router = express.Router();
var helpers = require('../helpers/admin');

router.route('/')
  .get(helpers.getAdmin)

router.route('/add')
  .get(helpers.getAddPost)
  .post(helpers.addPost)

router.route('/update/:tag')
  .get(helpers.getUpdatePost)
  .post(helpers.updatePost)

// router.route('/:tag')
//   .get(helpers.getPost)
// .delete(helpers.deletePost)





module.exports = router;
