$(document).ready(function () {
	//함수 생성
	function setMarker(latitude, longitude) {
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(latitude, longitude),
			map: map
		});
	};

	// 변수 생성
	var name = prompt('이름을 입력하세요.', 'toven');
	var socket = io.connect();
	socket.emit('join', name);

	//지도 생성
	var temp = document.getElementById('map');
	var map = new google.maps.Map(temp, {
		zoom: 6,
		center: new google.maps.LatLng(37, 126),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	// 초기 위치 생성
	$.getJSON('/showdata', {name:name}, function(data) {
		$.each(data, function(index, item) {
			setMarker(item.latitude, item.longitude);
		});
	});

	// 소켓 이벤트 연결
	socket.on('receive', function(data) {
		setMarker(data.latitude, data.longitude);
	});
});