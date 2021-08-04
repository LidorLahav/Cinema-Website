var express = require('express');
var router = express.Router();
const loginBL = require('../Models/LoginBL');


router.get('/', function (req, res, next) {
    res.render('login', { msg: " " });
});


router.post('/userdata', async function (req, res, next) {
    try {
        let isValid = await loginBL.isUserValid(req.body.username, req.body.password);
        if (isValid.valid) {
            req.session.username = req.body.username;
            req.session["authenticated"] = true;
            if (isValid.admin) {
                req.session.admin = true;
            }
            else {
                req.session.userId = isValid.id;
            }
            res.redirect('/mainPage');
        } else {
            res.render('login', { msg: 'name or password are wrong ! ' })
        }
    }
    catch (err) {
        console.log(err);
    }
});
module.exports = router;