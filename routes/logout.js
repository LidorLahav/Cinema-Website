var express = require('express');
var router = express.Router();
const loginBL = require('../Models/LoginBL');


router.get('/', function (req, res, next) {
    req.session["authenticated"] = false;
    req.session.admin = false;
    res.render('login', {msg: " "});
});

module.exports = router;