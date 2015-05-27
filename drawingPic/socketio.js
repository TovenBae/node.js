

// 소켓 서버 생성 및 실행
module.exports = function socketio(server) {
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
};