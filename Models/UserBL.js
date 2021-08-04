const User = require('../Models/usersModel');
const usersDAL = require('../DAL/usersDAL');
var today = new Date().toISOString().slice(0, 10)


const getAllUsersFromDB = function () {
    return new Promise((resolve, reject) => {
        User.find({}, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });

}
const addUSerToJson = async function (user) {
    let users = await usersDAL.getUsersFromJson();
    users.push(user);
    await usersDAL.writeFile(users);
}

const addUserToDB = function (username) {
    return new Promise((resolve, reject) => {
        let user = new User({
            username: username,
        });

        user.save(function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });
}


const getUserFromDB = function (username) {
    return new Promise((resolve, reject) => {
        User.find({
            username: username
        }, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });
}
const addUserPassword = function (username, password) {
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ username: username },
            {
                password: password,
            }, function (err) {
                if (err) {
                    reject(err)
                }
                else {
                    resolve('ok');
                }
            })
    })
}

const deleteUserFromDB = function (username) {
    return new Promise((resolve, reject) => {
        User.findOneAndDelete({ username: username }, function (err) {
            if (err) {
                reject(err)
            }
            else {
                resolve('Deleted');
            }
        })
    })
}
const deleteUserFromJson = async function (id) {

    let users = await usersDAL.getUsersFromJson();
    let index = users.map(x => x.id).indexOf(id);
    users.splice(index, 1);
    let result = await usersDAL.writeFile(users);

    return result;
}

const getUserFromDBbyId = function (id) {
    return new Promise((resolve, reject) => {
        User.findById(id, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });
}

const updateUserDB = function (id, username) {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(id,
            {
                username: username,

            }, function (err) {
                if (err) {
                    reject(err)
                }
                else {
                    resolve('Updated');
                }
            })
    })
}
// const updateUserJson = async function (id, user) {
//     await this.deleteUserFromJson(id);
//     await this.addUSerToJson(user);
// }
const updateUserJson = async function (id, user) {
    let users = await usersDAL.getUsersFromJson();
    let index = users.map(x => x.id).indexOf(id);
    users.splice(index, 1);
    users.push(user);
    await usersDAL.writeFile(users);

}
const getUserByIdFromJson = async function (id) {
    let usersJson = await usersDAL.getUsersFromJson();
    const userJson = usersJson.find(u => u.id === id);
    return userJson;
}

module.exports = { getAllUsersFromDB, getUserFromDB, addUserPassword, addUSerToJson, addUserToDB, deleteUserFromDB, getUserFromDBbyId, deleteUserFromJson, updateUserDB, updateUserJson, getUserByIdFromJson };