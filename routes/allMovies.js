var express = require('express');
var router = express.Router();
const moviesBL = require('../Models/MoviesBL');
const permissionsDAL = require('../DAL/permissionsDAL');

router.get('/', async function (req, res, next) {
    const permissions = await permissionsDAL.getPermissionsFromJson();
    let permission = true;
    if (!req.session.admin) {
        console.log(req.session);
        permission = permissions.find(p => p.id === req.session.idd).find(x => x === "View Movies");
    }
    if (req.session.authenticated && permission) {
        let movies = await moviesBL.getAllMovies();
        if (!req.session.admin) {
            const per = permissions.find(p => p.id === req.session.idd).find(x => x === "Update Movies") && permissions.find(p => p.id === req.session.idd).find(x => x === "Delete Movies");
            res.render('allMovies', { movies: movies, username: req.session.username, permission: per });
        }
        res.render('allMovies', { movies: movies, username: req.session.username, permission: true });
    }
    else {
        res.redirect("/login")
    }
});

module.exports = router;