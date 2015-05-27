$(document).ready(function () {
	// Ajax 실행
	$.getJSON('/room', function(data) {
		//  반복 수행
		$.each(data, function(index, item) {
			// 문서 객체 추가
			$('<button</button').attr({
				'data-room':item
			}).text('Room Number:' + item).button().appendTo('#container');
		});
	});

	// Socket 처리 실행
	var socket = io.connect();
	socket.on('create_room', function(data) {
		// 문서 객체 추가
		$('<button></button>').attr({
			'data-room':data
		}).text('Room Number: ' + data).appendTo("#container");
	});

	// 이벤트 연결
	$(document).on('#container > button', 'click', function() {
		var room = $(this).attr('data-room');

		// 페이지 이동
		location = '/canvas' + room;
	});

	$('body > button').click(function() {
		var room = $('#room').val();

		// 소켓 이벤트 발생
		socket.emit('create_room', room);

		// 페이지 이동
		location = '/canvas' + room;
	});
});