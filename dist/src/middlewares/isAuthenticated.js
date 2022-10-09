"use strict";
exports.__esModule = true;
exports.isAuthenticated = void 0;
var jwt = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    var authorization = req.headers.authorization;
    if (!authorization) {
        res.status(401).json({ message: "🚫 Un-Authorized 🚫" });
    }
    else {
        try {
            var token = authorization.split(" ")[1];
            var payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            req.params.payload = payload;
        }
        catch (err) {
            res.status(401).json({ message: "🚫 Un-Authorized 🚫" });
            if (err.name === "TokenExpiredError") {
                res.status(401).json({ message: "🚫 Un-Authorized 🚫" });
            }
            res.status(401).json({ message: "🚫 Un-Authorized 🚫" });
        }
        return next();
    }
}
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=isAuthenticated.js.map