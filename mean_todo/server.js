// set up
var express = require('express');
var app		= express();
var mysql = require('mysql');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

// configuration
// connect to mysql DB database on
var pool 	= mysql.createPool({
	connectionLimit : 3,
	user: 'tet',
	password: 'test',
	database: 'test'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(bodyParser.json());

app.get('*', function(req, res) {
	res.sendFile('./public/index.html');
});

app.listen(8080);
console.log("App Listening on port 8080");


