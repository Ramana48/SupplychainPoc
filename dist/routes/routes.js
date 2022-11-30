"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_route_1 = require("./user.route");
const batches_routes_1 = require("./batches.routes");
module.exports = (app) => {
    app.get("/", (req, res) => {
        res.send("Welcome!!");
    });
    //User service route
    app.use("/user", user_route_1.default);
    //Batch service route
    app.use("/batches", batches_routes_1.default);
};
