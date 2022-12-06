"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const products_controller_1 = require("../controllers/products.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express.Router();
const productsController = new products_controller_1.default();
router.get("/", auth_middleware_1.default.checkIfBodyParamsExistFetchProductsApi, productsController.fetchProducts);
exports.default = router;
