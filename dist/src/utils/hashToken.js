"use strict";
exports.__esModule = true;
exports.hashToken = void 0;
var crypto = require("crypto");
function hashToken(token) {
    return crypto.createHash("sha512").update(token).digest("hex");
}
exports.hashToken = hashToken;
//# sourceMappingURL=hashToken.js.map