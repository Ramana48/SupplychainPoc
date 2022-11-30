"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.productsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});
const Product = (0, mongoose_1.model)('products', exports.productsSchema);
exports.default = Product;
