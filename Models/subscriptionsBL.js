const SubscriptionsDAL = require('../DAL/subscriptionDAL')

exports.getAllSubscriptions = async () => {
    let resp = await SubscriptionsDAL.getAllSubscriptions()
    return resp.data;
}

exports.getOneSubscriptions = async (id) => {
    let resp = await SubscriptionsDAL.getOneSubscription(id);
    return resp.data;
}
exports.eddOneSubscription = async (obj) => {
    let resp = await SubscriptionsDAL.addSubscription(obj);
    return resp.data;
}
exports.deleteOneSubscription = async (id) => {
    let resp = await SubscriptionsDAL.deleteSubscription(id);
    return resp.data;
}
exports.updateOneSubscription = async (obj, id) => {
    let resp = await SubscriptionsDAL.UpdateSubscription(obj, id);
    return resp.data;
}