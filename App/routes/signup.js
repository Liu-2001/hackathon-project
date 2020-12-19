var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Customer signup', username: 'unknown' });
});

router.post('/', function(req, res, next) {
  var username = req.body.username;
  //res.render('signup', { title: 'Customer signup', username: username });
  res.redirect('/customer');
})

module.exports = router;
