const express = require('express');
const db = require('../db');
const bcryptjs = require("bcryptjs");
const router = express.Router();
const randtoken = require('rand-token');
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
 * @description Login
 */
router.post('/signin', (req, res) => {
    const {email, pw} = req.body;
    db.query('SELECT * FROM member where email = ? and pw = ? ', [email, pw], (err, rows) => {
        if (err) {
            throw err;
        }
        if(rows.length === 1){
            const token = randtoken.uid(256);
            db.query('UPDATE member SET token = ? WHERE uid = ?', [token, rows[0].uid]);
            let parameter = {
                accessToken : token,
                resultType : 'success'
            }
            res.send(parameter);
        }else{
            let parameter = {
                resultType : 'fail'
            }
            res.send(parameter);
        }
    });
});

router.get("/me", (req, res) => {
    let value = req.query;
    console.log(value.token,'value.token')
    db.query('SELECT * FROM member where token = ?', [value.token], (err, rows) => {
        if (err) {
            throw err;
        }
        if(rows.length === 1){
            let parameter = {
                userInfo : rows,
                resultType : 'success'
            }
            res.send(parameter);
        }else{
            let parameter = {
                resultType : 'fail'
            }
            res.send(parameter);
        }
    });

});


router.post("/signup", (req, res) => {
    let value = req.body;

    db.query('insert into member(email, pw, tel,name ,reg_date )  value(?,?,?,?,now())', [value.email, value.pw, value.tel, 'tester'], (err, rows) => {
        if (err) {
            throw err;
        }
        let parameter = {
            resultType : 'success'
        }
        res.send(parameter);

    });
});



module.exports = router;