const membersDAL = require('../DAL/membersDAL')

exports.getAllMembers = async () => {
    let resp = await membersDAL.getAllMembers();
    return resp.data;
}

exports.getOneMember = async (id) => {
    let resp = await membersDAL.getOneMember(id);
    return resp.data;
}
exports.eddOneMember = async (obj) => {
    let resp = await membersDAL.addMember(obj);
    return resp.data;
}
exports.deleteOneMember = async (id) => {
    let resp = await membersDAL.deleteMember(id);
    return resp.data;
}
exports.updateOneMember = async (obj, id) => {
    let resp = await membersDAL.UpdateMember(obj, id);
    return resp.data;
}