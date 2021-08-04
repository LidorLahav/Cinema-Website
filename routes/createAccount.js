var express = require('express');
var router = express.Router();
const userBL = require('../Models/UserBL');


router.get('/', async function (req, res, next) {
    res.render('createAccount', { msg: ' ' });
});


router.post('/user', async function (req, res, next) {
    let username = req.body.username;
    let user = await userBL.getUserFromDB(username);
    if (user.length > 0) {
        let obj = req.body;
        await userBL.addUserPassword(username, obj.password);
        res.render('login', { msg: '' });
    } else {
        res.render('login', { msg: 'the username does not exist in the system ' });
    }

});
module.exports = router;