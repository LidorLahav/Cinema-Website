const axios = require('axios');
const url = "http://localhost:8000/api/members/";

exports.getAllMembers = function () {
    return axios.get(url);

};
exports.getOneMember = function (id) {
    return axios.get(url + id);
};

exports.addMember = function (obj) {
    return axios.post(url, obj);
};

exports.deleteMember = function (id) {
    return axios.delete(url + id);
};
exports.UpdateMember = function (id, obj) {
    return axios.put(url + id, obj);
};

