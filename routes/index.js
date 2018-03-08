var express = require('express');
var router = express.Router();
var helpers = require('../helpers/index')

/* GET home page. */
router.get('/', helpers.getPosts);

router.route('/login')
    .get(helpers.getLogin)

router.get('/logout', helpers.logout)

router.get('/about', helpers.getAbout );

router.get('/contact', helpers.getContact);

router.route('/register')
  .get(helpers.getRegister)
  .post(helpers.register)

module.exports = router;
