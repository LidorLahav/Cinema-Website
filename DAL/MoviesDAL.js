const axios = require('axios');

exports.getAllMovies =function () {

    return axios.get("http://localhost:8000/api/movies/");

};


