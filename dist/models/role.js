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
        enum: [privileges_enum_1.privilegeEums.PACKED, privileges_enum_1.privilegeEums.SHIPPED, privileges_enum_1.privilegeEums.INTRANSIT, privileges_enum_1.privilegeEums.RECEIVED, privileges_enum_1.privilegeEums.LOOKSGOOD, privileges_enum_1.privilegeEums.NOTGOOD, privileges_enum_1.privilegeEums.NOTRECEIVED, privileges_enum_1.privilegeEums.MISMATCHQUANTITY],
        default: [privileges_enum_1.privilegeEums.PACKED]
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});
const Role = (0, mongoose_1.model)('role', exports.rolesSchema);
exports.default = Role;
