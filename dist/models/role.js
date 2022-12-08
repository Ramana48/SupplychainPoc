"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesSchema = void 0;
const mongoose_1 = require("mongoose");
const privileges_enum_1 = require("../enums/privileges.enum");
exports.rolesSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    privileges: {
        type: [String],
        enum: [privileges_enum_1.privilegeEums.RECEIVED, privileges_enum_1.privilegeEums.MANUFACTUREDANDSHIPPED, privileges_enum_1.privilegeEums.CHECKEDANDREGULATED, privileges_enum_1.privilegeEums.DSIPATCHEDANDINTRANSIT, privileges_enum_1.privilegeEums.RECEIVEDANDSTOCKED, privileges_enum_1.privilegeEums.CHECKEDANDVERIFIED, privileges_enum_1.privilegeEums.CHECKEDANDBOUGHT, privileges_enum_1.privilegeEums.OTHER],
        default: [privileges_enum_1.privilegeEums.MANUFACTUREDANDSHIPPED]
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});
const Role = (0, mongoose_1.model)('roles', exports.rolesSchema);
exports.default = Role;
