var express = require('express');
var router = express.Router();
require('dotenv').config({path: __dirname + '/../.env'});

const { Pool } = require('pg')
const pool = new Pool({connectionString:process.env.DATABASE_URL})

var username;
var nric;
var age;
var career;
var hasDiabetes;
var hasErr;
var emptyErr;
var nricErr;
var ageErr;

var key_check_query = 'SELECT 1 FROM customers WHERE nric=\'$1\'';
var insert_query = 'INSERT INTO customers VALUES (\'$1\', \'$2\', $3, \'$4\', $5)';

var initialize = () => {
  username = null;
  nric = null;
  age = null;
  career = 'others';
  hasDiabetes = true;
  hasErr = false;
  emptyErr = false;
  nricErr = '';
  ageErr = '';
}

var renderPage = (res) => {
  res.render('signup', {
    title: 'Customer signup',
    username: username,
    nric: nric,
    age: age,
    career: career,
    hasDiabetes: hasDiabetes,
    emptyErr: emptyErr,
    nricErr: nricErr,
    ageErr: ageErr
  })
}

/* GET home page. */
router.get('/', function(req, res, next) {
  initialize();
  renderPage(res);
});

router.post('/', function(req, res, next) {
  initialize();

  username = req.body.username.trim();
  if (username === "" || username === null || username === undefined) {
    emptyErr = true;
    hasErr = true;
  }

  nric = req.body.nric.trim();
  if (nric === "" || nric === null || nric === undefined) {
    emptyErr = true;
  }

  age = req.body.age;
  if (age === null || age === undefined) {
    emptyErr = true;
  } else if (age < 0) {
    ageErr = 'Age must be positive integer';
  }

  career = req.body.career;

  hasDiabetes = req.body.diabetes;
  if (hasDiabetes === null || hasDiabetes === undefined) {
    emptyErr = true;
  }

  pool.query(key_check_query, [nric], (err, data) => {
    if (data.rows.length <= 0) {
      nricErr = 'This NRIC/FIN has already registered';
    }
    if (hasErr) {
      renderPage(res);
    } else {
      pool.query(insert_query, [username, nric, age, career, hasDiabetes], (err, data) => {
        res.redirect('/information/' + nric);
      })
    }
  })
})

module.exports = router;
