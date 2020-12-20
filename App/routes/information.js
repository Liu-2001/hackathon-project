var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('information', { title: 'Information' });
});

router.post('/', function(req, res, next) {
  res.redirect('/');
})

module.exports = router;
