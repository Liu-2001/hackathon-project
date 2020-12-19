var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //var userid = req.params.userid;
  res.render('login', { title: 'login' });
});

router.post('/', function(req, res, next) {
  var nric = req.body.nric;
  res.redirect('/information');
})

module.exports = router;
