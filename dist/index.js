"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var auth_router_1 = require("./src/routes/auth.router");
var post_router_1 = require("./src/routes/post.router");
var app = (0, express_1["default"])();
var port = 3000;
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use("/auth", auth_router_1.authRoutes);
app.use("/post", post_router_1.postRoutes);
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at https://localhost:".concat(port));
});
//# sourceMappingURL=index.js.map