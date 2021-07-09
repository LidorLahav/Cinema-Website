
const userBL = require('../Models/UserBL');

exports.isUserValid = async function (username, password) {
    try {
        let userData = await userBL.getAllUsersFromDB();
        let user = userData.find(x => x.username === username && x.password === password);
        if (user && user.username === "Admin" && user.password === "admin") {
            return obj = {
                password: user.password,
                username: user.username,
                valid: true,
                admin: true
            }
        }
        if (user) {// && user.dailyActions <= user.transactions
            return obj = {
                username: user.username,
                password: user.password,
                id: user._id,
                valid: true,
                admin: false,

            }
        }
    } catch (err) {

    }
    return obj = { valid: false, admin: false };
}