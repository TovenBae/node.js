
// Connection with MySQL
var client = require('mysql').createConnection({
  user : 'root',
  password : 'bbc',
  database : 'test'
});

module.exports.client = client;

module.exports.insertLocation = function insertLocation(data) {
	// 위치 정보 저장
	client.query('INSERT INTO locations(name, latitude, longitude, date) 		VALUES(?, ?, ?, NOW())',
		[data.name, data.latitude, data.longitude]);

};

module.exports.selectLocation = function selectLocation(param) {
	console.log('param : ' + param);
	// 저장된 위치 정보 조회
	client.query('SELECT * FROM locations WHERE name = ?', param, function(err, data) {
		console.log('data : ' + data);
		return '100';
	});
};