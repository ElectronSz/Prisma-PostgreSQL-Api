"use strict";
exports.__esModule = true;
exports.createUserByEmailAndPassword = exports.findUserById = exports.findUserByEmail = void 0;
var bcrypt = require("bcrypt");
var db_1 = require("../config/db");
function findUserByEmail(email) {
    return db_1.db.user.findUnique({
        where: {
            email: email
        }
    });
}
exports.findUserByEmail = findUserByEmail;
function createUserByEmailAndPassword(user) {
    user.password = bcrypt.hashSync(user.password, 12);
    return db_1.db.user.create({
        data: user
    });
}
exports.createUserByEmailAndPassword = createUserByEmailAndPassword;
function findUserById(id) {
    return db_1.db.user.findUnique({
        where: {
            id: id
        }
    });
}
exports.findUserById = findUserById;
//# sourceMappingURL=user.service.js.map