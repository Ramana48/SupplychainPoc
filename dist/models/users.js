"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    roles: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Role'
        }],
    createdDate: {
        type: Date,
        default: Date.now
    }
});
const User = (0, mongoose_1.model)('users', exports.userSchema);
exports.default = User;
