const moviesDAL = require('../DAL/MoviesDAL');

exports.getAllMovies = async () =>{

    let resp = await moviesDAL.getAllMovies();
    return resp.data;
}