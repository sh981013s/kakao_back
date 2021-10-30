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
    console.log(req,':::')

});


router.post("/signup", (req, res) => {
   console.log(req,':::')
    let value = req.body;
    // bcryptjs.genSalt(10, (err, salt) => {
    //     bcryptjs.hash(value.pwd, salt, (err, hash) => {
    //         if (err) throw err;
    //         value.pwd = hash;
    //         db.query('INSERT INTO member(email, pw, validateKey, name, tel, birth, sex, reg_date) VALUES (?, ?, ?, ?, ?, ?, ?, now())', [value.email, value.pwd, value.memberName, value.nickname, value.birthDate, value.sex, value.phoneNumber], (err, rows) => {
    //             if (err) {
    //                 throw err;
    //             }
    //             res.send({success: true})
    //         });
    //     });
    // });
});



module.exports = router;
