var express = require('express');
var router = express.Router();
var permissionsDAL = require('../DAL/permissionsDAL');
var membersBL = require('../Models/membersBL');


router.get('/', async function (req, res, next) {
    const permissions = await permissionsDAL.getPermissionsFromJson();
    let userPermissions;
    if (req.session.admin) {
        res.render('addMember', { username: req.session.username });
    } else {
        userPermissions = permissions.find(p => p.id === req.session.userId);
        if (userPermissions?.permissions.includes("Create Subscriptions")) {
            res.render('addMember', { username: req.session.username });
        }
    }
    res.render("subscriptionsPage", { username: req.session.username, msg: 'you do not have the right permission! ' });
});

router.post('/newMember', async function (req, res, next) {
    let action = req.body.action;
    if (action == "Save") {
        let newMember = { Name: req.body.Name, Email: req.body.Email, City: req.body.City };
        await membersBL.eddOneMember(newMember);
        res.redirect('/subscriptionsPage');
    } else if (action == "Cancel") {
        res.redirect('/subscriptionsPage');
    }
});
module.exports = router;