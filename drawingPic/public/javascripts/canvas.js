// Point 생성자 함수 생성
function Point(event, target) {
	this.x = event.pageX - $(target).position().left;
	thi.sy = event.pageY - $(target).position().top;
}

$(document).ready(function() {
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	var width = 5;
	var color = '#000000';
	var isDown = false;
	var newPoint, oldPoint;

	canvas.onmousedown = function (event) {
		isDown = true;
		oldPoint = new Point(event, this);
	};

	canvas.onmouseup = function() { isDown = false; };
	canvas.onmousemove = function (event) {
		if(isDown) {
			newPoint = new Point(event, this);

			socket.emit('draw', {
				width : width,
				color : color,
				x1 : oldPoint.x,
				y1 : oldPoint.y,
				x2 : newPoint.x,
				y2 : newPoint.y
			});

			oldPoint = newPoint;
		};
	};

	var socket = io.connect();
	socket.emit('join', '<%= room %>');
	socket.on('line', function(data) {
		context.lineWidth = data.width;
		context.strokeStyle = data.color;
		context.beginPath();
		context.moveTo(data.x1, data.y1);
		context.lineTo(data.x2, data.y2);
		context.stroke();
	});

	$('#colorpicker').farbtastic(function (data) {
		color = data;
	});

	$('#slider').slider({
		max: 20,
		min: 1,
		value : 5,
		change: function (event, ui) {
			width = ui.value;
		};
	});
});