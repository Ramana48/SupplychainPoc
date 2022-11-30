"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express.Router();
const userController = new user_controller_1.default();
router.post("/login", auth_middleware_1.default.checkIfBodyParamsExistLoginApi, userController.userLogin);
exports.default = router;
