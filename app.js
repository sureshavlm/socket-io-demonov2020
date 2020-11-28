var app = require('express')();
var http = require('http').Server(app);

var io = require('socket.io')(http);

http.listen(8080, () => {
	console.log('Server listening on port 8080');
});

/* http://localhost:8080 */
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', (socket) => {
	console.log('A new connection established');
	socket.emit('acknowledgement'); //triggering an event 

	socket.on('add user', (username) => {
		console.log('User added ****: ' + username);
		socket.emit('greeting', 'Hello, '+ username);
	});
});