var express = require('express');
var router = express.Router();
const membersBL = require('../Models/membersBL');
const permissionsDAL = require('../DAL/permissionsDAL');
const subscriptionsBL = require('../Models/subscriptionsBL');
const movieBL = require('../Models/MoviesBL');
var today = new Date().toISOString().slice(0, 10)

router.get('/', async function (req, res, next) {
    const permissions = await permissionsDAL.getPermissionsFromJson();
    const movies = await movieBL.getAllMovies();
    let permission = true;
    let isClicked = false;
    let userPermissions;
    if (!req.session.admin) {
        userPermissions = permissions.find(p => p.id === req.session.userId);
        permission = userPermissions?.permissions.includes("View Subscriptions");
    }
    if (req.session.authenticated && permission) {
        let members = await membersBL.getAllMembers();
        let subscriptions = await subscriptionsBL.getAllSubscriptions();
        if (!req.session.admin) {
            const perUpdate = userPermissions?.permissions.includes("Update Subscriptions");
            const perDelete = userPermissions?.permissions.includes("Delete Subscriptions");
            res.render('allMembers', {today:today, members: members, subscriptions: subscriptions,movies:movies, username: req.session.username, perUpdate: perUpdate, perDelete: perDelete });
        }
        res.render('allMembers', {today,today, members: members, subscriptions: subscriptions, username: req.session.username, perUpdate: true, perDelete: true, movies:movies });
    }
    else {
        res.render("subscriptionsPage", { username: req.session.username, msg: 'you do not have the right permission! ' });

    }
});

router.get('/:id', async function (req, res, next) {
    if (req.session.authenticated) {
        let id = req.params.id;
        let movie = await movieBL.getOneMovie(id);
        res.render('oneMoviePage', { movie: movie });

    } else {
        res.redirect('login');
    }

});
router.post('/newMember/:id', async function (req, res, next) {
    console.log(movieId);
    console.log(movieName);
    console.log(date);
        let newSub = { MemberId : req.params.id , Movies :[{date : date ,movieId: movieId ,movieName :movieName}] };
        await subscriptionsBL.eddOneSubscription(newSub);
        res.redirect('/allMembers');
   
});

module.exports = router;