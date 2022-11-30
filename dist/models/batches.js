"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchesSchema = void 0;
const mongoose_1 = require("mongoose");
const privileges_enum_1 = require("../enums/privileges.enum");
exports.batchesSchema = new mongoose_1.Schema({
    products: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Product'
        }],
    quantity: {
        type: Number,
        required: true
    },
    userId: {
        type: String
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(privileges_enum_1.privilegeEums)
    },
    isAllOkay: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});
const Batches = (0, mongoose_1.model)('batches', exports.batchesSchema);
exports.default = Batches;
