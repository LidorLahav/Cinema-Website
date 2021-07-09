var express = require('express');
var router = express.Router();
var userBL = require('../Models/UserBL');
var permissionsBL = require('../Models/permissionsBL');

router.post('/update/:id', async function(req, res, next) {

  let action = req.body.action;

  let id = req.params.id;

  if(action == "Update")
  {
    let obj = {firstName : req.body.firstName , lastName : req.body.lastName ,session : req.body.session};
    
   await userBL.updateUserDB(id,req.body.username);
   await userBL.updateUserJson(id,obj);
   let permissions = [];
   permissions.push(req.body.permissions);
   await permissionsBL.updatePermissions(permissions);
  
    
  }
  else if(action == "Cancel")
  {
    
    res.redirect("/allUsers");
  }
 

 

});
module.exports = router;
