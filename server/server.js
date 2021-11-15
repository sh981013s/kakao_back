const express = require('express');
const app = express();
const http = require('http');
const port = 8080;
const socketIO = require('socket.io');
const member = require('./module/member');
const friend = require('./module/friend');
const chat = require('./module/chat');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');

// server instance
const server = http.createServer(app);
// socketio 생성 후 use server instance
// const io = socketIO(server);
const io = require('socket.io')(server, { cors: { origin: "*" } });


const allowlist = ['http://localhost', 'http://localhost:3000'];
app.use(express.static('public'));
var corsOptionsDelegate = function (req, callback) {
	let corsOptions;
	if (allowlist.indexOf(req.header('Origin')) !== -1) {
		corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response,
	} else {
		corsOptions = { origin: false, credentials: true }; // disable CORS for this request
	}
	callback(null, corsOptions); // callback expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate));

//body-parser 요청의 본문을 해석해주는 미들웨어이다. 보통 폼 데이터나 AJAX요청의 데이터를 처리한다
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser('kakaoCooKiEKey'));

app.use('/member', member);
app.use('/friend', friend);
app.use('/chat', chat);

function scheduleGc() {
	if (!global.gc) {
		console.log('Garbage collection is not exposed');
		return;
	}

	setTimeout(function () {
		global.gc();
		scheduleGc();
	}, 300000);
}

scheduleGc();

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

let socketList = [];

/*io.on('connection', socket => {
	socket.on('send message', (item) => {
		const msg = item.name + ':' + item.message;
		console.log(msg,'finally');
		io.emit('receive message',{name:item.name, message:item.message});
	});
	socket.on('disconnect', () => {
		console.log('user disconnected:', socket.id);
	});
});*/

io.on('connection', socket => {
	// socketList.push(socket);
	// console.log(`User Connected ${socket.id}`);

	socket.on('joinRoom', (data) => {
		console.log(123123123)
		socket.join(data);
		console.log(`User with ID: ${socket.id} joined room: ${data} `)
	})

	socket.on('sendMessage', (data) => {
		socket.to(data.room)
		io.emit('receiveMessage',data);
	})

	socket.on('disconnect', () => {
		// console.log('User disconnected', socket.id)
	})
})

server.listen(4002,()=>console.log(`listening 4002`))