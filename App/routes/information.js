var express = require('express');
var router = express.Router();
require('dotenv').config({path: __dirname + '/../.env'});

const { Pool } = require('pg')
const pool = new Pool({connectionString:process.env.DATABASE_URL})

var username;
var nric;
var age;
var career;
var diabetes;
var cancer;
var heartDisease;
var pregnancy;

var select_query = 'SELECT * FROM customers WHERE nric=$1';
var delete_query = 'DELETE FROM customers WHERE nric=$1';

var renderPage = (res) => {
  res.render('information', {
    title: 'Information',
    username: username,
    nric: nric,
    age: age,
    career: career,
    diabetes: diabetes,
    cancer: cancer,
    heartDisease: heartDisease,
    pregnancy: pregnancy
  })
}

/* GET home page. */
router.get('/:nric', function(req, res, next) {
  nric = req.params.nric;
  pool.query(select_query, [nric], (err, data) => {
    var customer = data.rows[0];
    username = customer.name;
    age = customer.age;
    career = customer.career;
    diabetes = customer.diabetes;
    cancer = customer.cancer;
    heartDisease = customer.heartDisease;
    pregnancy = customer.pregnancy;
    renderPage(res);
  })
});

router.post('/:nric/delete', function(req, res, next) {
  nric = req.params.nric;
  console.log("here");
  pool.query(delete_query, [nric], (err, data) => {
    console.log(err);
    res.redirect('../../');
  })
})

module.exports = router;
