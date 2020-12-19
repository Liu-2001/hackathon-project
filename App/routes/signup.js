var express = require('express');
var router = express.Router();
require('dotenv').config({path: __dirname + '/../.env'});

const { Pool } = require('pg')
const pool = new Pool({connectionString:process.env.DATABASE_URL})

/* GET home page. */
router.get('/', function(req, res, next) {
  pool.query('SELECT * FROM dummy', (err, data) => {
    console.log(err);
    res.render('signup', {
      title: 'Customer signup',
      username: 'unknown',
      test: data.rows[0].name
    });
  })
});

router.post('/', function(req, res, next) {
  var username = req.body.username;
  //res.render('signup', { title: 'Customer signup', username: username });
  res.redirect('/customer');
})

module.exports = router;
