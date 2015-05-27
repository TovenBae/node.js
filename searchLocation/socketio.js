

// 소켓 서버 생성 및 실행
module.exports = function socketio(server) {
	var io = require('socket.io').listen(server);
	io.sockets.on('connection', function(socket) {
		console.log('connected socket.io');
		// join event
		socket.on('join', function(data) {
			socket.join(data);
		});

		// location event
		socket.on('location', function(data) {
			// export function 바깥에서는 오류가 발생하므로
			// 해당 위치로 이동해서 처리함.
			var dbcon = require('./dbcon');

			// insert data
			new dbcon.insertLocation(data);

			// receive event invokde
			io.sockets.in(data.name).emit('receive', {
				latitude : data.latitude,
				longitude : data.longitude,
				date : Date.now()
			});
		})
	})
};