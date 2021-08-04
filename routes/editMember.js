var express = require('express');
var router = express.Router();
var memberBL = require('../Models/membersBL');


router.get('/:id', async function (req, res, next) {
    id = req.params.id;
    const member = await memberBL.getOneMember(id);
    res.render('editMember', { member: member });
});

router.get('/delete/:id', async function (req, res, next) {
    id = req.params.id;
    const member = await memberBL.getOneMember(id);
    await memberBL.deleteOneMember(member._id);
    res.redirect("/allMembers");
});

router.post('/update/:id', async function (req, res, next) {

    let action = req.body.action;

    let id = req.params.id;

    if (action == "Update") {
        let member = { Name: req.body.Name, Email: req.body.Email, City: req.body.City }
        await memberBL.updateOneMember(id, member);
        res.redirect("/allMembers");

    }
    else if (action == "Cancel") {

        res.redirect("/allMembers");
    }




});
module.exports = router;
