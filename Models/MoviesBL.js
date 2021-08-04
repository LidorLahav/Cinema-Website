const moviesDAL = require('../DAL/MoviesDAL');

exports.getAllMovies = async () => {
    let resp = await moviesDAL.getAllMovies();
    return resp.data;
}

exports.getOneMovie = async (id) => {
    let resp = await moviesDAL.getOneMovie(id);
    return resp.data;
}
exports.eddOneMovie = async (obj) => {
    console.log(obj);
    let resp = await moviesDAL.addMovie(obj);
    return resp.data;
}
exports.deleteOneMovie = async (id) => {
    let resp = await moviesDAL.deleteMovie(id);
    return resp.data;
}
exports.updateOneMovie = async (obj, id) => {
    let resp = await moviesDAL.UpdateMovie(obj, id);
    return resp.data;
}