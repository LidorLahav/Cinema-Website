const permissionsDAL = require('../DAL/permissionsDAL');

exports.addPermissionToJson = async function (id, permissions) {
    let jsonPermissions = await permissionsDAL.getPermissionsFromJson();
    let obj = { permissions: permissions, id: id };
    jsonPermissions.push(obj);
    await permissionsDAL.writeFile(jsonPermissions);

}
exports.deletePermissions = async function (id) {
    let permissions = await permissionsDAL.getPermissionsFromJson();
    let index = permissions.map(x => x.id).indexOf(id);
    permissions.splice(index, 1);
    let result = await permissionsDAL.writeFile(permissions);
    return result;
}

exports.updatePermissions = async function (id, permissions) {
    let jsonPermissions = await permissionsDAL.getPermissionsFromJson();
    let index = jsonPermissions.map(x => x.id).indexOf(id);
    jsonPermissions.splice(index, 1);
    let obj = { permissions: permissions, id: id };
    jsonPermissions.push(obj);
    await permissionsDAL.writeFile(jsonPermissions);
}

exports.getPermissionById = async function (id) {
    let jsonPermissions = await permissionsDAL.getPermissionsFromJson();
    const permissions = jsonPermissions.find(u => u.id === id);
    return permissions;
}

