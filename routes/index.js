var express = require('express');
var router = express.Router();
var helpers = require('../helpers/index')

/* GET home page. */
router.get('/', helpers.getPosts)
  

router.get('/about', helpers.getAbout );

router.get('/contact', helpers.getContact);

module.exports = router;
