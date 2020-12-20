var express = require('express');
var router = express.Router();
require('dotenv').config({path: __dirname + '/../.env'});

const { Pool } = require('pg')
const pool = new Pool({connectionString:process.env.DATABASE_URL})

var nricErr;

var select_query = 'SELECT * FROM customers WHERE nric=$1';

var initialize = () => {
  nricErr = false;
}
var renderPage = (res) => {
  res.render('login', {
    title: 'login',
    nricErr: nricErr
  })
}

/* GET home page. */
router.get('/', function(req, res, next) {
  //var userid = req.params.userid;
  renderPage(res);
});

router.post('/', function(req, res, next) {
  var nric = req.body.nric;
  pool.query(select_query, [nric], (err, data) => {
    if (data.rows.length <= 0) {
      nricErr = true;
      renderPage(res);
    } else {
      res.redirect('/information/' + nric);
    }
  })
})

module.exports = router;
