const axios = require('axios');
const url = "http://localhost:8000/api/movies/";

exports.getAllMovies = function () {
    return axios.get(url);

};
exports.getOneMovie = function (id) {
    return axios.get(url + id);
};

exports.addMovie = function (obj) {
    return axios.post(url, obj);
};

exports.deleteMovie = function (id) {
    return axios.delete(url + id);
};
exports.UpdateMovie = function (id, obj) {
    return axios.put(url + id, obj);
};



