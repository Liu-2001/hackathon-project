var express = require('express');
var router = express.Router();
require('dotenv').config({path: __dirname + '/../.env'});

const { Pool } = require('pg')
const pool = new Pool({connectionString:process.env.DATABASE_URL})

const select_query = 'SELECT * FROM customers ORDER BY calculateScore(age, career, diabetes, cancer, heartDisease, pregnancy) DESC, createdDate, createdTime';

/* GET home page. */
router.get('/', function(req, res, next) {
  pool.query(select_query, (err, data) => {
    res.render('admin', { title: 'Admin', data: data.rows });
  })
});

module.exports = router;
