var express = require('express');
var router = express.Router();
var dbcon = require('../dbcon.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tracker', function(req, res) {
	res.render('tracker', {title: 'Tracker'});
});

router.get('/observer', function(req, res) {
	res.render('observer', {title: 'Tracker'});
});

router.get('/showdata', function(req, res) {
	console.log('called showdata');
	// var data = new dbcon.selectLocation([req.param('name')]);
	// console.log('showdata : ' + data);
	// DB연결해서 location 정보를 제공
	dbcon.client.query('SELECT * FROM locations WHERE name = ?', 
		[req.param('name')], function(err, data) {
			console.log(data);
			res.send(data);
	});
});

module.exports = router;
