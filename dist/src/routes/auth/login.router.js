"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.authRoutes = void 0;
var express_1 = __importDefault(require("express"));
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var uuidv4 = require("uuid").v4;
var user_1 = require("../../services/user");
var jwt_1 = require("../../utils/jwt");
var auth_1 = require("../../services/auth");
var hashToken_1 = require("../../utils/hashToken");
var authRoutes = express_1["default"].Router();
exports.authRoutes = authRoutes;
authRoutes.post("/register", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, profile, name, email, password, existingUser, user, jti, _b, accessToken, refreshToken, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                _a = req.body, profile = _a.profile, name = _a.name, email = _a.email, password = _a.password;
                if (!email || !password) {
                    res
                        .status(400)
                        .json({ message: "You must provide an email and a password." });
                }
                return [4 /*yield*/, (0, user_1.findUserByEmail)(email)];
            case 1:
                existingUser = _c.sent();
                if (existingUser) {
                    res.status(400).json({ message: "Email already in use." });
                }
                return [4 /*yield*/, (0, user_1.createUser)({
                        email: email,
                        password: password,
                        profile: profile,
                        name: name
                    })];
            case 2:
                user = _c.sent();
                jti = uuidv4();
                _b = (0, jwt_1.generateTokens)(user, jti), accessToken = _b.accessToken, refreshToken = _b.refreshToken;
                return [4 /*yield*/, (0, auth_1.addRefreshTokenToWhitelist)({ jti: jti, refreshToken: refreshToken, userId: user.id })];
            case 3:
                _c.sent();
                res.status(200).json({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    user: user
                });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _c.sent();
                next(err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
authRoutes.post("/login", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, existingUser, validPassword, jti, _b, accessToken, refreshToken, err_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    res
                        .status(400)
                        .json({ message: "You must provide an email and a password." });
                }
                return [4 /*yield*/, (0, user_1.findUserByEmail)(email)];
            case 1:
                existingUser = _c.sent();
                if (!existingUser) {
                    res.status(403).json({ message: "Invalid login credentials." });
                }
                return [4 /*yield*/, bcrypt.compare(password, existingUser.password)];
            case 2:
                validPassword = _c.sent();
                if (!validPassword) {
                    res.status(403).json({ message: "Invalid login credentials." });
                }
                jti = uuidv4();
                _b = (0, jwt_1.generateTokens)(existingUser, jti), accessToken = _b.accessToken, refreshToken = _b.refreshToken;
                return [4 /*yield*/, (0, auth_1.addRefreshTokenToWhitelist)({
                        jti: jti,
                        refreshToken: refreshToken,
                        userId: existingUser.id
                    })];
            case 3:
                _c.sent();
                res.json({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    existingUser: existingUser
                });
                return [3 /*break*/, 5];
            case 4:
                err_2 = _c.sent();
                next(err_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
authRoutes.post("/refreshToken", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, payload, savedRefreshToken, hashedToken, user, jti, _a, accessToken, newRefreshToken, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                refreshToken = req.body.refreshToken;
                if (!refreshToken) {
                    res.status(400).json({ message: "Missing refresh token." });
                }
                payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
                return [4 /*yield*/, (0, auth_1.findRefreshTokenById)(payload.jti)];
            case 1:
                savedRefreshToken = _b.sent();
                if (!savedRefreshToken || savedRefreshToken.revoked === true) {
                    res.status(401).json({ message: "Unauthorized" });
                }
                hashedToken = (0, hashToken_1.hashToken)(refreshToken);
                if (hashedToken !== savedRefreshToken.hashedToken) {
                    res.status(401).json({ message: "Unauthorized" });
                }
                return [4 /*yield*/, (0, user_1.findUserById)(payload.userId)];
            case 2:
                user = _b.sent();
                if (!user) {
                    res.status(401).json({ message: "Unauthorized" });
                }
                return [4 /*yield*/, (0, auth_1.deleteRefreshToken)(savedRefreshToken.id)];
            case 3:
                _b.sent();
                jti = uuidv4();
                _a = (0, jwt_1.generateTokens)(user, jti), accessToken = _a.accessToken, newRefreshToken = _a.refreshToken;
                return [4 /*yield*/, (0, auth_1.addRefreshTokenToWhitelist)({
                        jti: jti,
                        refreshToken: newRefreshToken,
                        userId: user.id
                    })];
            case 4:
                _b.sent();
                res.json({
                    accessToken: accessToken,
                    refreshToken: newRefreshToken
                });
                return [3 /*break*/, 6];
            case 5:
                err_3 = _b.sent();
                next(err_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
authRoutes.post("/revokeRefreshTokens", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.body.userId;
                return [4 /*yield*/, (0, auth_1.revokeTokens)(userId)];
            case 1:
                _a.sent();
                res.json({ message: "Tokens revoked for user with id #".concat(userId) });
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                next(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=login.router.js.map