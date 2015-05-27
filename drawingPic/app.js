var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// 포트 설정
app.set('port', '3000');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


var server = http.createServer(app).listen(app.get('port'), function() {
  console.log('Server running at http://localhost:3000');
});

// 소켓서버 실행
var io = require('socket.io').listen(server);
io.set('log level', 2);
io.sockets.on('connection', function(socket) {
  console.log('connected socket.io');
  // join event
  socket.on('join', function(data) {
    socket.join(data);
    socket.set('room', data);
  });

  // location event
  socket.on('draw', function(data) {
    socket.get('room', function(error, room) {
      io.sockets.in(room).emit('line', data);
    });
  });

  socket.on('create_room', function(data) {
    io.sockets.emit('create_room', data.toString());
  });
});

app.use('/room', function(req, res, next) {
  console.log('called room');
  res.send(io.sockets.manager.rooms);
});


module.exports = app;