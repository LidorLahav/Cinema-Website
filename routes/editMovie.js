var express = require('express');
var router = express.Router();
var movieBL = require('../Models/MoviesBL');


router.get('/:id', async function (req, res, next) {
    id = req.params.id;
    const movieRest = await movieBL.getOneMovie(id);
    // console.log(movieRest);
    // const movie = { name: movieRest.Name, genres: movieRest.Genres, premiered: movieRest.Premiered, url: movieRest.Image, id: movieRest._id }
    res.render('editMovie', { movie: movieRest });
});

router.get('/delete/:id', async function (req, res, next) {
    id = req.params.id;
    const movie = await movieBL.getOneMovie(id);
    console.log(movie);
    console.log(movie._id);
    await movieBL.deleteOneMovie(movie._id);
    res.redirect("/allMovies")
});

router.post('/update/:id', async function (req, res, next) {

    let action = req.body.action;

    let id = req.params.id;

    if (action == "Update") {
        let movie = { Name: req.body.name, Genres: req.body.genres, Premiered: req.body.premiered, Image: req.body.url };
        await movieBL.updateOneMovie(id, movie);
        res.redirect("/allMovies");

    }
    else if (action == "Cancel") {

        res.redirect("/allMovies");
    }




});
module.exports = router;
