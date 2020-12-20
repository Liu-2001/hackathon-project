var express = require('express');
var router = express.Router();
require('dotenv').config({path: __dirname + '/../.env'});

const { Pool } = require('pg')
const pool = new Pool({connectionString:process.env.DATABASE_URL})

var username;
var nric;
var age;
var career;
var createdDate;
var createdTime;
var hasDiabetes;
var hasCancer;
var hasHeartDisease;
var hasPregnancy;
var hasErr;
var emptyErr;
var nricErr;
var ageErr;

var key_check_query = 'SELECT 1 FROM customers WHERE nric=$1';
var insert_query = 'INSERT INTO customers VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';

var getStringDate = (date) => date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
var getStringTime = (time) => time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
var initialize = () => {
  username = null;
  nric = null;
  age = null;
  career = 'others';
  var currentTime = new Date();
  createdDate = getStringDate(currentTime);
  createdTime = getStringTime(currentTime);
  hasDiabetes = true;
  hasCancer = true;
  hasHeartDisease = true;
  hasPregnancy = true;
  hasErr = false;
  emptyErr = false;
  nricErr = false;
  ageErr = false;
}

var renderPage = (res) => {
  res.render('signup', {
    title: 'Customer signup',
    username: username,
    nric: nric,
    age: age,
    career: career,
    hasDiabetes: hasDiabetes,
    hasCancer: hasCancer,
    hasHeartDisease: hasHeartDisease,
    hasPregnancy: hasPregnancy,
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
    hasErr = true;
  }

  age = req.body.age;
  if (age === null || age === undefined) {
    emptyErr = true;
    hasErr = true;
  } else if (age < 0) {
    ageErr = true;
    hasErr = true;
  }

  career = req.body.career;

  hasDiabetes = req.body.diabetes;
  if (hasDiabetes === null || hasDiabetes === undefined) {
    emptyErr = true;
    hasErr = true;
  }

  hasCancer = req.body.cancer;
  if (hasCancer === null || hasCancer === undefined) {
    emptyErr = true;
    hasErr = true;
  }

  hasHeartDisease = req.body.heart_disease;
  if (hasHeartDisease === null || hasHeartDisease === undefined) {
    emptyErr = true;
    hasErr = true;
  }

  hasPregnancy = req.body.pregnancy;
  if (hasPregnancy === null || hasPregnancy === undefined) {
    emptyErr = true;
    hasErr = true;
  }

  pool.query(key_check_query, [nric], (err, data) => {
    console.log(err);
    if (data.rows.length <= 0) {
      nricErr = true;
    }
    if (hasErr) {
      console.log("has err!!");
      renderPage(res);
    } else {
      var currentDate = new Date();
      pool.query(insert_query, [username, nric, age, career, getStringDate(currentDate), getStringTime(currentDate), hasDiabetes, hasCancer, hasHeartDisease, hasPregnancy], (err, data) => {
        console.log(err);
        res.redirect('/information/' + nric);
      })
    }
  })
})

module.exports = router;
