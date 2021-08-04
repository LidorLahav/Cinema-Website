var express = require('express');
var router = express.Router();
var userBL = require('../Models/UserBL');
var permissionsBL = require('../Models/permissionsBL');
var today = new Date().toISOString().slice(0, 10)

router.get('/:id', async function (req, res, next) {
  id = req.params.id;
  const userDB = await userBL.getUserFromDBbyId(id);
  const userJson = await userBL.getUserByIdFromJson(id);
  const permissions = await permissionsBL.getPermissionById(id);
  const user = { id: userDB._id, firstName: userJson.firstName, lastName: userJson.lastName, username: userDB.username, session: userJson.session, permissions: permissions.permissions }
  const today = new Date().toISOString().slice(0, 10);
  res.render('editUser', { user: user, today: today });
});

router.get('/delete/:id', async function (req, res, next) {
  id = req.params.id;
  const userDB = await userBL.getUserFromDBbyId(id);
  const userJson = await userBL.getUserByIdFromJson(id);
  const permissions = await permissionsBL.getPermissionById(id);
  await userBL.deleteUserFromDB(userDB.username);
  await userBL.deleteUserFromJson(userJson.id);
  await permissionsBL.deletePermissions(permissions.id);
  res.redirect("/allUsers")
});

router.post('/update/:id', async function (req, res, next) {

  let action = req.body.action;

  let id = req.params.id;

  if (action == "Update") {
    let user = { firstName: req.body.firstName, lastName: req.body.lastName, createDate: today, session: req.body.session, id: id };

    await userBL.updateUserDB(id, req.body.username);
    await userBL.updateUserJson(id, user);
    await permissionsBL.updatePermissions(id, req.body.permissions);
    res.redirect("/allUsers");

  }
  else if (action == "Cancel") {

    res.redirect("/allUsers");
  }




});
module.exports = router;
