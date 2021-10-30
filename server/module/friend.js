const express = require('express');
const db = require('../db');
const bcryptjs = require("bcryptjs");
const router = express.Router();
const randtoken = require('rand-token');


router.get("/getFriends", (req, res) => {
    // select a.uid, a.name, a.birth, a.pic, a.state  from member a inner join friends b on a.uid = b.friend where b.owner = 7
    db.query('select a.uid, a.name, a.birth, a.pic, a.state  from member a inner join friends b on a.uid = b.friend where b.owner = ?', [7], (err, rows) => {
        res.send(rows);
    });
});


module.exports = router;