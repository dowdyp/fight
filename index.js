var host = "127.0.0.1";
var port = 3000;

var left = 0;
var right = 0;

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  	res.sendFile(__dirname + '/index.html')
});

io.on('connection', function(socket) {
	console.log('a person is here');
	socket.on('disconnect', function() {
		console.log('a person left');
	});
	socket.on('left_up', function() {
		left = left + 1;
		console.log('left has been increased to ' + left);
		io.emit('left_up', left);
		var counter = {left, right}
	});
	socket.on('right_up', function() {
		right = right + 1;
		console.log('right has been increased to ' + right);
		io.emit('right_up', right);
		var counter = {left, right}
	});
});

app.get('/counter', function(req, res) {
	res.json(counter);
});

http.listen(port, function() {
	console.log('Server running on http://' + host + ':' + port);
});







// app.post('/add_left', function(req, res) {
// 	left = left + 1;
// 	console.log(String('left = ' + left))
// });

// app.post('/add_right', function(req, res) {
// 	right = right + 1;
// 	console.log(String('right = ' + right));
// 	return 
// });