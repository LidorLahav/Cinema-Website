var express = require('express');
var router = express.Router();
var usersBL = require('../Models/UserBL');
var permissionsBL = require('../Models/permissionsBL');
var today = new Date().toISOString().slice(0, 10)

router.get('/', async function (req, res, next) {
    if (req.session.admin) {
        res.render('addUser', { user: null, today: today });
    }
    else {
        res.redirect("/login")
    }
});

router.post('/newUser', async function (req, res, next) {
    let action = req.body.action;
    if (action == "Save") {
        let user = await usersBL.addUserToDB(req.body.username);
        let newJsonUser = { firstName: req.body.firstName, lastName: req.body.lastName, createDate: today, session: req.body.session, id: user._id };
        await usersBL.addUSerToJson(newJsonUser);
        await permissionsBL.addPermissionToJson(user._id, req.body.permissions);
        res.redirect('/usersManagementPage');
    } else if (action == "Cancel") {
        res.redirect('/usersManagementPage');
    }
});
module.exports = router;