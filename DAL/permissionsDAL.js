const jfile = require('jsonfile');

let usersPath = './configs/permissions.json';


const getPermissionsFromJson = function () {
    return new Promise((resolve, reject) => {
        jfile.readFile(usersPath, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}
const writeFile = function (obj) {

    return new Promise((resolve, reject) => {
        jfile.writeFile(usersPath, obj, (err) => {
            if (err) {
                reject(err);s
            }
            else {
                resolve('Succeeded')
            }
        })

    })
}



module.exports = { getPermissionsFromJson, writeFile };