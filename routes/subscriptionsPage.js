var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

    if (req.session.authenticated) {
        res.render('subscriptionsPage', { username: req.session.username, msg: '' });
    }
    else {
        res.redirect("/login")
    }
});

module.exports = router;