const axios = require('axios');
const url = "http://localhost:8000/api/subscriptions/";

exports.getAllSubscriptions = function () {
    return axios.get(url);

};
exports.getOneSubscription = function (id) {
    return axios.get(url + id);
};

exports.addSubscription = function (obj) {
    return axios.post(url, obj);
};

exports.deleteSubscription = function (id) {
    return axios.delete(url + id);
};
exports.UpdateSubscription = function (id, obj) {
    return axios.put(url + id, obj);
};
