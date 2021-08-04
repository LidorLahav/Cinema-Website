var express = require('express');
var router = express.Router();
var usersBL = require('../Models/UserBL');
var usersDAL = require('../DAL/usersDAL');
var permissionsDAL = require('../DAL/permissionsDAL');



router.get('/', async function (req, res, next) {
    if (req.session.admin) {
        let usersDB = await usersBL.getAllUsersFromDB();
        let usersJson = await usersDAL.getUsersFromJson();
        let permissionsJson = await permissionsDAL.getPermissionsFromJson();
        let users = [];
        usersDB.forEach(userDb => {
            if (userDb.username !== "Admin") {
                const userJson = usersJson.find(user => user.id == userDb._id);
                const permissionJson = permissionsJson.find(user => user.id == userDb._id);
                const result = {
                    name: userJson?.firstName + " " + userJson?.lastName,
                    id: userJson?.id,
                    // username: userDb.username || "",
                    username: userDb?.username ? userDb.username : "",
                    session: userJson?.session ? userJson.session : "",
                    createDate: userJson?.createDate ? userJson.createDate : "",
                    permissions: permissionJson?.permissions ? permissionJson.permissions : ""

                }
                users.push(result);
            }
        });
        let action = req.body.action;
        if (action == "Edit") {
            res.redirect("/editUser");
        } else if (action == "Delete") {
            usersDB.forEach(userDb => {
                const userFromJson = usersJson.find(user => user.id == userDb._id);
            })
            await usersBL.deleteUserFromDB(userDb.username);
            await userBL.deleteUserFromJson(userFromJson.id);
            res.redirect("/allUsers")
        }
        res.render('allUsers', { users: users });
    }
    else {
        res.redirect("/login")
    }
});



module.exports = router;