"use strict";
exports.__esModule = true;
exports.generateTokens = exports.generateRefreshToken = exports.generateAccessToken = void 0;
var jwt = require("jsonwebtoken");
function generateAccessToken(user) {
    return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "5m"
    });
}
exports.generateAccessToken = generateAccessToken;
function generateRefreshToken(user, jti) {
    return jwt.sign({
        userId: user.id,
        jti: jti
    }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "8h"
    });
}
exports.generateRefreshToken = generateRefreshToken;
function generateTokens(user, jti) {
    var accessToken = generateAccessToken(user);
    var refreshToken = generateRefreshToken(user, jti);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    };
}
exports.generateTokens = generateTokens;
//# sourceMappingURL=jwt.js.map