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
exports.__esModule = true;
exports.createPost = exports.deletePost = exports.updatePost = exports.findPostById = exports.findPostByAuthor = exports.findMany = void 0;
var db_1 = require("../config/db");
function findMany() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.db.post.findMany({
                        select: {
                            id: true,
                            title: true,
                            content: true,
                            published: true,
                            updatedAt: true,
                            active: true,
                            createdAt: true,
                            author: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                    active: true
                                }
                            }
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.findMany = findMany;
function createPost(post) {
    return __awaiter(this, void 0, void 0, function () {
        var title, content, authorEmail;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    title = post.title, content = post.content, authorEmail = post.authorEmail;
                    return [4 /*yield*/, db_1.db.post.create({
                            data: {
                                title: title,
                                content: content,
                                author: {
                                    connect: { email: authorEmail }
                                }
                            },
                            select: {
                                id: true,
                                title: true,
                                content: true,
                                published: true,
                                active: true,
                                createdAt: true,
                                author: {
                                    select: {
                                        name: true,
                                        email: true,
                                        active: true,
                                        createdAt: true
                                    }
                                }
                            }
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.createPost = createPost;
function findPostById(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.db.post.findUnique({
                        where: {
                            id: id
                        },
                        include: {
                            author: true
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.findPostById = findPostById;
function findPostByAuthor(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.db.post.findMany({
                        where: {
                            authorId: id
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.findPostByAuthor = findPostByAuthor;
function updatePost(post) {
    return __awaiter(this, void 0, void 0, function () {
        var id, title, content, authorId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = post.id, title = post.title, content = post.content, authorId = post.authorId;
                    return [4 /*yield*/, db_1.db.post.update({
                            data: {
                                title: title,
                                content: content,
                                authorId: authorId
                            },
                            where: {
                                id: id
                            }
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.updatePost = updatePost;
function deletePost(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.db.post["delete"]({
                        where: {
                            id: id
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.deletePost = deletePost;
//# sourceMappingURL=post.js.map