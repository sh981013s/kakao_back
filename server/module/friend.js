const express = require('express');
const db = require('../db');
const bcryptjs = require("bcryptjs");
const router = express.Router();
const randtoken = require('rand-token');



router.get("/getFriends", (req, res) => {
    let value = req.query
    db.query('select a.uid, a.name, a.birth, a.pic, a.state  from member a inner join friends b on a.uid = b.friend where b.owner = ?', [value.uid], (err, rows) => {
        res.send(rows);
        console.log(rows)
    });
});


router.get('/searchFriendsById', (req, res) => {
    let value = req.query;
    db.query('SELECT * FROM member where id = ?', [value.keyword], (err, rows) => {
        if (err) {
            throw err;
        }
        if(!!rows[0]){
            const  fdKey = rows[0].uid
            db.query('select a.uid, a.name, a.birth, a.pic, a.state  from member a inner join friends b on a.uid = b.friend where b.owner = ? and b.friend = ?', [value.uid, fdKey], (err, row) => {
                if(!!row[0]){
                    const parameter = {
                        resultType : 1,
                        fdInfo : rows[0]
                    }
                    res.send(parameter);
                }else{
                    const parameter = {
                        resultType : 2,
                        fdInfo : rows[0]
                    }
                    res.send(parameter);
                }
            });
        }else{
            let parameter = {
                resultType : 0,
                message : 'can not search user'
            }
            res.send(parameter);
        }
    });
});

router.get('/searchFriendsByContacts', (req, res) => {
    let value = req.query;
    db.query('SELECT * FROM member where id = ?', [value.keyword], (err, rows) => {
        if (err) {
            throw err;
        }
        if(!!rows[0]){
            const  fdKey = rows[0].uid
            db.query('select a.uid, a.name, a.birth, a.pic, a.state  from member a inner join friends b on a.uid = b.friend where b.owner = ? and b.friend = ?', [value.uid, fdKey], (err, row) => {
                if(!!row[0]){
                    const parameter = {
                        resultType : 1,
                        fdInfo : rows[0]
                    }
                    res.send(parameter);
                }else{
                    const parameter = {
                        resultType : 2,
                        fdInfo : rows[0]
                    }
                    res.send(parameter);
                }
            });
        }else{
            let parameter = {
                resultType : 0,
                message : 'can not search user'
            }
            res.send(parameter);
        }
    });
});

router.post('/addFriends', (req, res) => {
    let value = req.body;
    db.query('insert into friends(owner, friend) value(?,?)', [value.uid,value.fdId], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log(rows,':::result')
        res.send(rows);
    });
});




module.exports = router;