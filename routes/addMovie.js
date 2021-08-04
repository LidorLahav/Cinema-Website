var express = require('express');
var router = express.Router();
var permissionsDAL = require('../DAL/permissionsDAL');
var movieBL = require('../Models/MoviesBL');


router.get('/', async function (req, res, next) {
    const permissions = await permissionsDAL.getPermissionsFromJson();
    let permission = true;
    let userPermissions;
    if (req.session.admin) {
        res.render('addMovie', { username: req.session.username });
    } else {
        userPermissions = permissions.find(p => p.id === req.session.userId);
        if (userPermissions?.permissions.includes("Create Movies")) {
            res.render('addMovie', { username: req.session.username });
        }

    }
    res.render("moviesPage", { username: req.session.username, msg: 'you do not have the right permission! ' });
});

router.post('/newMovie', async function (req, res, next) {
    let action = req.body.action;
    if (action == "Save") {
        Genres = req.body.Genres.split(",");
        let newMovie = { Name: req.body.Name, Genres: Genres, Premiered: req.body.Premiered, Image: req.body.Image };
        await movieBL.eddOneMovie(newMovie);
        res.redirect('/moviesPage');
    } else if (action == "Cancel") {
        res.redirect('/moviesPage');
    }
});
module.exports = router;