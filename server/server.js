const express = require('express');
const app = express();
const port = 8080;
const member = require('./module/member');
const friend = require('./module/friend');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');

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
