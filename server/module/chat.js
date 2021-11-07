const express = require('express');
const db = require('../db');
const router = express.Router();


router.post("/getChatlist", (req, res) => {
    let value = req.body;
    console.log(value,'::::')
    db.query('select * from chatlist where uid = ?', [value.uid], (err, rows) => {
        res.send(rows);
        console.log(rows)
    });
});


router.post("/addChat", (req, res) => {
    let value = req.body;
    console.log(value,'::::')
    const nowDate = new Date();
    console.log(nowDate,':::')
    db.query('insert into chatlist(contents, uid, time) values(?,?,?)', [value.contents, value.uid, nowDate], (err, rows) => {
        res.send(rows);
        console.log(rows)
    });
});



module.exports = router;