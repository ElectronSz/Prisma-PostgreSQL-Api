"use strict";
exports.__esModule = true;
exports.db = void 0;
var client_1 = require("@prisma/client");
var db = new client_1.PrismaClient({
    log: [
        {
            emit: "event",
            level: "query"
        },
    ]
});
exports.db = db;
db.$on("query", function (e) {
    //console.log("Duration: " + e.duration + "ms");
});
//# sourceMappingURL=db.js.map