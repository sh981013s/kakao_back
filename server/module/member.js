const express = require('express');
const db = require('../db');
const router = express.Router();

/**
 * @description test
 */
router.get('/getFriends', (req, res) => {
	db.query('SELECT * FROM member', [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(rows);
	});
});

/**
 * @description test
 */
router.get('/login', (req, res) => {
	console.log(req, ':::::::');
	// db.query('SELECT * FROM member', [], (err, rows) => {
	//     if (err) {
	//         throw err;
	//   `
	//   }
	//     res.send(rows);
	// });
});
module.exports = router;
