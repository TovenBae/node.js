$(document).ready(function () {
	$('a').click(function () {
		// 변수 선언
		var socket = io.connect();
		var name = $('#textinput').val();

		socket.emit('join', $('#textinput').val());

		// 소켓 이벤트 연결
		socket.on('receive', function(data) {
			// 문서 객체 추가
			var output = '';
			output += '<h3>latitude: ' + data.latitude + '</h3>';
			output += '<h3>longitude: ' + data.longitude + '</h3';
			output += '<p>' + data.date + '</p>';
			$('<li></li>').append(output).prependTo('#listview');

			// 문서 객체 개수 제한
			var content = $('#content');
			if (content.children().length > 7) {
				content.clildren().last().remove();
			};

			// 리스트 뷰 새로고침
			$('#listview').listview('refresh');
		});

		// 위치 추적 시작
		navigator.geolocation.watchPosition(function (position) {
			//데이터 전송
			socket.emit('location', {
				name: name,
				latitude : position.coords.latitude,
				longitude : position.coords.longitude
			});
		}, function (error) {
			// 위치 조회 실패시
			alert(error.message);
		});
	});
});