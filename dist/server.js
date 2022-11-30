"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database/database");
const app_1 = require("./app");
/**
 * Start Express server.
 */
const server = app_1.default.listen(app_1.default.get('port'), () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.connectMongoDB)();
    console.log('info', 'Auth service is running  at http://localhost:' + app_1.default.get('port'), '', '');
    /**
     * SCRIPT to create roles with verificationStatus
     *
    const roles = [{
        name: 'Admin',
        verificationStatus: [privilegeEums.PACKED, privilegeEums.SHIPPED, privilegeEums.INTRANSIT, privilegeEums.RECEIVED, privilegeEums.LOOKSGOOD, privilegeEums.NOTGOOD, privilegeEums.NOTRECEIVED, privilegeEums.MISMATCHQUANTITY]
    }, {
        name: 'User',
        verificationStatus: [privilegeEums.NOTRECEIVED, privilegeEums.MISMATCHQUANTITY]
    }];

    const c = await Role.insertMany(roles);
    console.log('BBB:::', c);
    */
    /**
     * SCRIPT to create users with roles into db
     *
     const users = [{
        name: 'Ramana',
        roles: '63848c9f3b92a55c7f40a0d4'
    }, {
        name: 'Pushkhar',
        roles: '63848c9f3b92a55c7f40a0d5'
    }];
    const a = await User.insertMany(users);
     */
}));
exports.default = server;
