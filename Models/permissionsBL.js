const permissionsDAL = require('../DAL/permissionsDAL');

exports.addPermissionToJson = async function (user) {

    let permissions = await permissionsDAL.getPermissionsFromJson();
    let obj = { permissions: user.permissions, id: user.id};
    permissions.push(obj);
    await permissionsDAL.writeFile(permissions);

}
exports.deletePermissions = async function (id) {

    let permissions = await permissionsDAL.getPermissionsFromJson();
    let index = users.permissions(x => x.id).indexOf(id);
    permissions.splice(index);
    let result = await permissionsDAL.writeFile(permissions);

    return result;
}

exports.updatePermissions = async function (id, permissions) {
    await this.deletePermissions(id);
    await this.addPermissionToJson(permissions);
}

