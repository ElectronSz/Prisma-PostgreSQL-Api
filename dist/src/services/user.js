"use strict";
exports.__esModule = true;
exports.createUser = exports.findUserById = exports.findUserByEmail = void 0;
var bcrypt = require("bcrypt");
var db_1 = require("../config/db");
function findUserByEmail(email) {
    return db_1.db.user.findUnique({
        where: {
            email: email
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            active: true,
            createdAt: true,
            refreshTokens: true,
            profile: {
                select: {
                    name: true,
                    active: true,
                    createdAt: true,
                    permission: {
                        select: {
                            role: true,
                            resource: true
                        }
                    }
                }
            }
        }
    });
}
exports.findUserByEmail = findUserByEmail;
function createUser(user) {
    var profile = user.profile, name = user.name, email = user.email, password = user.password;
    password = bcrypt.hashSync(user.password, 12);
    return db_1.db.user.create({
        data: {
            name: name,
            email: email,
            password: password,
            profile: {
                connect: { name: profile }
            }
        },
        select: {
            id: true,
            name: true,
            email: true,
            active: true,
            createdAt: true,
            refreshTokens: true,
            profile: {
                select: {
                    name: true,
                    active: true,
                    createdAt: true,
                    permission: {
                        select: {
                            role: true,
                            resource: true
                        }
                    }
                }
            }
        }
    });
}
exports.createUser = createUser;
function findUserById(id) {
    return db_1.db.user.findUnique({
        where: {
            id: id
        }
    });
}
exports.findUserById = findUserById;
//# sourceMappingURL=user.js.map