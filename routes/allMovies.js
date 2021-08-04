var express = require('express');
var router = express.Router();
const moviesBL = require('../Models/MoviesBL');
const permissionsDAL = require('../DAL/permissionsDAL');

router.get('/', async function (req, res, next) {
    const permissions = await permissionsDAL.getPermissionsFromJson();
    let permission = true;
    let userPermissions;
    if (!req.session.admin) {
        userPermissions = permissions.find(p => p.id === req.session.userId);
        permission = userPermissions?.permissions.includes("View Movies");
    }
    if (req.session.authenticated && permission) {
        let movies = await moviesBL.getAllMovies();
        if (!req.session.admin) {
            const perUpdate = userPermissions?.permissions.includes("Update Movies");
            const perDelete = userPermissions?.permissions.includes("Delete Movies");
            res.render('allMovies', { movies: movies, username: req.session.username, perUpdate: perUpdate, perDelete: perDelete });
        }
        res.render('allMovies', { movies: movies, username: req.session.username, perUpdate: true, perDelete: true });
    }
    else {
        res.render("moviesPage", { username: req.session.username, msg: 'you do not have the right permission! ' });

    }
});

module.exports = router;