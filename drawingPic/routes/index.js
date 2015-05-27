var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('lobby', { title: 'Express' });
});

router.get('/canvas/:room', function(req, res, next) {
  res.render('canvas', { title: 'Express', room: request.param('room') });
});

router.get('/room', function(req, res, next) {
  console.log('called room 2');
  res.send(io.sockets.manager.rooms);
});


module.exports = router;
