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
router.post('/login', (req, res) => {
    const {email, pw} = req.query;
    db.query('SELECT * FROM member where email = ? and pw = ? ', [email, pw], (err, rows) => {
    	if (err) {
    		throw err;
    	}
    	res.send(rows);
    });
});
module.exports = router;
