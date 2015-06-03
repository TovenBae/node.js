var express = require('express');
var router = express.Router();

// load MySql
var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit: 3,
	user: 'test',
	password: 'test',
	database: 'test'
});

/* GET 게시판 전체 리스트. */
router.get('/', function(req, res, next) {
  res.redirect('/board/list/1');
});

router.get('/list/:page', function(req, res, next) {
	pool.getConnection(function(err, conn) {
		var selectList = "SELECT  idx, creator_id, title, date_format(modidate, '%Y-%m-%d %H:%i:%s') modidate, hit from board";
		conn.query(selectList, function(err, rows) {
			if (err) console.error("err : " + err);
			
			console.log("rows : " + JSON.stringify(rows));
			res.render('list', {title: '게시판 전체 글 조회', rows:rows});
			conn.release();
		});
	});
});

// 글쓰기 페이지 호출 
router.get('/write', function(req, res, next) {
	res.render('write', {title: "게시판 글 쓰기"});
});

// 글쓰기 저장
router.post('/write', function(req, res, next) {
	console.log(req.body);
	var datas = [
		req.body.creator_id,
		req.body.title,
		req.body.content,
		req.body.passwd];
	pool.getConnection(function(err, conn) {
		var insertList = "insert into board(creator_id, title, content, passwd) values(?,?,?,?)";
		conn.query(insertList, datas, function(err, rows) {
			if (err) console.error("err : " + err);

			console.log("rows : " + JSON.stringify(rows));
			res.redirect('/board');
			conn.release();
		});
	});
});

// 글조회
router.get('/read/:idx', function(req, res, next) {
	var idx = [req.params.idx];
	pool.getConnection(function(err, conn) {
		var selectArticle = "select idx, creator_id, title, content, date_format(modidate, '%Y-%m-%d %H:%i:%s') modidate, hit from board where idx = ?";
		conn.query(selectArticle, idx, function(err, row) {
			if (err) console.error(err);

			console.log("1 개글 조회 결과 확인" );
			res.render('read', {title: "글 조회", row:row[0]});
			conn.release();
		});
	});
});

// 글 수정
router.get('/update', function(req, res, next) {
	var idx = [req.query.idx];
	console.log('idx : ' + idx);
	pool.getConnection(function(err, conn) {
		var selectArticle = "select idx, creator_id, title, content, date_format(modidate, '%Y-%m-%d %H:%i:%s') modidate, hit from board where idx = ?";
		conn.query(selectArticle, idx, function(err, row) {
			if (err) console.error(err);

			console.log("1 개글 조회 결과 확인" );
			res.render('update', {title: "글 수정", row:row[0]});
			conn.release();
		});
	});
});

// 글수정 저장
router.post('/update', function(req, res, next) {
	console.log(req.body);
	var datas = [
		req.body.creator_id,
		req.body.title,
		req.body.content,
		req.body.passwd,
		req.body.idx];
	pool.getConnection(function(err, conn) {
		var insertList = "update board set creator_id = ?, title = ?, content = ?, passwd =? where idx = ?";
		conn.query(insertList, datas, function(err, rows) {
			if (err) console.error("err : " + err);

			console.log("rows : " + JSON.stringify(rows));
			res.redirect('/board');
			conn.release();
		});
	});
});


module.exports = router;
