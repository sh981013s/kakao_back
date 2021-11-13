const moment = require('moment');
const express = require('express');
const db = require('../db');
const router = express.Router();

const Months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

const indexDataReudcer = (acc, cur, idx) => {
    const date = new Date(cur.time)
    const dateToUse = `${Months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    const timeToUse = moment(date).format('HH:mm A');
    if(idx === 0) {
        return [{date: dateToUse, time: timeToUse, contents: cur.contents}]
    }
    if (acc[acc.length-1].date === dateToUse) {
        const popData = acc.pop();
        if(typeof popData.time === 'string') {
            console.log(popData,'string')
            return(
                [...acc,{date: dateToUse, time: [popData.time,timeToUse], contents: [popData.contents,cur.contents]}]
            )
        } else {
            console.log(...popData.time,'array')
            return(
                [...acc,{date: dateToUse, time: [...popData.time,timeToUse], contents: [...popData.contents,cur.contents]}]
            )
        }
    } else {
        return (
            [...acc, {date: dateToUse, time: timeToUse, contents: cur.contents}]
        )
    }
}

router.post("/getMyChatlist", (req, res) => {
    let value = req.body;
    db.query('select contents,time from chatlist where uid = ?', [value.uid], (err, rows) => {
        const list = rows.reduce(indexDataReudcer,'')
        res.send({list: list});
    });
});


router.post("/addChat", (req, res) => {
    let value = req.body;
    console.log('sex');
    console.log(value,'lol')
    const nowDate = new Date();
    // console.log(nowDate,':::')
    db.query('insert into chatlist(contents, uid, time) values(?,?,?)', [value.contents, value.uid, nowDate], (err, rows) => {
        res.send(rows);
        // console.log(rows)
    });
});




module.exports = router;