"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const app = express();
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render("error", { error: err });
}
// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("./routes/routes")(app);
app.use(errorHandler);
exports.default = app;
